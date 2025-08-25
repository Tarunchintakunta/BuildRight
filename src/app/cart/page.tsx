'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingCart, Package, Wrench, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please sign in to continue with checkout');
      router.push('/login');
      return;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
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
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Browse Products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Find Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="p-6"
                        >
                          <div className="flex items-start space-x-4">
                            {/* Item Image/Icon */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getItemTypeIcon(item.type)}
                            </div>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    {item.name}
                                  </h3>
                                  <div className="flex items-center space-x-2 mb-2">
                                    {getItemTypeBadge(item.type)}
                                    {item.category && (
                                      <Badge variant="outline" className="text-xs">
                                        {item.category}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    ₹{item.price.toLocaleString('en-IN')} per {item.type === 'service' ? 'hour' : 'unit'}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold text-gray-900 mb-1">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2 mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-12 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="flex-1 sm:flex-none"
                >
                  Clear Cart
                </Button>
                <div className="flex-1 sm:flex-none">
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({getTotal()} items)</span>
                      <span>₹{getTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{(getTotal() * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{(getTotal() * 1.18).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    By proceeding, you agree to our terms and conditions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
