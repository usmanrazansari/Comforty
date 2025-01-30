import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
const rateLimit = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000; // 15 minutes ago

  const requestHistory = rateLimit.get(ip) || [];
  const requestsInWindow = requestHistory.filter((time: number) => time > windowStart);

  if (requestsInWindow.length >= 100) { // 100 requests per 15 minutes
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  requestsInWindow.push(now);
  rateLimit.set(ip, requestsInWindow);

  // Get the token from localStorage instead of cookies
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/orders') ||
    request.nextUrl.pathname.startsWith('/wishlist') ||
    request.nextUrl.pathname.startsWith('/profile');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/orders/:path*', '/wishlist/:path*', '/profile/:path*']
}; 