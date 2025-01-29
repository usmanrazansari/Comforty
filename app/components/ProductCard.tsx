'use client'
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: 1
    });
  };

  const itemInCart = cartItems.some(item => item._id === product._id);

  // Add fallback image
  const imageUrl = product.images?.[0] || '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e: any) => {
            e.target.src = '/placeholder.jpg'; // Fallback image
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        {product.description && (
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        )}
        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            itemInCart 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-[#2B9DC3] hover:bg-[#248AAD]'
          } text-white`}
        >
          {itemInCart ? 'In Cart' : 'Add to Cart'} ({cartItems.length})
        </button>
      </div>
    </div>
  );
} 