import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Sanity
    const newUser = await client.create({
      _type: 'user',
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    // Generate token
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email
      }, 
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ 
      token,
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
} 