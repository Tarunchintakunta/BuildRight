'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  Heart, 
  Zap,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'We prioritize building trust with our customers and service providers through transparent practices and reliable service delivery.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing exceptional value and experience to our customers.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate our platform to make construction projects more efficient and accessible.'
    },
    {
      icon: Globe,
      title: 'Community',
      description: 'We foster a strong community of construction professionals and customers, promoting collaboration and growth.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Service Providers', description: 'Verified professionals across all construction specialties' },
    { number: '1000+', label: 'Happy Customers', description: 'Satisfied customers who trust our platform' },
    { number: '50+', label: 'Cities Covered', description: 'Serving construction needs across major metropolitan areas' },
    { number: '24/7', label: 'Support Available', description: 'Round-the-clock customer support and assistance' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former construction project manager with 15+ years of industry experience. Passionate about digitizing construction services.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Technology leader with expertise in building scalable platforms. Former senior engineer at major tech companies.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      bio: 'Operations specialist with deep knowledge of construction workflows and customer service excellence.',
      avatar: '👩‍🔧'
    },
    {
      name: 'David Thompson',
      role: 'Head of Business Development',
      bio: 'Business development expert with strong relationships in the construction and real estate industries.',
      avatar: '👨‍💼'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'BuildRight was established with a vision to revolutionize construction services'
    },
    {
      year: '2021',
      title: 'Platform Launch',
      description: 'Beta version launched with 50 service providers and 200 customers'
    },
    {
      year: '2022',
      title: 'Market Expansion',
      description: 'Expanded to 25 cities across the United States'
    },
    {
      year: '2023',
      title: 'Series A Funding',
      description: 'Raised $10M to accelerate growth and platform development'
    },
    {
      year: '2024',
      title: 'National Launch',
      description: 'Full national launch with 500+ providers and 1000+ customers'
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
              <Building2 className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About BuildRight
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re revolutionizing the construction industry by connecting customers with verified professionals 
              and providing quality materials through a seamless digital platform.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    <span>Our Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize access to quality construction services by creating a transparent, 
                    efficient platform that connects customers with verified professionals, making 
                    construction projects more accessible, affordable, and reliable for everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    <span>Our Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    To become the leading digital platform for construction services globally, 
                    setting industry standards for quality, transparency, and customer satisfaction 
                    while empowering construction professionals to grow their businesses.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600">
                Building the future, one project at a time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">
                        {stat.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                The passionate people behind BuildRight
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{member.avatar}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <Badge variant="outline" className="mb-3">
                        {member.role}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Milestones Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600">
                Key milestones in our company&apos;s growth
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

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
                    <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                      Get Started Today
                    </button>
                  </a>
                  <a href="/contact" className="inline-block">
                    <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                      Contact Us
                    </button>
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

export default AboutPage;
