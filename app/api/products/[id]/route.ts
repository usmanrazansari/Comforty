import { NextResponse } from 'next/server';
import { furnitureProducts } from '../route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = furnitureProducts.find(p => p._id === params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}