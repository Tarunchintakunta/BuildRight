// Enhanced Storage utility functions for comprehensive data management

const STORAGE_KEYS = {
  CART: 'construction_cart',
  USER: 'construction_user',
  ORDERS: 'construction_orders',
  BOOKINGS: 'construction_bookings',
  WISHLIST: 'construction_wishlist',
  SETTINGS: 'construction_settings',
  PRODUCTS: 'construction_products',
  SERVICES: 'construction_services',
  USERS: 'construction_users',
  NOTIFICATIONS: 'construction_notifications',
  ANALYTICS: 'construction_analytics'
} as const;

// Generic storage functions
export const storage = {
  // Get item with type safety
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  // Set item with error handling
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  // Remove item
  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  // Check if key exists
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },

  // Clear all app data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Cart storage functions
export const cartStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.CART, []),
  set: (cart: unknown[]) => storage.set(STORAGE_KEYS.CART, cart),
  clear: () => storage.remove(STORAGE_KEYS.CART),
  getByUser: (userId: string) => {
    const cart = cartStorage.get();
    return cart.filter((item: any) => item.userId === userId);
  }
};

// User storage functions
export const userStorage = {
  get: () => storage.get<unknown | null>(STORAGE_KEYS.USER, null),
  set: (user: unknown) => storage.set(STORAGE_KEYS.USER, user),
  clear: () => storage.remove(STORAGE_KEYS.USER),
  getAll: () => storage.get<unknown[]>(STORAGE_KEYS.USERS, []),
  add: (user: unknown) => {
    const users = userStorage.getAll();
    users.push(user);
    return storage.set(STORAGE_KEYS.USERS, users);
  },
  update: (userId: string, updates: Partial<unknown>) => {
    const users = userStorage.getAll();
    const index = users.findIndex((u: any) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      return storage.set(STORAGE_KEYS.USERS, users);
    }
    return false;
  },
  getById: (userId: string) => {
    const users = userStorage.getAll();
    return users.find((u: any) => u.id === userId) || null;
  }
};

// Orders storage functions with enhanced functionality
export const ordersStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.ORDERS, []),
  add: (order: unknown) => {
    const orders = ordersStorage.get();
    orders.push(order);
    return storage.set(STORAGE_KEYS.ORDERS, orders);
  },
  update: (orderId: string, updates: Partial<unknown>) => {
    const orders = ordersStorage.get();
    const index = orders.findIndex((o: any) => o.id === orderId);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
      return storage.set(STORAGE_KEYS.ORDERS, orders);
    }
    return false;
  },
  getById: (orderId: string) => {
    const orders = ordersStorage.get();
    return orders.find((o: any) => o.id === orderId) || null;
  },
  getByUser: (userId: string) => {
    const orders = ordersStorage.get();
    return orders.filter((o: any) => o.customerId === userId);
  },
  getByStatus: (status: string) => {
    const orders = ordersStorage.get();
    return orders.filter((o: any) => o.status === status);
  },
  getRecent: (limit: number = 10) => {
    const orders = ordersStorage.get();
    return orders
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },
  getTotalRevenue: () => {
    const orders = ordersStorage.get();
    return orders.reduce((total: number, order: any) => {
      if (order.status === 'delivered' || order.status === 'completed') {
        return total + (order.total || 0);
      }
      return total;
    }, 0);
  }
};

// Bookings storage functions with enhanced functionality
export const bookingsStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.BOOKINGS, []),
  add: (booking: unknown) => {
    const bookings = bookingsStorage.get();
    bookings.push(booking);
    return storage.set(STORAGE_KEYS.BOOKINGS, bookings);
  },
  update: (bookingId: string, updates: Partial<unknown>) => {
    const bookings = bookingsStorage.get();
    const index = bookings.findIndex((b: any) => b.id === bookingId);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates };
      return storage.set(STORAGE_KEYS.BOOKINGS, bookings);
    }
    return false;
  },
  getById: (bookingId: string) => {
    const bookings = bookingsStorage.get();
    return bookings.find((b: any) => b.id === bookingId) || null;
  },
  getByProvider: (providerId: string) => {
    const bookings = bookingsStorage.get();
    return bookings.filter((b: any) => b.providerId === providerId);
  },
  getByCustomer: (customerId: string) => {
    const bookings = bookingsStorage.get();
    return bookings.filter((b: any) => b.customerId === customerId);
  },
  getByStatus: (status: string) => {
    const bookings = bookingsStorage.get();
    return bookings.filter((b: any) => b.status === status);
  },
  getRecent: (limit: number = 10) => {
    const bookings = bookingsStorage.get();
    return bookings
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
};

