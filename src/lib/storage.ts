// Storage utility functions for localStorage management

const STORAGE_KEYS = {
  CART: 'construction_cart',
  USER: 'construction_user',
  ORDERS: 'construction_orders',
  BOOKINGS: 'construction_bookings',
  WISHLIST: 'construction_wishlist',
  SETTINGS: 'construction_settings'
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
  clear: () => storage.remove(STORAGE_KEYS.CART)
};

// User storage functions
export const userStorage = {
  get: () => storage.get<unknown | null>(STORAGE_KEYS.USER, null),
  set: (user: unknown) => storage.set(STORAGE_KEYS.USER, user),
  clear: () => storage.remove(STORAGE_KEYS.USER)
};

// Orders storage functions
export const ordersStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.ORDERS, []),
  add: (order: unknown) => {
    const orders = ordersStorage.get();
    orders.push(order);
    return storage.set(STORAGE_KEYS.ORDERS, orders);
  },
  update: (orderId: string, updates: Partial<unknown>) => {
    const orders = ordersStorage.get();
    const index = orders.findIndex((o: unknown) => (o as { id: string }).id === orderId);
    if (index !== -1) {
      (orders[index] as Record<string, unknown>) = { ...(orders[index] as Record<string, unknown>), ...updates };
      return storage.set(STORAGE_KEYS.ORDERS, orders);
    }
    return false;
  },
  getById: (orderId: string) => {
    const orders = ordersStorage.get();
    return orders.find((o: unknown) => (o as { id: string }).id === orderId) || null;
  }
};

// Bookings storage functions
export const bookingsStorage = {
  get: () => storage.get<unknown[]>(STORAGE_KEYS.BOOKINGS, []),
  add: (booking: unknown) => {
    const bookings = bookingsStorage.get();
    bookings.push(booking);
    return storage.set(STORAGE_KEYS.BOOKINGS, bookings);
  },
  update: (bookingId: string, updates: Partial<unknown>) => {
    const bookings = bookingsStorage.get();
    const index = bookings.findIndex((b: unknown) => (b as { id: string }).id === bookingId);
    if (index !== -1) {
      (bookings[index] as Record<string, unknown>) = { ...(bookings[index] as Record<string, unknown>), ...updates };
      return storage.set(STORAGE_KEYS.BOOKINGS, bookings);
    }
    return false;
  },
  getByProvider: (providerId: string) => {
    const bookings = bookingsStorage.get();
    return bookings.filter((b: unknown) => (b as { providerId: string }).providerId === providerId);
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

export { STORAGE_KEYS };
