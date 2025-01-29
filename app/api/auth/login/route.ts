import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400, headers }
      );
    }

    // Find user by email
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]{
        _id,
        name,
        email,
        password,
        createdAt
      }`,
      { email }
    );

    console.log('Found user:', user); // Debug log

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword); // Debug log

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    // Generate JWT token with user info
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    }, { headers });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed: ' + error.message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}