'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Search, Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { dummyServiceCategories, dummyServiceProviders } from '@/data/dummy-data';
import { toast } from 'sonner';

const ServicesPage = () => {
  const { addToCart, isInCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredProviders = dummyServiceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      case 'price':
        return a.pricing.hourly - b.pricing.hourly;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (provider: ServiceProvider) => {
    addToCart({
      type: 'service',
      itemId: provider.id,
      name: `${provider.category.name} Service - ${provider.name}`,
      image: provider.avatar || '',
      price: provider.pricing.hourly,
      quantity: 1,
      providerId: provider.id,
      category: provider.category.name
    });
    toast.success(`${provider.name}'s service added to cart`);
  };

  const getAvailabilityColor = (isAvailable: boolean, urgentAvailable: boolean) => {
    if (urgentAvailable) return 'bg-green-100 text-green-800';
    if (isAvailable) return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800';
  };

  const getAvailabilityText = (isAvailable: boolean, urgentAvailable: boolean) => {
    if (urgentAvailable) return 'Urgent Available';
    if (isAvailable) return 'Available';
    return 'Unavailable';
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Services</h1>
            <p className="text-gray-600">
              Connect with verified construction professionals for your projects
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services or providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {dummyServiceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${dummyServiceCategories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          {/* Service Categories Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {dummyServiceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/services/${category.id}`}>
                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardContent className="p-4">
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Service Providers */}
          <div className="space-y-6">
            {sortedProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      {/* Provider Avatar and Info */}
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Wrench className="w-10 h-10 text-blue-600" />
                        </div>
                        
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {provider.category.name}
                            </Badge>
                            <Badge className={`text-xs ${getAvailabilityColor(provider.availability.isAvailable, provider.availability.urgentAvailable)}`}>
                              {getAvailabilityText(provider.availability.isAvailable, provider.availability.urgentAvailable)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {provider.name}
                          </h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{provider.rating}</span>
                              <span>({provider.reviews.length} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{provider.completedJobs} jobs completed</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{provider.yearsExperience} years experience</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{provider.location.city}, {provider.location.state}</span>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <strong>Languages:</strong> {provider.languages.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Pricing and Actions */}
                      <div className="ml-auto text-right">
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            ${provider.pricing.hourly}/hr
                          </div>
                          <div className="text-sm text-gray-500">
                            Daily: ${provider.pricing.daily} | Project: ${provider.pricing.project || 'Custom'}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button
                            onClick={() => handleAddToCart(provider)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            {isInCart(provider.id, 'service') ? 'In Cart' : 'Add to Cart'}
                          </Button>
                          
                          <Link href={`/providers/${provider.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Portfolio Preview */}
                    {provider.portfolio.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">Recent Work</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {provider.portfolio.slice(0, 3).map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center mb-2">
                                <Wrench className="w-8 h-8 text-gray-400" />
                              </div>
                              <h5 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h5>
                              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedProviders.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No service providers found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-blue-600 text-white border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
                <p className="text-blue-100 mb-6">
                  Can&apos;t find what you&apos;re looking for? Post a contract and get bids from multiple providers.
                </p>
                <Link href="/contracts">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Post a Contract
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
