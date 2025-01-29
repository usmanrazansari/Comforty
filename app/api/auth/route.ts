import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-27',
  useCdn: false
});

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();
    console.log('Auth request:', { email, action }); // Log request details

    // For Login
    if (action === 'login') {
      const user = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        { email }
      );

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ token });
    }

    // For Register
    if (action === 'register') {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user using the client.create method instead of mutations
      const newUser = await client.create({
        _type: 'user',
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });

      console.log('User created:', newUser);

      const token = jwt.sign(
        { userId: newUser._id, email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ token });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
} 