// Products storage functions
export const productsStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.PRODUCTS, []),
  set: (products: unknown[]) => storage.set(STORAGE_KEYS.PRODUCTS, products),
  add: (product: unknown) => {
    const products = productsStorage.get();
    products.push(product);
    return storage.set(STORAGE_KEYS.PRODUCTS, products);
  },
  update: (productId: string, updates: Partial<unknown>) => {
    const products = productsStorage.get();
    const index = products.findIndex((p: any) => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      return storage.set(STORAGE_KEYS.PRODUCTS, products);
    }
    return false;
  },
  getById: (productId: string) => {
    const products = productsStorage.get();
    return products.find((p: any) => p.id === productId) || null;
  },
  getByCategory: (categoryId: string) => {
    const products = productsStorage.get();
    return products.filter((p: any) => p.category?.id === categoryId);
  },
  getLowStock: (threshold: number = 10) => {
    const products = productsStorage.get();
    return products.filter((p: any) => (p.stock || 0) <= threshold);
  }
};

// Services storage functions
export const servicesStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.SERVICES, []),
  set: (services: unknown[]) => storage.set(STORAGE_KEYS.SERVICES, services),
  add: (service: unknown) => {
    const services = servicesStorage.get();
    services.push(service);
    return storage.set(STORAGE_KEYS.SERVICES, services);
  },
  update: (serviceId: string, updates: Partial<unknown>) => {
    const services = servicesStorage.get();
    const index = services.findIndex((s: any) => s.id === serviceId);
    if (index !== -1) {
      services[index] = { ...services[index], ...updates };
      return storage.set(STORAGE_KEYS.SERVICES, services);
    }
    return false;
  },
  getById: (serviceId: string) => {
    const services = servicesStorage.get();
    return services.find((s: any) => s.id === serviceId) || null;
  },
  getByCategory: (categoryId: string) => {
    const services = servicesStorage.get();
    return services.filter((s: any) => s.category?.id === categoryId);
  },
  getByProvider: (providerId: string) => {
    const services = servicesStorage.get();
    return services.filter((s: any) => s.providerId === providerId);
  }
};

// Wishlist storage functions
export const wishlistStorage = {
  get: () => storage.get<string[]>(STORAGE_KEYS.WISHLIST, []),
  add: (itemId: string) => {
    const wishlist = wishlistStorage.get();
    if (!wishlist.includes(itemId)) {
      wishlist.push(itemId);
      return storage.set(STORAGE_KEYS.WISHLIST, wishlist);
    }
    return true;
  },
  remove: (itemId: string) => {
    const wishlist = wishlistStorage.get();
    const filtered = wishlist.filter(id => id !== itemId);
    return storage.set(STORAGE_KEYS.WISHLIST, filtered);
  },
  has: (itemId: string) => {
    const wishlist = wishlistStorage.get();
    return wishlist.includes(itemId);
  },
  getByUser: (userId: string) => {
    // In a real app, wishlist would be user-specific
    // For now, return global wishlist
    return wishlistStorage.get();
  }
};

// Settings storage functions
export const settingsStorage = {
  get: () => storage.get<Record<string, unknown>>(STORAGE_KEYS.SETTINGS, {
    theme: 'light',
    notifications: true,
    language: 'en'
  }),
  update: (settings: Partial<Record<string, unknown>>) => {
    const current = settingsStorage.get();
    const updated = { ...current, ...settings };
    return storage.set(STORAGE_KEYS.SETTINGS, updated);
  }
};

