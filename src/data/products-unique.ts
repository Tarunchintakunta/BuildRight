// Dummy Products with Unique Images for Each Category
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
