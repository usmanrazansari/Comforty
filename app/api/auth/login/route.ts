import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { findUser } from '../store';

// Define allowed methods
export const dynamic = 'force-dynamic';

// Add CORS headers helper
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Handle OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, { 
    headers: corsHeaders(),
  });
}

export async function POST(req: Request) {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    // Add CORS headers to the response
    const headers = corsHeaders();
    
    const body = await req.json();
    console.log('Login request body:', { email: body.email, hasPassword: !!body.password });
    
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    // Find user
    console.log('Looking for user with email:', email);
    const user = findUser(email);
    
    if (!user) {
      console.log('User not found in store');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers }
      );
    }

    // Verify password
    console.log('Comparing passwords for user:', email);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password provided');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers }
      );
    }

    // Create session token
    const token = uuidv4();
    console.log('Login successful for user:', email);
    console.log('===================');
    
    // Return success response with CORS headers
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, { 
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500, headers: corsHeaders() }
    );
  }
}