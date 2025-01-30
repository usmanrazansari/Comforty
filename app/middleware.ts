import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitData {
  count: number;
  timestamp: number;
}

const rateLimit = new Map<string, RateLimitData>();
const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const now = Date.now();
  const rateLimitData = rateLimit.get(ip) ?? { count: 0, timestamp: now };

  // Reset count if window has passed
  if (now - rateLimitData.timestamp > WINDOW_SIZE) {
    rateLimitData.count = 0;
    rateLimitData.timestamp = now;
  }

  if (rateLimitData.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: WINDOW_SIZE / 1000 },
      { status: 429, headers: { 'Retry-After': (WINDOW_SIZE / 1000).toString() } }
    );
  }

  rateLimitData.count++;
  rateLimit.set(ip, rateLimitData);

  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = ['/orders', '/wishlist', '/profile'].some(
    route => request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/orders/:path*', '/wishlist/:path*', '/profile/:path*']
}; 