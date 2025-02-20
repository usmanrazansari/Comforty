'use client'
import Image from 'next/image';
import Button from './button';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    name: string;
  };
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
              variant="primary"
              fullWidth
              className="mt-4"
              onClick={() => {/* Add to cart logic */}}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}