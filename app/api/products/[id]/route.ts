import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]{
        _id,
        name,
        description,
        price,
        "images": images[].asset->url,
        features,
        specifications,
        category->{name}
      }`,
      { id: params.id }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Convert description to plain text array if it exists
    const description = product.description 
      ? product.description.map((block: any) => block.children?.[0]?.text || '').filter(Boolean)
      : [];

    return NextResponse.json({
      ...product,
      description
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 