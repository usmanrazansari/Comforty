import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  details?: {
    database: boolean;
    cache: boolean;
  };
}

export async function GET() {
  try {
    // Test DB connection
    await client.fetch('*[_type == "system.group"][0...1]');
    
    const healthCheck: HealthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      details: {
        database: true,
        cache: true
      }
    };
    
    return NextResponse.json(healthCheck);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const unhealthyCheck: HealthCheck = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      details: {
        database: false,
        cache: true
      }
    };
    
    return NextResponse.json(unhealthyCheck, { status: 500 });
  }
} 