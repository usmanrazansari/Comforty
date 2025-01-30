'use client'
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: 1
    };
    addToCart(cartItem);
  };

  const itemInCart = cartItems.some(item => item._id === product._id);

  // Add fallback image
  const imageUrl = product.images?.[0] || '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      <Link href={`/product/${product._id}`} className="flex-grow">
        <div className="relative h-48 sm:h-64">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-[#800020] font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-[#424242] text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[#800020] text-xl font-bold">${product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={itemInCart}
          className={`w-full bg-[#B8860B] text-white px-4 py-2 rounded-md transition-colors duration-200
            ${itemInCart 
              ? 'bg-green-600 cursor-default'
              : 'hover:bg-[#996515]'
            }`}
        >
          {itemInCart ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 