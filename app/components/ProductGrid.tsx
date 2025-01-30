'use client'
import { Product } from '../lib/types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

interface ProductGridProps {
  products?: Product[];
}

export default function ProductGrid({ products = [] }: ProductGridProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setProductList(products);
      setIsLoading(false);
    } else {
      // Fetch products if none provided
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setProductList(data.data || []);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch products:', error);
          setIsLoading(false);
        });
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {productList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#424242] text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}