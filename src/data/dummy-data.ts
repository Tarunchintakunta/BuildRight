import { 
  User, 
  ServiceProvider, 
  Customer, 
  Admin, 
  ServiceCategory, 
  Product, 
  ProductCategory,
  Review,
  PortfolioItem,
  Address,
  Contract
} from '@/types';

// Dummy Users
export const dummyUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@site.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg',
    phone: '+1-555-0001',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'customer-1',
    email: 'customer@site.com',
    name: 'John Smith',
    role: 'customer',
    avatar: '/images/avatars/customer.jpg',
    phone: '+1-555-0002',
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'painter-1',
    email: 'painter@site.com',
    name: 'Mike Johnson',
    role: 'service_provider',
    avatar: '/images/avatars/painter.jpg',
    phone: '+1-555-0003',
    createdAt: new Date('2024-01-03')
  },
  {
    id: 'contractor-1',
    email: 'contractor@site.com',
    name: 'Sarah Wilson',
    role: 'service_provider',
    avatar: '/images/avatars/contractor.jpg',
    phone: '+1-555-0004',
    createdAt: new Date('2024-01-04')
  },
  {
    id: 'electrician-1',
    email: 'electrician@site.com',
    name: 'David Brown',
    role: 'service_provider',
    avatar: '/images/avatars/electrician.jpg',
    phone: '+1-555-0005',
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'carpenter-1',
    email: 'carpenter@site.com',
    name: 'Lisa Davis',
    role: 'service_provider',
    avatar: '/images/avatars/carpenter.jpg',
    phone: '+1-555-0006',
    createdAt: new Date('2024-01-06')
  }
];

// Dummy Service Categories
export const dummyServiceCategories: ServiceCategory[] = [
  {
    id: 'contractor',
    name: 'Contractor',
    icon: '🏗️',
    description: 'General construction and project management',
    services: ['Project Management', 'Site Supervision', 'Quality Control']
  },
  {
    id: 'painter',
    name: 'Painter',
    icon: '🎨',
    description: 'Interior and exterior painting services',
    services: ['Interior Painting', 'Exterior Painting', 'Wall Texturing', 'Color Consultation']
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: '🔨',
    description: 'Woodwork and carpentry services',
    services: ['Custom Furniture', 'Cabinet Making', 'Door Installation', 'Window Frames']
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: '🔧',
    description: 'Plumbing and pipe installation',
    services: ['Pipe Installation', 'Fixture Installation', 'Drainage Systems', 'Water Heaters']
  },
  {
    id: 'electrician',
    name: 'Electrician',
    icon: '⚡',
    description: 'Electrical installation and repair',
    services: ['Wiring Installation', 'Panel Upgrades', 'Lighting Systems', 'Safety Inspections']
  },
  {
    id: 'mason',
    name: 'Mason',
    icon: '🧱',
    description: 'Brickwork and masonry services',
    services: ['Brick Laying', 'Stone Work', 'Concrete Work', 'Foundation Repair']
  },
  {
    id: 'welder',
    name: 'Welder',
    icon: '🔥',
    description: 'Metal fabrication and welding',
    services: ['Metal Fabrication', 'Structural Welding', 'Custom Metalwork', 'Repair Services']
  },
  {
    id: 'interior-designer',
    name: 'Interior Designer',
    icon: '🏠',
    description: 'Interior design and decoration',
    services: ['Space Planning', 'Color Schemes', 'Furniture Selection', 'Lighting Design']
  },
  {
    id: 'architect',
    name: 'Architect',
    icon: '📐',
    description: 'Architectural design and planning',
    services: ['Building Design', 'Site Planning', 'Construction Documents', 'Project Coordination']
  },
  {
    id: 'civil-engineer',
    name: 'Civil Engineer',
    icon: '🌉',
    description: 'Structural and civil engineering',
    services: ['Structural Analysis', 'Foundation Design', 'Site Development', 'Code Compliance']
  },
  {
    id: 'landscaper',
    name: 'Landscaper',
    icon: '🌳',
    description: 'Landscape design and maintenance',
    services: ['Garden Design', 'Planting', 'Irrigation Systems', 'Maintenance']
  },
  {
    id: 'roofer',
    name: 'Roofer',
    icon: '🏠',
    description: 'Roofing installation and repair',
    services: ['Roof Installation', 'Repair Services', 'Gutter Systems', 'Insulation']
  },
  {
    id: 'tile-worker',
    name: 'Tile Worker',
    icon: '🧱',
    description: 'Tile installation and repair',
    services: ['Floor Tiling', 'Wall Tiling', 'Mosaic Work', 'Grout Repair']
  },
  {
    id: 'flooring-specialist',
    name: 'Flooring Specialist',
    icon: '🪑',
    description: 'Flooring installation and repair',
    services: ['Hardwood Installation', 'Laminate Flooring', 'Carpet Installation', 'Floor Repair']
  }
];

