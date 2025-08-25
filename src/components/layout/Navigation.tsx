'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ShoppingCart, Menu, X, User, Settings, LogOut, Package, Wrench, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'customer': return 'Customer';
      case 'service_provider': return 'Service Provider';
      default: return role;
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🏗️</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BuildRight</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Wrench className="w-4 h-4 mr-2" />
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Construction</h3>
                          <ul className="space-y-2">
                            <li><Link href="/services/contractor" className="text-sm hover:text-blue-600">Contractor</Link></li>
                            <li><Link href="/services/mason" className="text-sm hover:text-blue-600">Mason</Link></li>
                            <li><Link href="/services/architect" className="text-sm hover:text-blue-600">Architect</Link></li>
                            <li><Link href="/services/civil-engineer" className="text-sm hover:text-blue-600">Civil Engineer</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Specialized</h3>
                          <ul className="space-y-2">
                            <li><Link href="/services/painter" className="text-sm hover:text-blue-600">Painter</Link></li>
                            <li><Link href="/services/carpenter" className="text-sm hover:text-blue-600">Carpenter</Link></li>
                            <li><Link href="/services/electrician" className="text-sm hover:text-blue-600">Electrician</Link></li>
                            <li><Link href="/services/plumber" className="text-sm hover:text-blue-600">Plumber</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Package className="w-4 h-4 mr-2" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Materials</h3>
                          <ul className="space-y-2">
                            <li><Link href="/products/paints" className="text-sm hover:text-blue-600">Paints</Link></li>
                            <li><Link href="/products/cement" className="text-sm hover:text-blue-600">Cement</Link></li>
                            <li><Link href="/products/steel" className="text-sm hover:text-blue-600">Steel</Link></li>
                            <li><Link href="/products/wood-plywood" className="text-sm hover:text-blue-600">Wood & Plywood</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Equipment</h3>
                          <ul className="space-y-2">
                            <li><Link href="/products/tools-machinery" className="text-sm hover:text-blue-600">Tools & Machinery</Link></li>
                            <li><Link href="/products/safety-equipment" className="text-sm hover:text-blue-600">Safety Equipment</Link></li>
                            <li><Link href="/products/electrical" className="text-sm hover:text-blue-600">Electrical</Link></li>
                            <li><Link href="/products/plumbing" className="text-sm hover:text-blue-600">Plumbing</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contracts" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                      Contracts
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/faqs" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                      FAQs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {getItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {getRoleDisplayName(user.role)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {user.role === 'service_provider' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/provider-dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Provider Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/bookings" className="cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin-dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </Link>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Services</p>
                <div className="pl-4 space-y-2">
                  <Link href="/services/contractor" className="block py-1 text-gray-600 hover:text-blue-600">Contractor</Link>
                  <Link href="/services/painter" className="block py-1 text-gray-600 hover:text-blue-600">Painter</Link>
                  <Link href="/services/carpenter" className="block py-1 text-gray-600 hover:text-blue-600">Carpenter</Link>
                  <Link href="/services/electrician" className="block py-1 text-gray-600 hover:text-blue-600">Electrician</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Products</p>
                <div className="pl-4 space-y-2">
                  <Link href="/products/paints" className="block py-1 text-gray-600 hover:text-blue-600">Paints</Link>
                  <Link href="/products/cement" className="block py-1 text-gray-600 hover:text-blue-600">Cement</Link>
                  <Link href="/products/steel" className="block py-1 text-gray-600 hover:text-blue-600">Steel</Link>
                  <Link href="/products/tools-machinery" className="block py-1 text-gray-600 hover:text-blue-600">Tools & Machinery</Link>
                </div>
              </div>
              <Link href="/contracts" className="block py-2 text-gray-700 hover:text-blue-600">
                Contracts
              </Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/faqs" className="block py-2 text-gray-700 hover:text-blue-600">
                FAQs
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
