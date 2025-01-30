import { NextRequest, NextResponse } from 'next/server';
import { furnitureProducts } from '../../lib/data';
import { Product } from '../../../lib/types';

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

    const newProduct: Product = {
      _id: (furnitureProducts.length + 1).toString(),
      name: body.name,
      price: body.price,
      images: body.images,
      description: body.description,
      category: body.category
    };
    
    (furnitureProducts as Product[]).push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/products error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
