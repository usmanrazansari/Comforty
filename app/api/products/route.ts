import { NextResponse } from 'next/server';

export const furnitureProducts = [
  // Sofas
  {
    id: 1,
    name: 'Modern Leather Sofa',
    price: 999,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    category: { name: 'Sofas' },
    description: 'Luxurious leather sofa with modern design'
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 3,
    name: 'Sectional Sofa',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 4,
    name: 'Dining Chair Set',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 5,
    name: 'Velvet Accent Chair',
    price: 449,
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 6,
    name: 'L-Shaped Sofa',
    price: 1599,
    imageUrl: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 7,
    name: 'Recliner Chair',
    price: 599,
    imageUrl: 'https://images.unsplash.com/photo-1506439753458-613cf88baab3?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 8,
    name: 'Contemporary Sofa',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 9,
    name: 'Wooden Dining Chair',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 10,
    name: 'Modern Loveseat',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 11,
    name: 'Executive Office Chair',
    price: 499,
    imageUrl: 'https://images.unsplash.com/photo-1589384267710-7a25bc5ab784?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 12,
    name: 'Corner Sofa Bed',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 13,
    name: 'Bar Stool Set',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 14,
    name: 'Chesterfield Sofa',
    price: 1699,
    imageUrl: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500',
    category: { name: 'Sofas' }
  },
  {
    id: 15,
    name: 'Gaming Chair',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
    category: { name: 'Chairs' }
  },
  {
    id: 16,
    name: 'Modular Sofa',
    price: 1899,
    imageUrl: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500',
    category: { name: 'Sofas' }
  },

  // Tables
  {
    id: 17,
    name: 'Glass Dining Table',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500',
    category: { name: 'Tables' },
    description: 'Elegant glass dining table'
  },
  {
    id: 18,
    name: 'Wooden Coffee Table',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500',
    category: { name: 'Tables' },
    description: 'Rustic wooden coffee table'
  },

  // Beds
  {
    id: 19,
    name: 'Queen Platform Bed',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500',
    category: { name: 'Beds' },
    description: 'Modern platform bed with headboard'
  },
  {
    id: 20,
    name: 'King Size Bed',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
    category: { name: 'Beds' },
    description: 'Luxurious king size bed with storage'
  },

  // Storage
  {
    id: 21,
    name: 'Wooden Wardrobe',
    price: 699,
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
    category: { name: 'Storage' },
    description: 'Spacious wooden wardrobe'
  },
  {
    id: 22,
    name: 'Bookshelf',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500',
    category: { name: 'Storage' },
    description: 'Modern bookshelf with multiple compartments'
  },

  // Lighting
  {
    id: 23,
    name: 'Floor Lamp',
    price: 129,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: { name: 'Lighting' },
    description: 'Contemporary floor lamp'
  },
  {
    id: 24,
    name: 'Pendant Light',
    price: 179,
    imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500',
    category: { name: 'Lighting' },
    description: 'Modern pendant light fixture'
  },

  // Decor
  {
    id: 25,
    name: 'Wall Mirror',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500',
    category: { name: 'Decor' },
    description: 'Decorative wall mirror'
  },
  {
    id: 26,
    name: 'Area Rug',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500',
    category: { name: 'Decor' },
    description: 'Stylish area rug for living room'
  }
];

export async function GET() {
  try {
    return NextResponse.json(furnitureProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Add validation here
    const newProduct = {
      id: furnitureProducts.length + 1,
      ...body
    };
    furnitureProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// Add category endpoint
export async function getCategories() {
  const categories = [
    { id: 1, name: 'Sofas' },
    { id: 2, name: 'Chairs' },
    { id: 3, name: 'Tables' },
    { id: 4, name: 'Beds' },
    { id: 5, name: 'Storage' },
    { id: 6, name: 'Lighting' },
    { id: 7, name: 'Decor' }
  ];
  return categories;
}
