'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle, 
  TrendingUp,
  Settings,
  Eye,
  Edit,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dummyServiceProviders } from '@/data/dummy-data';
import { ServiceBooking } from '@/types';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'service_provider') {
      router.push('/login');
      return;
    }

    // Load bookings from localStorage (in a real app, this would be API calls)
    const storedBookings = JSON.parse(localStorage.getItem('construction_bookings') || '[]');
    const userBookings = storedBookings.filter((booking: {providerId: string}) => booking.providerId === user.id);
    setBookings(userBookings);
  }, [user, router]);

  const provider = dummyServiceProviders.find(p => p.id === user?.id);
  
  if (!user || user.role !== 'service_provider' || !provider) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'accepted': return '✓';
      case 'in_progress': return '⚙️';
      case 'completed': return '🎉';
      case 'cancelled': return '❌';
      default: return '⏳';
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const activeBookings = bookings.filter(b => ['accepted', 'in_progress'].includes(b.status)).length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">Manage your services and bookings</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Update Availability
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">{activeBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">{completedBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">₹{provider.earnings.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Provider Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-10 h-10 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{provider.category.name}</Badge>
                    <Badge className={provider.availability.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {provider.availability.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{provider.name}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{provider.rating} rating ({provider.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{provider.yearsExperience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{provider.completedJobs} jobs completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.location.city}, {provider.location.state}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <strong>Languages:</strong> {provider.languages.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Schedule:</strong> {provider.availability.schedule}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ₹{provider.pricing.hourly.toLocaleString('en-IN')}/hr
                    </div>
                    <div className="text-sm text-gray-500">
                      Daily: ₹{provider.pricing.daily.toLocaleString('en-IN')} | Project: ₹{provider.pricing.project || 'Custom'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Update Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Your latest service requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookings.slice(0, 3).length > 0 ? (
                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm">{getStatusIcon(booking.status)}</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{booking.service}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(booking.scheduledDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                              <p className="text-sm font-medium text-gray-900 mt-1">
                                ${booking.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No bookings yet</p>
                        <p className="text-sm text-gray-500">
                          Your bookings will appear here when customers request your services
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Update Availability
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wrench className="w-4 h-4 mr-2" />
                      Add Portfolio Item
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      View Earnings Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Bookings</CardTitle>
                  <CardDescription>
                    Manage your service requests and appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                              <p className="text-sm text-gray-600">
                                Scheduled for {new Date(booking.scheduledDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                              <p className="text-lg font-semibold text-gray-900 mt-1">
                                ${booking.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Job Details</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Workers Required: {booking.workersRequired}</p>
                                <p>Languages: {booking.preferredLanguages.join(', ')}</p>
                                <p>Urgent: {booking.isUrgent ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>{booking.location.address}</p>
                                <p>{booking.location.city}, {booking.location.state}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              Customer ID: {booking.customerId}
                            </div>
                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Accept
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                    Decline
                                  </Button>
                                </>
                              )}
                              {booking.status === 'accepted' && (
                                <Button size="sm">
                                  Start Work
                                </Button>
                              )}
                              {booking.status === 'in_progress' && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Mark Complete
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-600 mb-6">
                        Your service bookings will appear here when customers request your services
                      </p>
                      <Button variant="outline">
                        Update Availability
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>
                    Track your income and financial performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">${provider.earnings.toFixed(2)}</div>
                      <div className="text-gray-600">Total Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{provider.completedJobs}</div>
                      <div className="text-gray-600">Jobs Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        ${(provider.earnings / provider.completedJobs || 0).toFixed(2)}
                      </div>
                      <div className="text-gray-600">Average per Job</div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Earnings Chart</h3>
                    <p className="text-gray-600">
                      Detailed earnings analytics and charts will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Portfolio</CardTitle>
                      <CardDescription>
                        Showcase your completed work and projects
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {provider.portfolio.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {provider.portfolio.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <Wrench className="w-16 h-16 text-gray-400" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(item.completedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
                      <p className="text-gray-600 mb-6">
                        Add your completed projects to showcase your work
                      </p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
