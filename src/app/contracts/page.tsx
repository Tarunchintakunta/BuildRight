'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Clock,
  Eye,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dummyContracts, dummyServiceCategories } from '@/data/dummy-data';
import { toast } from 'sonner';

const ContractsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [contracts, setContracts] = useState(dummyContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPostContract, setShowPostContract] = useState(false);
  const [newContract, setNewContract] = useState({
    title: '',
    description: '',
    category: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    location: ''
  });

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contract.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostContract = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to post a contract');
      return;
    }

    if (!newContract.title || !newContract.description || !newContract.category || 
        !newContract.budgetMin || !newContract.budgetMax || !newContract.deadline || !newContract.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const contract = {
      id: `contract-${Date.now()}`,
      customerId: user.id,
      title: newContract.title,
      description: newContract.description,
      category: newContract.category,
      budget: {
        min: parseFloat(newContract.budgetMin),
        max: parseFloat(newContract.budgetMax)
      },
      location: {
        address: newContract.location,
        city: 'New York', // In a real app, this would be parsed from the location
        state: 'NY',
        zipCode: '10001'
      },
      deadline: new Date(newContract.deadline),
      status: 'open',
      bids: [],
      createdAt: new Date()
    };

    setContracts([contract, ...contracts]);
    setShowPostContract(false);
    setNewContract({
      title: '',
      description: '',
      category: '',
      budgetMin: '',
      budgetMax: '',
      deadline: '',
      location: ''
    });

    toast.success('Contract posted successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = dummyServiceCategories.find(c => c.name === category);
    return categoryData ? categoryData.icon : '🏗️';
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Construction Contracts</h1>
                <p className="text-gray-600">
                  Post contracts and get competitive bids from qualified professionals
                </p>
              </div>
              <Button onClick={() => setShowPostContract(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Post Contract
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {dummyServiceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredContracts.length} contract{filteredContracts.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Contracts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract, index) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">{getCategoryIcon(contract.category)}</div>
                        <Badge variant="outline" className="text-xs">
                          {contract.category}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{contract.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {contract.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Budget: ₹{contract.budget.min.toLocaleString('en-IN')} - ₹{contract.budget.max.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{contract.location.city}, {contract.location.state}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {contract.deadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{contract.bids.length} bids received</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {user?.role === 'service_provider' && contract.status === 'open' && (
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Submit Bid
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredContracts.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
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

          {/* Post Contract Modal */}
          {showPostContract && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <CardHeader>
                  <CardTitle>Post New Contract</CardTitle>
                  <CardDescription>
                    Describe your project and get competitive bids from professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostContract} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Office Building Renovation"
                        value={newContract.title}
                        onChange={(e) => setNewContract({...newContract, title: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project requirements, scope, and any specific details..."
                        value={newContract.description}
                        onChange={(e) => setNewContract({...newContract, description: e.target.value})}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Service Category *</Label>
                        <Select value={newContract.category} onValueChange={(value) => setNewContract({...newContract, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {dummyServiceCategories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="deadline">Project Deadline *</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newContract.deadline}
                          onChange={(e) => setNewContract({...newContract, deadline: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budgetMin">Minimum Budget (₹) *</Label>
                        <Input
                          id="budgetMin"
                          type="number"
                          placeholder="0"
                          value={newContract.budgetMin}
                          onChange={(e) => setNewContract({...newContract, budgetMin: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="budgetMax">Maximum Budget (₹) *</Label>
                        <Input
                          id="budgetMax"
                          type="number"
                          placeholder="100000"
                          value={newContract.budgetMax}
                          onChange={(e) => setNewContract({...newContract, budgetMax: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Project Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., 123 Main St, New York, NY"
                        value={newContract.location}
                        onChange={(e) => setNewContract({...newContract, location: e.target.value})}
                        required
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button type="submit" className="flex-1">
                        Post Contract
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowPostContract(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractsPage;
