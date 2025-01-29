import { NextResponse } from 'next/server';

// Mock data - replace with your database later
let carts: any[] = [];

export async function GET() {
  try {
    return NextResponse.json(carts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, productId, quantity } = body;

    // Find existing cart for user
    let cart = carts.find(c => c.userId === userId);

    if (!cart) {
      // Create new cart if none exists
      cart = {
        id: carts.length + 1,
        userId,
        items: [],
        total: 0
      };
      carts.push(cart);
    }

    // Add item to cart
    const existingItem = cart.items.find((item: any) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { cartId, items } = body;

    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    cart.items = items;
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
