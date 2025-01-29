'use client'
import Image from 'next/image';
import Button from './button';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    name: string;
  };
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const { addToCart, cartItems } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product.id.toString(),
      name: product.name,
      price: product.price,
      images: [product.imageUrl],
      quantity: 1
    });
  };

  const isInCart = (productId: string | number) => {
    return cartItems.some(item => item._id === productId.toString());
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category.name}</p>
            <p className="font-medium text-[#2B9DC3] mt-1">
              ${product.price}
            </p>
            <Button 
              variant={isInCart(product.id) ? "secondary" : "primary"}
              fullWidth
              className="mt-4"
              onClick={() => handleAddToCart(product)}
            >
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}