import { NextResponse } from 'next/server';
import { furnitureProducts } from '../route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching product with ID:', params.id);
    console.log('Available products:', furnitureProducts);
    
    const product = furnitureProducts.find(p => p._id === params.id);
    console.log('Found product:', product);

    if (!product) {
      console.log('Product not found');
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}