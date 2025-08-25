'use client';

import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  CreditCard,
  Truck,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What is BuildRight?',
          answer: 'BuildRight is a comprehensive platform that connects customers with verified construction professionals and provides access to quality construction materials. We offer both services (contractors, painters, electricians, etc.) and products (paints, cement, tools, etc.) in one convenient location.'
        },
        {
          question: 'How does BuildRight work?',
          answer: 'Customers can browse service providers by category, view profiles, read reviews, and book services directly through our platform. For products, customers can browse our marketplace, compare prices and quality, and place orders for delivery. All transactions are processed securely through our platform.'
        },
        {
          question: 'Is BuildRight available in my area?',
          answer: 'We currently serve major metropolitan areas across the United States. You can check availability by entering your location on our homepage. We\'re continuously expanding to new areas, so if we\'re not in your location yet, please check back soon!'
        },
        {
          question: 'What makes BuildRight different from other platforms?',
          answer: 'BuildRight specializes specifically in construction services and materials, offering a comprehensive solution that combines professional services with quality products. Our platform features verified professionals, transparent pricing, quality guarantees, and a seamless user experience designed specifically for construction projects.'
        }
      ]
    },
    {
      title: 'Services & Bookings',
      icon: MessageCircle,
      faqs: [
        {
          question: 'How do I book a service?',
          answer: 'To book a service, browse our service categories, select a provider that matches your needs, review their profile, pricing, and reviews, then click "Book Service" to schedule an appointment. You can specify your requirements, preferred date/time, and any special instructions during the booking process.'
        },
        {
          question: 'How are service providers verified?',
          answer: 'All service providers on BuildRight undergo a thorough verification process including background checks, license verification, insurance confirmation, and customer reference checks. We also monitor performance and customer feedback to ensure quality standards are maintained.'
        },
        {
          question: 'Can I book urgent services?',
          answer: 'Yes! Many of our service providers offer urgent/emergency services. When booking, you can select the "Urgent Service" option and providers who offer immediate availability will be prioritized. Emergency services are typically available 24/7 for critical issues.'
        },
        {
          question: 'What if I need to cancel or reschedule a booking?',
          answer: 'You can cancel or reschedule your booking up to 24 hours before the scheduled appointment through your dashboard or by contacting our customer support. Cancellations within 24 hours may incur a cancellation fee depending on the service provider\'s policy.'
        },
        {
          question: 'How do I know if a service provider is available?',
          answer: 'Each service provider\'s profile shows their current availability status, working hours, and schedule. You can also see if they offer urgent services. During booking, you\'ll be able to select from available time slots.'
        }
      ]
    },
    {
      title: 'Products & Orders',
      icon: Truck,
      faqs: [
        {
          question: 'What types of products do you offer?',
          answer: 'We offer a comprehensive range of construction materials including paints, cement, steel, wood & plywood, tiles, sanitary ware, plumbing supplies, electrical components, roofing materials, safety equipment, and tools & machinery. All products are from reputable brands and come with quality guarantees.'
        },
        {
          question: 'How do I place an order for products?',
          answer: 'Browse our product catalog, add items to your cart, specify quantities, and proceed to checkout. You can choose between standard delivery or express delivery options. Payment is processed securely, and you\'ll receive order confirmation and tracking information.'
        },
        {
          question: 'Do you offer bulk ordering?',
          answer: 'Yes! We offer bulk ordering for construction projects. Use our "Bulk Order" tab when viewing products to specify larger quantities. Bulk orders often come with discounted pricing and dedicated customer support to ensure your project needs are met.'
        },
        {
          question: 'What are your delivery options and costs?',
          answer: 'We offer standard delivery (3-5 business days) and express delivery (1-2 business days). Delivery costs vary based on location, order size, and delivery speed. Orders over $500 typically qualify for free standard delivery. You can calculate exact delivery costs during checkout.'
        },
        {
          question: 'Can I return or exchange products?',
          answer: 'Yes, we offer a 30-day return policy for most products in their original condition. Some items like custom orders or safety equipment may have different return policies. Contact our customer support for specific return instructions and to initiate the return process.'
        }
      ]
    },
    {
      title: 'Payments & Pricing',
      icon: CreditCard,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. For larger orders or business accounts, we also offer invoice-based payments with net 30 terms. All payments are processed securely through our encrypted payment gateway.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees! Our pricing is transparent with no surprise charges. You\'ll see the exact cost breakdown including product/service price, taxes, and delivery fees before completing your order. Any additional charges (like rush fees for urgent services) are clearly communicated upfront.'
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, we offer financing options for larger orders and projects. We partner with financial institutions to provide flexible payment plans. You can apply for financing during checkout, and approval typically takes just a few minutes. Terms and rates vary based on creditworthiness and order amount.'
        },
        {
          question: 'How do I get a quote for a large project?',
          answer: 'For large projects, you can post a contract on our platform describing your requirements, budget, and timeline. Service providers will submit bids, and you can compare offers based on price, experience, and proposed approach. You can also contact our sales team directly for custom quotes.'
        }
      ]
    },
    {
      title: 'Account & Support',
      icon: Shield,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is easy! Click "Register" on our homepage, fill in your details including name, email, phone number, and select your account type (Customer or Service Provider). Verify your email, and you\'re ready to start using BuildRight!'
        },
        {
          question: 'What if I forget my password?',
          answer: 'No worries! Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link will expire in 24 hours for security. If you continue to have issues, contact our customer support team.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'We offer multiple ways to reach us: Live chat on our website, email at support@buildright.com, phone at 1-800-BUILD-RIGHT, or through the contact form on our website. Our support team is available 24/7 to assist you with any questions or issues.'
        },
        {
          question: 'Do you offer customer support in multiple languages?',
          answer: 'Currently, we offer support in English and Spanish. We\'re working on adding more languages to better serve our diverse customer base. If you need support in another language, please let us know and we\'ll do our best to accommodate your needs.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us anytime',
      value: '1-800-BUILD-RIGHT',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get a response within 2 hours',
      value: 'support@buildright.com',
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Live Chat',
      description: 'Available 24/7',
      value: 'Start Chat',
      action: 'Chat Now'
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
              <HelpCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our platform, services, and products. 
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Search through {faqCategories.reduce((total, cat) => total + cat.faqs.length, 0)} frequently asked questions
              </p>
            </motion.div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12 mb-16">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <Badge variant="secondary">{category.faqs.length} questions</Badge>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="border border-gray-200 rounded-lg"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Contact Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-xl text-gray-600">
                Our support team is here to help you 24/7
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <method.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {method.description}
                      </p>
                      <div className="text-lg font-medium text-blue-600 mb-4">
                        {method.value}
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        {method.action}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Can&apos;t Find Your Answer?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We&apos;re constantly updating our FAQ section based on customer questions. 
                    If you have a specific question that isn&apos;t covered here, please reach out to us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" className="inline-block">
                      <button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Contact Support
                      </button>
                    </a>
                    <a href="/about" className="inline-block">
                      <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Learn More About Us
                      </button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQsPage;
