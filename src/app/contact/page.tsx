'use client';

import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Building2,
  Users,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      value: '1-800-BUILD-RIGHT',
      description: 'Available 24/7 for urgent inquiries',
      action: 'Call Now',
      href: 'tel:1-800-BUILD-RIGHT'
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@buildright.com',
      description: 'Get a response within 2 hours',
      action: 'Send Email',
      href: 'mailto:support@buildright.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Start Chat',
      description: 'Available 24/7 for instant help',
      action: 'Chat Now',
      href: '#'
    }
  ];

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Construction Ave, Suite 100',
      state: 'NY 10001',
      phone: '+1 (212) 555-0123',
      hours: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      city: 'Los Angeles',
      address: '456 Build Street, Floor 3',
      state: 'CA 90210',
      phone: '+1 (310) 555-0456',
      hours: 'Mon-Fri: 8AM-5PM PST'
    },
    {
      city: 'Chicago',
      address: '789 Project Blvd, Unit 200',
      state: 'IL 60601',
      phone: '+1 (312) 555-0789',
      hours: 'Mon-Fri: 8AM-6PM CST'
    }
  ];

  const departments = [
    {
      name: 'Customer Support',
      email: 'support@buildright.com',
      phone: '1-800-BUILD-RIGHT',
      description: 'General inquiries, account issues, and platform assistance'
    },
    {
      name: 'Sales & Partnerships',
      email: 'sales@buildright.com',
      phone: '1-800-BUILD-RIGHT ext. 2',
      description: 'Business partnerships, bulk orders, and enterprise solutions'
    },
    {
      name: 'Service Provider Relations',
      email: 'providers@buildright.com',
      phone: '1-800-BUILD-RIGHT ext. 3',
      description: 'Service provider onboarding, verification, and support'
    },
    {
      name: 'Technical Support',
      email: 'tech@buildright.com',
      phone: '1-800-BUILD-RIGHT ext. 4',
      description: 'Technical issues, platform bugs, and feature requests'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <MessageCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need assistance? We're here to help! 
              Reach out to us through any of the channels below or fill out the contact form.
            </p>
          </div>

          {/* Quick Contact Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Contact</h2>
              <p className="text-xl text-gray-600">
                Multiple ways to reach our support team
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <info.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <div className="text-lg font-medium text-blue-600 mb-2">
                        {info.value}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {info.description}
                      </p>
                      <a href={info.href} className="inline-block">
                        <Button variant="outline" className="w-full">
                          {info.action}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form & Office Locations */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="w-5 h-5 text-blue-600" />
                    <span>Send us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => handleInputChange('inquiryType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <span>Office Locations</span>
                </h2>
                
                <div className="space-y-4">
                  {officeLocations.map((office, index) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {office.city} Office
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>{office.address}</p>
                                <p>{office.state}</p>
                                <p className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4" />
                                  <span>{office.phone}</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{office.hours}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Departments Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact by Department</h2>
              <p className="text-xl text-gray-600">
                Get in touch with the right team for your specific needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {dept.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {dept.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <a 
                            href={`mailto:${dept.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {dept.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{dept.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Response Time & Support Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Emergency support available around the clock for urgent construction issues
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2-Hour Response</h3>
                    <p className="text-gray-600">
                      We guarantee a response to all inquiries within 2 hours during business hours
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600">
                      Our support team includes construction professionals and technical experts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-blue-600 text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Join thousands of satisfied customers and professionals on BuildRight
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/register" className="inline-block">
                    <Button variant="secondary" size="lg">
                      Get Started Today
                    </Button>
                  </a>
                  <a href="/faqs" className="inline-block">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                      View FAQs
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
