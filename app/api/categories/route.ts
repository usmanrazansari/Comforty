import { NextResponse } from 'next/server';

const categories = [
  {
    _id: '1',
    name: 'Living Room',
    slug: 'living-room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
  },
  {
    _id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
  },
  {
    _id: '3',
    name: 'Dining Room',
    slug: 'dining-room',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80'
  },
  {
    _id: '4',
    name: 'Office',
    slug: 'office',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'
  }
];

export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}