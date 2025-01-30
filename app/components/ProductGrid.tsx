'use client'
import { Product } from './ProductCard';
import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  title?: string;
}

export default function ProductGrid({ products, loading, title }: ProductGridProps) {
  const { addToCart, cartItems } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-[#800020] mb-8 text-center">{title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#424242] text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}