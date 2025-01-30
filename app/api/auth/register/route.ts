import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { addUser, findUser } from '../store';

export const dynamic = 'force-dynamic';

// In-memory user storage (for demonstration)
// export const users: any[] = [];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }
  });
}

export async function POST(request: Request) {
  try {
    console.log('=== REGISTRATION ATTEMPT ===');
    const body = await request.json();
    console.log('Registration request:', { 
      email: body.email, 
      name: body.name,
      hasPassword: !!body.password 
    });

    const { name, email, password } = body;

    // Basic validation
    if (!name || !email || !password) {
      console.log('Missing required fields:', { 
        name: !!name, 
        email: !!email, 
        password: !!password 
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking if user exists:', email);
    const existingUser = findUser(email);
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password for:', email);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Store user
    console.log('Storing new user:', email);
    addUser(user);
    console.log('User stored successfully');

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    console.log('Registration successful for:', email);
    console.log('=======================');

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: userWithoutPassword,
        token: uuidv4()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}