// Dummy Product Categories
export const dummyProductCategories: ProductCategory[] = [
  {
    id: 'paints',
    name: 'Paints',
    icon: '🎨',
    description: 'Interior and exterior paints, primers, and coatings'
  },
  {
    id: 'cement',
    name: 'Cement',
    icon: '🏗️',
    description: 'Portland cement, concrete mix, and masonry products'
  },
  {
    id: 'steel',
    name: 'Steel',
    icon: '🔩',
    description: 'Structural steel, rebar, and metal products'
  },
  {
    id: 'wood-plywood',
    name: 'Wood & Plywood',
    icon: '🪵',
    description: 'Lumber, plywood, and engineered wood products'
  },
  {
    id: 'tiles',
    name: 'Tiles',
    icon: '🧱',
    description: 'Ceramic, porcelain, and natural stone tiles'
  },
  {
    id: 'sanitary',
    name: 'Sanitary',
    icon: '🚽',
    description: 'Bathroom fixtures and sanitary ware'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🔧',
    description: 'Pipes, fittings, and plumbing supplies'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    description: 'Wiring, switches, and electrical components'
  },
  {
    id: 'roofing',
    name: 'Roofing',
    icon: '🏠',
    description: 'Roofing materials and accessories'
  },
  {
    id: 'safety-equipment',
    name: 'Safety Equipment',
    icon: '🦺',
    description: 'Personal protective equipment and safety gear'
  },
  {
    id: 'tools-machinery',
    name: 'Tools & Machinery',
    icon: '🔨',
    description: 'Hand tools, power tools, and construction machinery'
  }
];

// Dummy Reviews
export const dummyReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'customer-1',
    userName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Very professional and completed the work on time.',
    createdAt: new Date('2024-01-15'),
    helpful: 12
  },
  {
    id: 'review-2',
    userId: 'customer-2',
    userName: 'Jane Doe',
    rating: 4,
    comment: 'Good quality work, but took a bit longer than expected.',
    createdAt: new Date('2024-01-14'),
    helpful: 8
  },
  {
    id: 'review-3',
    userId: 'customer-3',
    userName: 'Bob Wilson',
    rating: 5,
    comment: 'Highly recommend! Fair pricing and excellent craftsmanship.',
    createdAt: new Date('2024-01-13'),
    helpful: 15
  }
];

// Dummy Portfolio Items
export const dummyPortfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Modern Office Renovation',
    description: 'Complete office space renovation including painting, flooring, and electrical work',
    image: '/images/portfolio/office-renovation.jpg',
    category: 'Contractor',
    completedAt: new Date('2024-01-10')
  },
  {
    id: 'portfolio-2',
    title: 'Residential Painting Project',
    description: 'Interior and exterior painting for a 3-bedroom house',
    image: '/images/portfolio/residential-painting.jpg',
    category: 'Painter',
    completedAt: new Date('2024-01-08')
  },
  {
    id: 'portfolio-3',
    title: 'Custom Kitchen Cabinets',
    description: 'Design and installation of custom kitchen cabinets',
    image: '/images/portfolio/kitchen-cabinets.jpg',
    category: 'Carpenter',
    completedAt: new Date('2024-01-05')
  }
];

// Dummy Addresses
export const dummyAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'home',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true
  },
  {
    id: 'addr-2',
    type: 'office',
    address: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false
  }
];