// Notifications storage functions
export const notificationsStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.NOTIFICATIONS, []),
  add: (notification: unknown) => {
    const notifications = notificationsStorage.get();
    notifications.push(notification);
    return storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },
  getByUser: (userId: string) => {
    const notifications = notificationsStorage.get();
    return notifications.filter((n: any) => n.userId === userId);
  },
  markAsRead: (notificationId: string) => {
    const notifications = notificationsStorage.get();
    const index = notifications.findIndex((n: any) => n.id === notificationId);
    if (index !== -1) {
      notifications[index] = { ...notifications[index], isRead: true };
      return storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
    return false;
  },
  clear: () => storage.remove(STORAGE_KEYS.NOTIFICATIONS)
};

// Analytics storage functions
export const analyticsStorage = {
  get: () => storage.get<Record<string, unknown>>(STORAGE_KEYS.ANALYTICS, {}),
  update: (data: Record<string, unknown>) => {
    const current = analyticsStorage.get();
    const updated = { ...current, ...data };
    return storage.set(STORAGE_KEYS.ANALYTICS, updated);
  },
  trackEvent: (event: string, data: Record<string, unknown>) => {
    const analytics = analyticsStorage.get();
    const events = (analytics.events as unknown[]) || [];
    events.push({
      event,
      data,
      timestamp: new Date().toISOString()
    });
    analytics.events = events;
    return storage.set(STORAGE_KEYS.ANALYTICS, analytics);
  },
  getRevenueStats: () => {
    const orders = ordersStorage.get();
    const totalRevenue = orders.reduce((total: number, order: any) => {
      if (order.status === 'delivered' || order.status === 'completed') {
        return total + (order.total || 0);
      }
      return total;
    }, 0);
    
    const monthlyRevenue = orders.reduce((monthly: Record<string, number>, order: any) => {
      if (order.status === 'delivered' || order.status === 'completed') {
        const month = new Date(order.createdAt).toISOString().slice(0, 7); // YYYY-MM
        monthly[month] = (monthly[month] || 0) + (order.total || 0);
      }
      return monthly;
    }, {});

    return { totalRevenue, monthlyRevenue };
  }
};

// Admin-specific functions
export const adminStorage = {
  getAllUsers: () => userStorage.getAll(),
  getAllOrders: () => ordersStorage.get(),
  getAllBookings: () => bookingsStorage.get(),
  getAllProducts: () => productsStorage.get(),
  getAllServices: () => servicesStorage.get(),
  getDashboardStats: () => {
    const users = userStorage.getAll();
    const orders = ordersStorage.get();
    const bookings = bookingsStorage.get();
    const products = productsStorage.get();
    const services = servicesStorage.get();

    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalBookings: bookings.length,
      totalProducts: products.length,
      totalServices: services.length,
      revenue: orders.reduce((total: number, order: any) => {
        if (order.status === 'delivered' || order.status === 'completed') {
          return total + (order.total || 0);
        }
        return total;
      }, 0),
      pendingOrders: orders.filter((o: any) => o.status === 'pending').length,
      activeBookings: bookings.filter((b: any) => 
        ['pending', 'accepted', 'in_progress'].includes(b.status)
      ).length
    };
  }
};

// Service provider-specific functions
export const providerStorage = {
  getProviderBookings: (providerId: string) => bookingsStorage.getByProvider(providerId),
  getProviderServices: (providerId: string) => servicesStorage.getByProvider(providerId),
  getProviderStats: (providerId: string) => {
    const bookings = bookingsStorage.getByProvider(providerId);
    const completedBookings = bookings.filter((b: any) => b.status === 'completed');
    const totalEarnings = completedBookings.reduce((total: number, b: any) => total + (b.totalPrice || 0), 0);
    
    return {
      totalBookings: bookings.length,
      completedBookings: completedBookings.length,
      pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
      totalEarnings,
      averageRating: bookings.length > 0 ? 
        bookings.reduce((sum: number, b: any) => sum + (b.rating || 0), 0) / bookings.length : 0
    };
  }
};

export { STORAGE_KEYS };
