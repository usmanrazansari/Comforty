import { createClient } from 'next-sanity';
import { AUTH_CONFIG } from './constants';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Sanity Project ID is not configured');
}

if (!process.env.SANITY_API_TOKEN) {
  throw new Error('Sanity API Token is not configured');
}

// Enhanced client creation with detailed logging
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-29', // Using current API version
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'published',
  stega: false,
});

// Comprehensive fetch wrapper with advanced error handling
export const fetchWithFallback = async (query: string, params: Record<string, any> = {}) => {
  try {
    if (!query) {
      throw new Error('Query is required');
    }

    const result = await client.fetch(query, params);
    
    if (!result) {
      console.warn('No results found for query:', query);
    }
    
    return result;
  } catch (error: any) {
    console.error('Sanity Fetch Error:', {
      message: error.message,
      query,
      params,
      stack: error.stack
    });
    
    throw error;
  }
};

// Test the Sanity connection
export const testConnection = async () => {
  try {
    // Test with a simpler query that doesn't depend on specific document types
    const result = await client.fetch('*[_type == "system.group"][0...1]');
    console.log('Sanity connection test successful');
    return true;
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return false;
  }
};

// Categories fetch function
export const fetchCategories = async () => {
  const query = `*[_type == "category"] {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url
  }`;
  
  try {
    const categories = await fetchWithFallback(query);
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};