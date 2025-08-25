// Data initialization utility to populate storage with sample data
import { 
  userStorage, 
  productsStorage, 
  servicesStorage, 
  ordersStorage, 
  bookingsStorage,
  analyticsStorage,
  notificationsStorage,
  adminStorage,
  providerStorage
} from './storage';
import { dummyProducts, dummyServiceProviders, dummyServiceCategories } from '@/data/dummy-data';

// Sample orders data
const sampleOrders = [
  {
    id: 'order-1',
    customerId: 'customer-1',
    items: [
      {
        id: 'item-1',
        type: 'product',
        name: 'Premium Interior Paint',
        price: 1899,
        quantity: 2,
        category: 'Paints'
      }
    ],
    total: 3798,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    createdAt: new Date('2024-01-15').toISOString(),
    estimatedDelivery: new Date('2024-01-22').toISOString(),
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'order-2',
    customerId: 'customer-1',
    items: [
      {
        id: 'item-2',
        type: 'product',
        name: 'Portland Cement',
        price: 399,
        quantity: 5,
        category: 'Cement'
      }
    ],
    total: 1995,
    status: 'processing',
    paymentStatus: 'paid',
    deliveryAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    createdAt: new Date('2024-01-20').toISOString(),
    estimatedDelivery: new Date('2024-01-27').toISOString(),
    trackingNumber: 'TRK987654321'
  }
];

// Sample service bookings data
const sampleBookings = [
  {
    id: 'booking-1',
    customerId: 'customer-1',
    providerId: 'painter-1',
    service: 'Interior Painting',
    category: 'Painter',
    workersRequired: 2,
    preferredLanguages: ['English', 'Hindi'],
    location: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    scheduledDate: new Date('2024-02-15').toISOString(),
    isUrgent: false,
    status: 'accepted',
    totalPrice: 2999,
    createdAt: new Date('2024-01-25').toISOString(),
    providerNotes: 'Will start at 9 AM',
    customerNotes: 'Please use eco-friendly paint'
  },
  {
    id: 'booking-2',
    customerId: 'customer-1',
    providerId: 'contractor-1',
    service: 'Kitchen Renovation',
    category: 'Contractor',
    workersRequired: 4,
    preferredLanguages: ['English'],
    location: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    scheduledDate: new Date('2024-03-01').toISOString(),
    isUrgent: false,
    status: 'pending',
    totalPrice: 15000,
    createdAt: new Date('2024-01-28').toISOString()
  }
];

// Sample notifications data
const sampleNotifications = [
  {
    id: 'notif-1',
    userId: 'customer-1',
    title: 'Order Delivered',
    message: 'Your order #order-1 has been delivered successfully!',
    type: 'success',
    isRead: false,
    createdAt: new Date('2024-01-22').toISOString(),
    actionUrl: '/dashboard'
  },
  {
    id: 'notif-2',
    userId: 'customer-1',
    title: 'Service Booking Confirmed',
    message: 'Your painting service has been confirmed for Feb 15th',
    type: 'info',
    isRead: false,
    createdAt: new Date('2024-01-26').toISOString(),
    actionUrl: '/dashboard'
  },
  {
    id: 'notif-3',
    userId: 'painter-1',
    title: 'New Service Request',
    message: 'You have a new interior painting request',
    type: 'info',
    isRead: false,
    createdAt: new Date('2024-01-25').toISOString(),
    actionUrl: '/provider-dashboard'
  }
];

