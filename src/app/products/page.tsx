'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, Filter, Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { dummyProducts, dummyProductCategories } from '@/data/dummy-data';
import { toast } from 'sonner';

const ProductsPage = () => {
  const { addToCart, isInCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bulkOrderProduct, setBulkOrderProduct] = useState<string | null>(null);
  const [bulkQuantity, setBulkQuantity] = useState(1);

  const filteredProducts = useMemo(() => {
    let filtered = dummyProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category.id === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart({
      type: 'product',
      itemId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
      category: product.category.name
    });
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  const handleBulkOrder = (product: Product) => {
    setBulkOrderProduct(product.id);
    setBulkQuantity(1);
  };

  const handleBulkOrderSubmit = (product: Product) => {
    if (bulkQuantity > 0) {
      handleAddToCart(product, bulkQuantity);
      setBulkOrderProduct(null);
      setBulkQuantity(1);
    }
  };

  const handleAddToWishlist = (product: any) => {
    toast.success(`${product.name} added to wishlist`);
  };

  const getQualityColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Construction Products</h1>
            <p className="text-gray-600">
              Quality materials and equipment for your construction projects
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
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
                  {dummyProductCategories.map((category) => (
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
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  List
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${dummyProductCategories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          {/* Products Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category.name}
                        </Badge>
                        <Badge className={`text-xs ${getQualityColor(product.qualityGrade)}`}>
                          Grade {product.qualityGrade}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-sm text-gray-400">({product.reviews.length} reviews)</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          {isInCart(product.id, 'product') ? 'In Cart' : 'Add to Cart'}
                        </Button>
                        
                        <Button
                          onClick={() => handleBulkOrder(product)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Bulk Order
                        </Button>
                        
                        {bulkOrderProduct === product.id && (
                          <div className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex items-center space-x-2 mb-2">
                              <Input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={bulkQuantity}
                                onChange={(e) => setBulkQuantity(parseInt(e.target.value) || 1)}
                                className="flex-1"
                                placeholder="Quantity"
                              />
                              <Button
                                onClick={() => handleBulkOrderSubmit(product)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Add
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                              Total: ₹{(product.price * bulkQuantity).toLocaleString('en-IN')}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {product.category.name}
                            </Badge>
                            <Badge className={`text-xs ${getQualityColor(product.qualityGrade)}`}>
                              Grade {product.qualityGrade}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          
                          <p className="text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{product.rating}</span>
                              <span>({product.reviews.length} reviews)</span>
                            </div>
                            <span>Stock: {product.stock}</span>
                            <span>Brand: {product.brand}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-3">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                          
                          <div className="space-y-2">
                            <Button
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              size="sm"
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {isInCart(product.id, 'product') ? 'In Cart' : 'Add to Cart'}
                            </Button>
                            
                            <Button
                              onClick={() => handleBulkOrder(product)}
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Bulk Order
                            </Button>
                            
                            {bulkOrderProduct === product.id && (
                              <div className="border rounded-lg p-3 bg-gray-50 mt-2">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={bulkQuantity}
                                    onChange={(e) => setBulkQuantity(parseInt(e.target.value) || 1)}
                                    className="flex-1"
                                    placeholder="Quantity"
                                  />
                                  <Button
                                    onClick={() => handleBulkOrderSubmit(product)}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Add
                                  </Button>
                                </div>
                                <p className="text-xs text-gray-500">
                                  Total: ₹{(product.price * bulkQuantity).toLocaleString('en-IN')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
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
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
