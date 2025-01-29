import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { Stripe as StripeType } from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia' as const,
});

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();
    console.log('Received items:', items); // Debug log

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    // Format line items for Stripe
    const lineItems = items.map((item) => {
      console.log('Processing item:', item); // Debug log
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.images && item.images.length > 0 ? [item.images[0]] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    console.log('Formatted line items:', lineItems); // Debug log

    // Create Stripe session
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        email: email || 'guest@example.com',
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
    };

    console.log('Session config:', sessionConfig); // Debug log

    const session = await stripe.checkout.sessions.create(sessionConfig as StripeType.Checkout.SessionCreateParams);
    console.log('Session created:', session.id); // Debug log

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Detailed Stripe error:', {
      message: error.message,
      type: error.type,
      stack: error.stack,
      raw: error
    });

    return NextResponse.json(
      { 
        error: error.message || 'Payment processing failed',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          type: error.type,
          stack: error.stack
        } : undefined
      },
      { status: 500 }
    );
  }
} 