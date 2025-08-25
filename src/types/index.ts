export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'service_provider';
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface ServiceProvider extends User {
  role: 'service_provider';
  category: ServiceCategory;
  yearsExperience: number;
  languages: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: [number, number];
  };
  availability: {
    schedule: string;
    isAvailable: boolean;
    urgentAvailable: boolean;
  };
  pricing: {
    hourly: number;
    daily: number;
    project: number;
  };
  rating: number;
  reviews: Review[];
  portfolio: PortfolioItem[];
  earnings: number;
  completedJobs: number;
}

export interface Customer extends User {
  role: 'customer';
  addresses: Address[];
  orders: Order[];
  bookings: ServiceBooking[];
  wishlist: string[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: string[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  providers: ServiceProvider[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;
  price: number;
  qualityGrade: 'A' | 'B' | 'C';
  rating: number;
  reviews: Review[];
  stock: number;
  description: string;
  specifications: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  completedAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  itemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  providerId?: string;
  category?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryAddress: Address;
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface ServiceBooking {
  id: string;
  customerId: string;
  providerId: string;
  service: string;
  category: string;
  workersRequired: number;
  preferredLanguages: string[];
  location: Address;
  scheduledDate: Date;
  isUrgent: boolean;
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
  providerNotes?: string;
  customerNotes?: string;
}

export interface Bid {
  id: string;
  contractId: string;
  providerId: string;
  amount: number;
  estimatedDays: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Contract {
  id: string;
  customerId: string;
  title: string;
  description: string;
  category: string;
  budget: {
    min: number;
    max: number;
  };
  location: Address;
  deadline: Date;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  bids: Bid[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}
