import { NextRequest, NextResponse } from 'next/server';
import { furnitureProducts } from '../../lib/data';
import { Product, ApiResponse } from '../../lib/types';

export async function GET(request: NextRequest) {
  try {
    if (!furnitureProducts || !Array.isArray(furnitureProducts)) {
      throw new Error('Products data is not properly initialized');
    }

    const response = NextResponse.json<ApiResponse<Product[]>>({
      data: furnitureProducts,
      status: 200
    });
    response.headers.set('Cache-Control', 's-maxage=3600');
    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<ApiResponse<never>>({
      error: errorMessage,
      status: 500
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'images', 'description', 'category'] as const;
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json<ApiResponse<never>>({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        status: 400
      }, { status: 400 });
    }

    const newProduct: Product = {
      _id: (furnitureProducts.length + 1).toString(),
      name: body.name,
      price: body.price,
      images: body.images,
      description: body.description,
      category: body.category,
      specifications: body.specifications || [],
      features: body.features || [],
      stock: body.stock || 0,
      rating: body.rating || 0
    };
    
    furnitureProducts.push(newProduct);
    
    return NextResponse.json<ApiResponse<Product>>({
      data: newProduct,
      status: 201
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<ApiResponse<never>>({
      error: errorMessage,
      status: 500
    }, { status: 500 });
  }
}