// Dummy Service Providers
export const dummyServiceProviders: ServiceProvider[] = [
  {
    id: 'painter-1',
    email: 'painter@site.com',
    name: 'Mike Johnson',
    role: 'service_provider',
    avatar: '/images/avatars/painter.jpg',
    phone: '+1-555-0003',
    createdAt: new Date('2024-01-03'),
    category: dummyServiceCategories[1], // Painter
    yearsExperience: 8,
    languages: ['English', 'Spanish'],
    location: {
      address: '789 Paint Street',
      city: 'New York',
      state: 'NY',
      coordinates: [40.7128, -74.0060]
    },
    availability: {
      schedule: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM',
      isAvailable: true,
      urgentAvailable: true
    },
               pricing: {
             hourly: 1800,
             daily: 14000,
             project: 0
           },
    rating: 4.8,
    reviews: [dummyReviews[0], dummyReviews[1]],
    portfolio: [dummyPortfolioItems[1]],
    earnings: 12500,
    completedJobs: 156
  },
  {
    id: 'contractor-1',
    email: 'contractor@site.com',
    name: 'Sarah Wilson',
    role: 'service_provider',
    avatar: '/images/avatars/contractor.jpg',
    phone: '+1-555-0004',
    createdAt: new Date('2024-01-04'),
    category: dummyServiceCategories[0], // Contractor
    yearsExperience: 12,
    languages: ['English'],
    location: {
      address: '321 Construction Blvd',
      city: 'New York',
      state: 'NY',
      coordinates: [40.7589, -73.9851]
    },
    availability: {
      schedule: 'Mon-Fri 7AM-7PM, Sat 8AM-5PM',
      isAvailable: true,
      urgentAvailable: false
    },
               pricing: {
             hourly: 2600,
             daily: 20000,
             project: 0
           },
    rating: 4.9,
    reviews: [dummyReviews[2]],
    portfolio: [dummyPortfolioItems[0]],
    earnings: 45000,
    completedJobs: 89
  },
  {
    id: 'electrician-1',
    email: 'electrician@site.com',
    name: 'David Brown',
    role: 'service_provider',
    avatar: '/images/avatars/electrician.jpg',
    phone: '+1-555-0005',
    createdAt: new Date('2024-01-05'),
    category: dummyServiceCategories[4], // Electrician
    yearsExperience: 6,
    languages: ['English', 'French'],
    location: {
      address: '654 Power Lane',
      city: 'New York',
      state: 'NY',
      coordinates: [40.7505, -73.9934]
    },
    availability: {
      schedule: 'Mon-Fri 8AM-6PM, Emergency 24/7',
      isAvailable: true,
      urgentAvailable: true
    },
               pricing: {
             hourly: 2200,
             daily: 16000,
             project: 0
           },
    rating: 4.7,
    reviews: [],
    portfolio: [],
    earnings: 22000,
    completedJobs: 78
  },
  {
    id: 'carpenter-1',
    email: 'carpenter@site.com',
    name: 'Lisa Davis',
    role: 'service_provider',
    avatar: '/images/avatars/carpenter.jpg',
    phone: '+1-555-0006',
    createdAt: new Date('2024-01-06'),
    category: dummyServiceCategories[2], // Carpenter
    yearsExperience: 10,
    languages: ['English', 'German'],
    location: {
      address: '987 Wood Road',
      city: 'New York',
      state: 'NY',
      coordinates: [40.7614, -73.9776]
    },
    availability: {
      schedule: 'Mon-Fri 7AM-5PM, Sat 8AM-3PM',
      isAvailable: true,
      urgentAvailable: false
    },
               pricing: {
             hourly: 2000,
             daily: 15000,
             project: 0
           },
    rating: 4.6,
    reviews: [],
    portfolio: [dummyPortfolioItems[2]],
    earnings: 28000,
    completedJobs: 112
  }
];

