'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Globe, 
  Phone, 
  CheckCircle,
  Building2,
  Wrench,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { dummyServiceCategories, dummyServiceProviders } from '@/data/dummy-data';
import { toast } from 'sonner';
import Link from 'next/link';

const ServiceCategoryPage = () => {
  const params = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [bookingData, setBookingData] = useState({
    workersRequired: 1,
    preferredLanguages: ['English'],
    scheduledDate: '',
    scheduledTime: '',
    isUrgent: false,
    customerNotes: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const categoryId = params.category as string;
  const category = dummyServiceCategories.find(cat => cat.id === categoryId);
  const providers = dummyServiceProviders.filter(provider => provider.category.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Category Not Found</h1>
            <Link href="/services">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = () => {
    if (!selectedProvider) return;

    // Add service to cart
    addToCart({
      type: 'service',
      itemId: selectedProvider.id,
      name: `${category.name} Service`,
      image: selectedProvider.avatar,
      price: selectedProvider.pricing.hourly,
      quantity: 1,
      providerId: selectedProvider.id,
      category: category.name
    });

    toast.success(`Service booking added to cart!`);
    setSelectedProvider(null);
    setBookingData({
      workersRequired: 1,
      preferredLanguages: ['English'],
      scheduledDate: '',
      scheduledTime: '',
      isUrgent: false,
      customerNotes: '',
      location: {
        address: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
  };

  const getLanguageColor = (language: string) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{providers.length} Providers</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">4.8+ Rating</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{service}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Service Providers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Providers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{provider.name}</CardTitle>
                            <CardDescription>{provider.category.name}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={provider.availability.isAvailable ? "default" : "secondary"}>
                          {provider.availability.isAvailable ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Rating and Experience */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-sm text-gray-500">({provider.reviews.length} reviews)</span>
                        </div>
                        <Badge variant="outline">{provider.yearsExperience} years</Badge>
                      </div>

                      {/* Languages */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Languages</Label>
                        <div className="flex flex-wrap gap-2">
                          {provider.languages.map((language, idx) => (
                            <Badge key={idx} variant="secondary" className={`text-xs ${getLanguageColor(language)}`}>
                              <Globe className="w-3 h-3 mr-1" />
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location.city}, {provider.location.state}</span>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{provider.availability.schedule}</span>
                      </div>

                      {/* Pricing */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                                   <div>
                           <div className="font-medium text-gray-900">₹{provider.pricing.hourly.toLocaleString('en-IN')}/hr</div>
                           <div className="text-gray-500">Hourly</div>
                         </div>
                         <div>
                           <div className="font-medium text-gray-900">₹{provider.pricing.daily.toLocaleString('en-IN')}/day</div>
                           <div className="text-gray-500">Daily</div>
                         </div>
                          <div>
                            <div className="font-medium text-gray-900">${provider.completedJobs}</div>
                            <div className="text-gray-500">Jobs</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full"
                              onClick={() => setSelectedProvider(provider)}
                            >
                              Book Service
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Book {provider.name}</DialogTitle>
                              <DialogDescription>
                                Schedule your {category.name} service with {provider.name}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              {/* Service Details */}
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-medium text-blue-900 mb-2">Service Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-blue-700">Provider:</span> {provider.name}
                                  </div>
                                  <div>
                                    <span className="text-blue-700">Category:</span> {category.name}
                                  </div>
                                  <div>
                                    <span className="text-blue-700">Rating:</span> {provider.rating}/5
                                  </div>
                                  <div>
                                    <span className="text-blue-700">Experience:</span> {provider.yearsExperience} years
                                  </div>
                                </div>
                              </div>

                              {/* Booking Form */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="workers">Number of Workers</Label>
                                  <Select
                                    value={bookingData.workersRequired.toString()}
                                    onValueChange={(value) => setBookingData(prev => ({ ...prev, workersRequired: parseInt(value) }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[1, 2, 3, 4, 5].map(num => (
                                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label htmlFor="languages">Preferred Languages</Label>
                                  <Select
                                    value={bookingData.preferredLanguages[0]}
                                    onValueChange={(value) => setBookingData(prev => ({ ...prev, preferredLanguages: [value] }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {provider.languages.map(lang => (
                                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="date">Preferred Date</Label>
                                  <Input
                                    type="date"
                                    value={bookingData.scheduledDate}
                                    onChange={(e) => setBookingData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="time">Preferred Time</Label>
                                  <Select
                                    value={bookingData.scheduledTime}
                                    onValueChange={(value) => setBookingData(prev => ({ ...prev, scheduledTime: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                                      <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                                      <SelectItem value="evening">Evening (4PM-8PM)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Textarea
                                  placeholder="Describe your project requirements, special instructions, or any questions..."
                                  value={bookingData.customerNotes}
                                  onChange={(e) => setBookingData(prev => ({ ...prev, customerNotes: e.target.value }))}
                                  rows={3}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="urgent"
                                  checked={bookingData.isUrgent}
                                  onChange={(e) => setBookingData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                                  className="rounded"
                                />
                                <Label htmlFor="urgent">Mark as urgent (additional fee may apply)</Label>
                              </div>

                              <div className="flex justify-end space-x-3 pt-4">
                                <Button variant="outline" onClick={() => setSelectedProvider(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleBookingSubmit}>
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* No Providers */}
          {providers.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No providers available</h3>
              <p className="text-gray-600 mb-6">
                Currently no {category.name} providers are available in your area
              </p>
              <Link href="/services">
                <Button variant="outline">
                  Browse Other Services
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceCategoryPage;
