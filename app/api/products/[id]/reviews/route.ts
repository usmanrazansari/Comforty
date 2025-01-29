import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import jwt from 'jsonwebtoken';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await client.fetch(
      `*[_type == "review" && productId == $productId] | order(createdAt desc)`,
      { productId: params.id }
    );

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      userId: string;
      email: string;
    };

    const { rating, comment } = await request.json();

    const review = await client.create({
      _type: 'review',
      userId: decoded.userId,
      userName: decoded.email.split('@')[0], // Simple username from email
      productId: params.id,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
} 