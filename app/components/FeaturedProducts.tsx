'use client'
import { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import type { Product } from '../lib/types';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const { data } = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#2B2845] mb-8">Featured Products</h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}