// Dummy Products
export const dummyProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Interior Paint',
    brand: 'ColorMax',
    category: dummyProductCategories[0], // Paints
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop',
    price: 1899,
    qualityGrade: 'A',
    rating: 4.8,
    reviews: [dummyReviews[0]],
    stock: 150,
    description: 'High-quality interior paint with excellent coverage and durability',
    specifications: {
      'Coverage': '400 sq ft per gallon',
      'Drying Time': '2-4 hours',
      'Finish': 'Matte',
      'VOC': 'Low'
    }
  },
  {
    id: 'prod-2',
    name: 'Portland Cement',
    brand: 'BuildRight',
    category: dummyProductCategories[1], // Cement
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 399,
    qualityGrade: 'A',
    rating: 4.9,
    reviews: [dummyReviews[1]],
    stock: 500,
    description: 'Premium Portland cement for construction and masonry work',
    specifications: {
      'Strength': '32.5 MPa',
      'Setting Time': '45-90 minutes',
      'Weight': '50kg bag',
      'Type': 'Type I'
    }
  },
  {
    id: 'prod-3',
    name: 'Structural Steel Beam',
    brand: 'SteelPro',
    category: dummyProductCategories[2], // Steel
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 24999,
    qualityGrade: 'A',
    rating: 4.7,
    reviews: [dummyReviews[2]],
    stock: 25,
    description: 'High-strength structural steel beam for construction projects',
    specifications: {
      'Length': '20 feet',
      'Weight': '150 lbs per foot',
      'Grade': 'A36',
      'Yield Strength': '36,000 psi'
    }
  },
  {
    id: 'prod-4',
    name: 'Premium Plywood Sheet',
    brand: 'WoodCraft',
    category: dummyProductCategories[3], // Wood & Plywood
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 3499,
    qualityGrade: 'A',
    rating: 4.6,
    reviews: [],
    stock: 75,
    description: 'High-quality plywood for furniture and construction',
    specifications: {
      'Size': '4x8 feet',
      'Thickness': '3/4 inch',
      'Grade': 'A-A',
      'Core': 'Birch'
    }
  },
  {
    id: 'prod-5',
    name: 'Ceramic Floor Tiles',
    brand: 'TileMaster',
    category: dummyProductCategories[4], // Tiles
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 149,
    qualityGrade: 'A',
    rating: 4.8,
    reviews: [],
    stock: 1000,
    description: 'Beautiful ceramic floor tiles in various patterns',
    specifications: {
      'Size': '12x12 inches',
      'Thickness': '8mm',
      'Finish': 'Glazed',
      'Water Absorption': '<0.5%'
    }
  },
  {
    id: 'prod-6',
    name: 'Safety Hard Hat',
    brand: 'SafeGuard',
    category: dummyProductCategories[9], // Safety Equipment
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 899,
    qualityGrade: 'A',
    rating: 4.9,
    reviews: [],
    stock: 200,
    description: 'ANSI certified hard hat for construction safety',
    specifications: {
      'Material': 'High-density polyethylene',
      'ANSI Rating': 'Type I, Class C',
      'Weight': '14 oz',
      'Colors': 'Yellow, Orange, White'
    }
  },
  {
    id: 'prod-7',
    name: 'Circular Saw',
    brand: 'PowerTool',
    category: dummyProductCategories[10], // Tools & Machinery
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 12499,
    qualityGrade: 'A',
    rating: 4.7,
    reviews: [],
    stock: 50,
    description: 'Professional circular saw with laser guide',
    specifications: {
      'Power': '15 Amp',
      'Blade Size': '7-1/4 inch',
      'RPM': '5,800',
      'Weight': '11.5 lbs'
    }
  },
  {
    id: 'prod-8',
    name: 'Copper Pipe Set',
    brand: 'PipePro',
    category: dummyProductCategories[6], // Plumbing
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    price: 2499,
    qualityGrade: 'A',
    rating: 4.6,
    reviews: [],
    stock: 300,
    description: 'High-quality copper pipes for plumbing installations',
    specifications: {
      'Material': 'Type L Copper',
      'Diameter': '1/2 inch',
      'Length': '10 feet',
      'Thickness': '0.035 inch'
    }
  }
];

// Dummy Contracts
export const dummyContracts: Contract[] = [
  {
    id: 'contract-1',
    customerId: 'customer-1',
    title: 'Office Building Renovation',
    description: 'Complete renovation of a 5000 sq ft office building including painting, flooring, and electrical work',
    category: 'Contractor',
               budget: {
             min: 3750000,
             max: 5625000
           },
    location: dummyAddresses[1],
    deadline: new Date('2024-06-30'),
    status: 'open',
    bids: [],
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'contract-2',
    customerId: 'customer-1',
    title: 'Residential Kitchen Remodel',
    description: 'Kitchen renovation including new cabinets, countertops, and appliances',
    category: 'Carpenter',
               budget: {
             min: 1125000,
             max: 1875000
           },
    location: dummyAddresses[0],
    deadline: new Date('2024-05-15'),
    status: 'open',
    bids: [],
    createdAt: new Date('2024-01-18')
  }
];

// Dummy Admin
export const dummyAdmin: Admin = {
  id: 'admin-1',
  email: 'admin@site.com',
  name: 'Admin User',
  role: 'admin',
  avatar: '/images/avatars/admin.jpg',
  phone: '+1-555-0001',
  createdAt: new Date('2024-01-01'),
  permissions: ['manage_users', 'manage_providers', 'manage_products', 'manage_orders', 'manage_reviews', 'manage_bids', 'manage_disputes']
};

// Dummy Customer
export const dummyCustomer: Customer = {
  id: 'customer-1',
  email: 'customer@site.com',
  name: 'John Smith',
  role: 'customer',
  avatar: '/images/avatars/customer.jpg',
  phone: '+1-555-0002',
  createdAt: new Date('2024-01-02'),
  addresses: dummyAddresses,
  orders: [],
  bookings: [],
  wishlist: ['prod-1', 'prod-3']
};
