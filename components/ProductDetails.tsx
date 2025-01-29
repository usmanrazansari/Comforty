'use client'
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ProductReviews from './ProductReviews';

type Specification = {
  name: string;
  value: string;
};

type Product = {
  _id: string;
  name: string;
  description: string[];
  price: number;
  images: string[];
  features?: string[];
  specifications?: Specification[];
  category?: {
    name: string;
  };
};

export default function ProductDetails({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', id);
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        
        console.log('Product data:', data);
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'Failed to load product');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B9DC3]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          {error || 'Product not found'}
        </h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96">
            {product.images?.[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden 
                    ${selectedImage === index ? 'ring-2 ring-[#2B9DC3]' : ''}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                addToCart({ ...product, quantity: 1 });
                toast.success('Added to cart');
              }}
              className="flex-1 bg-[#2B9DC3] text-white px-6 py-2 rounded-lg hover:bg-[#2589ab]"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (isInWishlist(product._id)) {
                  removeFromWishlist(product._id);
                  toast.success('Removed from wishlist');
                } else {
                  addToWishlist(product._id);
                  toast.success('Added to wishlist');
                }
              }}
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
            >
              {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                      ? 'border-[#2B9DC3] text-[#2B9DC3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                {product.description?.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
                {product.features && product.features.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="divide-y">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="py-3 flex">
                    <span className="font-medium w-1/3">{spec.name}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews productId={id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 