// Initialize all data
export const initializeData = () => {
  try {
    // Initialize users
    const existingUsers = userStorage.getAll();
    if (existingUsers.length === 0) {
      // Add sample users
      userStorage.add({
        id: 'admin-1',
        email: 'admin@site.com',
        name: 'Admin User',
        role: 'admin',
        avatar: '/images/avatars/admin.jpg',
        phone: '+1-555-0001',
        createdAt: new Date('2024-01-01')
      });
      
      userStorage.add({
        id: 'customer-1',
        email: 'customer@site.com',
        name: 'John Smith',
        role: 'customer',
        avatar: '/images/avatars/customer.jpg',
        phone: '+1-555-0002',
        createdAt: new Date('2024-01-02')
      });

      // Add service providers
      dummyServiceProviders.forEach(provider => {
        userStorage.add(provider);
      });
    }

    // Initialize products
    const existingProducts = productsStorage.get();
    if (existingProducts.length === 0) {
      productsStorage.set(dummyProducts);
    }

    // Initialize services
    const existingServices = servicesStorage.get();
    if (existingServices.length === 0) {
      // Create services from service providers
      dummyServiceProviders.forEach(provider => {
        servicesStorage.add({
          id: `service-${provider.id}`,
          name: `${provider.category.name} Service`,
          category: provider.category,
          providerId: provider.id,
          providerName: provider.name,
          description: `Professional ${provider.category.name.toLowerCase()} services`,
          pricing: provider.pricing,
          rating: provider.rating,
          isAvailable: provider.availability.isAvailable
        });
      });
    }

    // Initialize orders
    const existingOrders = ordersStorage.get();
    if (existingOrders.length === 0) {
      sampleOrders.forEach(order => {
        ordersStorage.add(order);
      });
    }

    // Initialize bookings
    const existingBookings = bookingsStorage.get();
    if (existingBookings.length === 0) {
      sampleBookings.forEach(booking => {
        bookingsStorage.add(booking);
      });
    }

    // Initialize notifications
    const existingNotifications = notificationsStorage.get();
    if (existingNotifications.length === 0) {
      sampleNotifications.forEach(notification => {
        notificationsStorage.add(notification);
      });
    }

    // Track initialization event
    analyticsStorage.trackEvent('app_initialized', {
      timestamp: new Date().toISOString(),
      usersCount: userStorage.getAll().length,
      productsCount: productsStorage.get().length,
      servicesCount: servicesStorage.get().length,
      ordersCount: ordersStorage.get().length,
      bookingsCount: bookingsStorage.get().length
    });

    console.log('Data initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
};

// Get user-specific data
export const getUserData = (userId: string) => {
  const user = userStorage.getById(userId);
  if (!user) return null;

  const userOrders = ordersStorage.getByUser(userId);
  const userBookings = bookingsStorage.getByCustomer(userId);
  const userNotifications = notificationsStorage.getByUser(userId);

  return {
    user,
    orders: userOrders,
    bookings: userBookings,
    notifications: userNotifications,
    stats: {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((total: number, order: unknown) => {
        const orderData = order as Record<string, unknown>;
        if (orderData.status === 'delivered' || orderData.status === 'completed') {
          return total + ((orderData.total as number) || 0);
        }
        return total;
      }, 0),
      activeBookings: userBookings.filter((b: unknown) => {
        const booking = b as Record<string, unknown>;
        return ['pending', 'accepted', 'in_progress'].includes(booking.status as string);
      }).length,
      unreadNotifications: userNotifications.filter((n: unknown) => {
        const notification = n as Record<string, unknown>;
        return !(notification.isRead as boolean);
      }).length
    }
  };
};

// Get admin dashboard data
export const getAdminData = () => {
  const stats = adminStorage.getDashboardStats();
  const recentOrders = ordersStorage.getRecent(5);
  const recentBookings = bookingsStorage.getRecent(5);
  const lowStockProducts = productsStorage.getLowStock(10);

  return {
    stats,
    recentOrders,
    recentBookings,
    lowStockProducts,
    revenueStats: analyticsStorage.getRevenueStats()
  };
};

// Get service provider data
export const getProviderData = (providerId: string) => {
  const provider = userStorage.getById(providerId);
  if (!provider) return null;

  const providerStats = providerStorage.getProviderStats(providerId);
  const providerBookings = providerStorage.getProviderBookings(providerId);
  const providerServices = providerStorage.getProviderServices(providerId);
  const recentBookings = providerBookings
    .sort((a: unknown, b: unknown) => {
      const aDate = new Date((a as Record<string, unknown>).createdAt as string).getTime();
      const bDate = new Date((b as Record<string, unknown>).createdAt as string).getTime();
      return bDate - aDate;
    })
    .slice(0, 5);

  return {
    provider,
    stats: providerStats,
    bookings: providerBookings,
    services: providerServices,
    recentBookings
  };
};
