import { NextRequest, NextResponse } from 'next/server';

const furnitureProducts = [
  {
    _id: "1",
    name: 'Modern Leather Sofa',
    price: 999,
    category: { name: 'Living Room', _id: '1' },
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'],
    description: 'Experience the perfect blend of comfort and style with our Modern Leather Sofa. Crafted with premium Italian leather and built on a sturdy hardwood frame, this sofa offers exceptional durability and sophistication. The high-density foam cushions provide optimal comfort, while the clean lines and rich brown color complement any contemporary living space.',
    features: [
      'Premium Italian leather upholstery',
      'High-density foam cushions for optimal comfort',
      'Kiln-dried hardwood frame for durability',
      'No-sag spring system',
      'Removable seat cushions for easy cleaning',
      'Sleek modern design with clean lines'
    ],
    specifications: [
      { name: 'Material', value: 'Premium Italian Leather' },
      { name: 'Dimensions', value: '85"W x 38"D x 35"H' },
      { name: 'Seating Capacity', value: '3 People' },
      { name: 'Frame', value: 'Kiln-dried Hardwood' },
      { name: 'Color', value: 'Rich Brown' }
    ]
  },
  {
    _id: "2",
    name: 'Ergonomic Office Chair',
    price: 299,
    category: { name: 'Office', _id: '4' },
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500'],
    description: 'Premium ergonomic office chair designed for ultimate comfort during long work hours. Features advanced lumbar support system, breathable mesh back, and customizable settings for a personalized seating experience.',
    features: [
      'Advanced lumbar support system',
      'Breathable mesh back design',
      'Multi-directional 4D armrests',
      'Synchronized tilt mechanism',
      'Memory foam seat cushion',
      'Adjustable headrest with neck support'
    ],
    specifications: [
      { name: 'Material', value: 'High-grade Mesh & Premium Foam' },
      { name: 'Dimensions', value: '26"W x 26"D x 38-42"H' },
      { name: 'Weight Capacity', value: '300 lbs' },
      { name: 'Adjustability', value: '4D Armrests, Seat Height, Tilt Tension' },
      { name: 'Features', value: 'Lumbar Support, Headrest, 360° Swivel' },
      { name: 'Warranty', value: '5 Years' }
    ]
  },
  {
    _id: "3",
    name: 'Wooden Dining Table',
    price: 799,
    category: { name: 'Dining Room', _id: '3' },
    images: ['https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500'],
    description: 'Elegant solid wood dining table crafted for family gatherings and entertaining. Features premium hardwood construction, stunning grain patterns, and protective finish for lasting beauty.',
    features: [
      'Solid oak construction with unique grain patterns',
      'Protective clear coat finish',
      'Expandable design with leaf insert',
      'Sturdy mortise and tenon joinery',
      'Adjustable leg levelers',
      'Heat and scratch-resistant surface'
    ],
    specifications: [
      { name: 'Material', value: 'Solid Oak Wood' },
      { name: 'Dimensions', value: '72"L x 42"W x 30"H' },
      { name: 'Seating Capacity', value: '6-8 People' },
      { name: 'Finish', value: 'Natural Oak with Clear Coat' },
      { name: 'Style', value: 'Contemporary Rustic' },
      { name: 'Assembly', value: 'White Glove Delivery Available' }
    ]
  },
  {
    _id: "4",
    name: 'Bedside Table',
    price: 149,
    category: { name: 'Bedroom', _id: '2' },
    images: ['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500'],
    description: 'Versatile and stylish bedside table with smart storage solutions. Perfect for keeping essentials within reach while adding a touch of elegance to your bedroom.',
    features: [
      'Soft-close drawer mechanisms',
      'Built-in USB charging port',
      'Hidden wireless charging pad',
      'Anti-tip safety hardware',
      'Moisture-resistant finish',
      'Cable management system'
    ],
    specifications: [
      { name: 'Material', value: 'Solid Wood & MDF' },
      { name: 'Dimensions', value: '18"W x 15"D x 24"H' },
      { name: 'Storage', value: '2 Drawers with Soft-Close' },
      { name: 'Color Options', value: 'White, Oak, Walnut' },
      { name: 'Features', value: 'Anti-tip Hardware, Cable Management' },
      { name: 'Assembly', value: 'Easy Assembly Required' }
    ]
  },
  {
    _id: "5",
    name: 'Modern Bookshelf',
    price: 399,
    category: { name: 'Living Room', _id: '1' },
    images: ['https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=500'],
    description: 'Contemporary bookshelf with multiple compartments. Ideal for organizing books and displaying decorative items.',
    features: [
      'Adjustable shelf heights',
      'Anti-tip wall mounting system',
      'Hidden cable management',
      'Reinforced steel frame',
      'Modular design for expansion',
      'Built-in LED accent lighting'
    ],
    specifications: [
      { name: 'Material', value: 'Engineered Wood' },
      { name: 'Dimensions', value: '71"H x 47"W x 16"D' },
      { name: 'Shelves', value: '6 Adjustable Shelves' },
      { name: 'Color', value: 'White Oak' }
    ]
  },
  {
    _id: "6",
    name: 'L-Shaped Sofa',
    price: 1599,
    category: { name: 'Living Room', _id: '1' },
    images: ['https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500'],
    description: 'Luxurious L-shaped sofa designed for both comfort and style. Perfect for large living spaces, featuring modular design and premium upholstery for versatile seating arrangements.',
    features: [
      'Reversible chaise configuration',
      'Hidden storage compartment',
      'Stain-resistant fabric treatment',
      'Memory foam seat cushions',
      'Power recline functionality',
      'USB charging ports in armrest'
    ],
    specifications: [
      { name: 'Material', value: 'Premium Fabric & High-Density Foam' },
      { name: 'Dimensions', value: '112"W x 85"D x 35"H' },
      { name: 'Seating', value: '5-6 People' },
      { name: 'Frame', value: 'Engineered Wood & Steel' },
      { name: 'Features', value: 'Reversible Chaise, Storage Ottoman' },
      { name: 'Maintenance', value: 'Removable, Washable Covers' }
    ]
  },
  {
    _id: "7",
    name: 'Designer Coffee Table',
    price: 299,
    category: { name: 'Living Room', _id: '1' },
    images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500'],
    description: 'Modern coffee table with sleek design, featuring a tempered glass top and sturdy metal frame. Perfect centerpiece for any living room.',
    features: [
      'Tempered glass top for durability',
      'Sturdy metal frame with chrome finish',
      'Adjustable leg levelers',
      'Hidden storage compartment',
      'Cable management system',
      'Sleek modern design'
    ],
    specifications: [
      { name: 'Material', value: 'Tempered Glass & Metal' },
      { name: 'Dimensions', value: '47"L x 24"W x 16"H' },
      { name: 'Weight Capacity', value: '100 lbs' },
      { name: 'Style', value: 'Contemporary' }
    ]
  },
  {
    _id: "8",
    name: 'Accent Armchair',
    price: 449,
    category: { name: 'Living Room', _id: '1' },
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500'],
    description: 'Luxurious accent armchair with plush velvet upholstery. Perfect for creating a cozy reading nook or adding sophistication to any room.',
    features: [
      'Plush velvet upholstery',
      'Solid wood frame with walnut finish',
      'High-density foam cushions',
      'Adjustable armrests',
      'Hidden storage compartment',
      'Sleek modern design'
    ],
    specifications: [
      { name: 'Material', value: 'Velvet Upholstery' },
      { name: 'Frame', value: 'Solid Wood' },
      { name: 'Dimensions', value: '33"W x 35"D x 32"H' },
      { name: 'Color', value: 'Emerald Green' },
      { name: 'Weight Capacity', value: '300 lbs' }
    ]
  },
  {
    _id: "9",
    name: 'Wardrobe Cabinet',
    price: 899,
    category: { name: 'Bedroom', _id: '2' },
    images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500'],
    description: 'Spacious wardrobe cabinet with intelligent storage solutions. Features adjustable shelving, full-length mirrors, and soft-close doors for a premium organization experience.',
    features: [
      'Motion-sensor LED lighting',
      'Full-length mirror with anti-fog coating',
      'Soft-close door mechanisms',
      'Adjustable hanging rods',
      'Built-in jewelry organizer',
      'Ventilated shoe storage'
    ],
    specifications: [
      { name: 'Material', value: 'Engineered Wood with Matte Finish' },
      { name: 'Dimensions', value: '78"H x 60"W x 24"D' },
      { name: 'Storage', value: '5 Shelves, 2 Drawers, Hanging Rod' },
      { name: 'Features', value: 'LED Lighting, Full-Length Mirror' },
      { name: 'Door Type', value: 'Soft-Close Sliding Doors' },
      { name: 'Assembly', value: 'Professional Assembly Included' }
    ]
  },
  {
    _id: "10",
    name: 'Study Desk',
    price: 349,
    category: { name: 'Office', _id: '4' },
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500'],
    description: 'Functional study desk with drawer storage. Ideal for home office or student use.',
    features: [
      'Spacious work surface',
      'Built-in drawer storage',
      'Adjustable leg levelers',
      'Cable management system',
      'Durable metal frame',
      'Sleek modern design'
    ],
    specifications: [
      { name: 'Material', value: 'Engineered Wood' },
      { name: 'Dimensions', value: '60"W x 30"D x 30"H' },
      { name: 'Storage', value: '1 Drawer' },
      { name: 'Color', value: 'White Oak' }
    ]
  },
  {
    _id: "11",
    name: 'Gaming Chair Pro',
    price: 449,
    category: { name: 'Office', _id: '4' },
    images: ['https://images.pexels.com/photos/12935064/pexels-photo-12935064.jpeg?w=500'],
    description: 'Professional gaming chair engineered for extended gaming sessions. Features racing-inspired design with premium comfort and adjustable support systems.',
    features: [
      '4D adjustable armrests',
      'Multi-tilt mechanism with lock',
      'Magnetic head pillow',
      'Retractable footrest',
      'RGB lighting effects',
      'Built-in massage function'
    ],
    specifications: [
      { name: 'Material', value: 'PU Leather & Cold-Cure Foam' },
      { name: 'Dimensions', value: '27"W x 27"D x 48-51"H' },
      { name: 'Weight Capacity', value: '330 lbs' },
      { name: 'Recline', value: '90-165° Adjustable' },
      { name: 'Features', value: '4D Armrests, Neck & Lumbar Pillows' },
      { name: 'Warranty', value: '3 Years Limited' }
    ]
  },
  {
    _id: "12",
    name: 'Executive Desk',
    price: 899,
    category: { name: 'Office', _id: '4' },
    images: ['https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?w=500'],
    description: 'Premium executive desk with spacious work surface and built-in storage. Features cable management system and elegant design.',
    features: [
      'Built-in wireless charging pad',
      'Hidden cable management system',
      'Power hub with USB ports',
      'Lockable file drawer',
      'Pull-out keyboard tray',
      'Anti-scratch surface coating'
    ],
    specifications: [
      { name: 'Material', value: 'Solid Wood & Veneer' },
      { name: 'Dimensions', value: '72"W x 36"D x 30"H' },
      { name: 'Storage', value: '3 Drawers, 1 File Cabinet' },
      { name: 'Color', value: 'Dark Walnut' },
      { name: 'Weight Capacity', value: '200 lbs' }
    ]
  }
];

export { furnitureProducts };

export async function GET(request: NextRequest) {
  try {
    if (!furnitureProducts || !Array.isArray(furnitureProducts)) {
      throw new Error('Products data is not properly initialized');
    }
    const response = NextResponse.json(furnitureProducts);
    response.headers.set('Cache-Control', 's-maxage=3600');
    return response;
  } catch (error: unknown) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.images || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, images, description, and category are required' },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof body.name !== 'string' || 
        typeof body.price !== 'number' || 
        !Array.isArray(body.images) || 
        typeof body.description !== 'string' || 
        typeof body.category !== 'object') {
      return NextResponse.json(
        { error: 'Invalid data types for required fields' },
        { status: 400 }
      );
    }

    const newProduct = {
      _id: furnitureProducts.length + 1,
      ...body
    };
    
    furnitureProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/products error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
