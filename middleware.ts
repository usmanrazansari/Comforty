import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from localStorage instead of cookies
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/orders') ||
    request.nextUrl.pathname.startsWith('/wishlist') ||
    request.nextUrl.pathname.startsWith('/profile');

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Allow access to auth pages even without token
  if (isAuthPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only protect specific routes
export const config = {
  matcher: ['/orders/:path*', '/wishlist/:path*', '/profile/:path*']
};