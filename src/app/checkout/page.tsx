'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, Wrench, CreditCard, MapPin, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { dummyAddresses } from '@/data/dummy-data';

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardholderName)) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Store order in localStorage
      const order = {
        id: `order-${Date.now()}`,
        customerId: user?.id,
        items: items,
        total: total,
        status: 'confirmed',
        paymentStatus: 'paid',
        deliveryAddress: dummyAddresses.find(addr => addr.id === selectedAddress),
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      const existingOrders = JSON.parse(localStorage.getItem('construction_orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('construction_orders', JSON.stringify(existingOrders));

      // Clear cart
      clearCart();

      toast.success('Order placed successfully!');
      router.push(`/order-success?orderId=${order.id}`);
    }, 3000);
  };

  const getItemTypeIcon = (type: string) => {
    return type === 'product' ? <Package className="w-4 h-4" /> : <Wrench className="w-4 h-4" />;
  };

  const getItemTypeBadge = (type: string) => {
    return type === 'product' ? (
      <Badge variant="secondary" className="text-xs">Product</Badge>
    ) : (
      <Badge variant="outline" className="text-xs">Service</Badge>
    );
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Delivery Address</span>
                    </CardTitle>
                    <CardDescription>
                      Choose where you want your order delivered
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                      {dummyAddresses.map((address) => (
                        <div key={address.id} className="flex items-center space-x-3">
                          <RadioGroupItem value={address.id} id={address.id} />
                          <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                            <div className="p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{address.type}</span>
                                {address.isDefault && (
                                  <Badge variant="secondary" className="text-xs">Default</Badge>
                                )}
                              </div>
                              <p className="text-gray-900">{address.address}</p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Payment Method</span>
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to pay
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pl-6">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength={4}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            placeholder="John Doe"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to the{' '}
                        <a href="/terms" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {getItemTypeIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {getItemTypeBadge(item.type)}
                              {item.category && (
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (18%)</span>
                        <span>₹{tax.toLocaleString('en-IN')}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      type="submit"
                      disabled={isProcessing || !agreeToTerms}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>

                    {/* Security Notice */}
                    <div className="text-xs text-gray-500 text-center">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Your payment is secure and encrypted
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
