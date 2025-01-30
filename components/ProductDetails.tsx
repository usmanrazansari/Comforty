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

export type Product = {
  _id: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  images: string[];
  specifications?: Specification[];
  features?: string[];
  category?: string | { name: string; _id: string };
};

export default function ProductDetails({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, cartItems } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product details for ID:', id);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        
        console.log('API Response:', response.status, data);
        
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'Failed to load product');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: 1
    };
    
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (product) {
      const productId = product._id;
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
        toast.success('Removed from wishlist!');
      } else {
        addToWishlist(productId);
        toast.success('Added to wishlist!');
      }
    }
  };

  const itemInCart = product ? cartItems.some(item => item._id === product._id) : false;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="relative h-96 lg:h-[600px] mb-8 lg:mb-0">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className="flex-1 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('description')}
                className={`${
                  activeTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`${
                  activeTab === 'specifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                {product.longDescription && (
                  <p className="text-gray-600">{product.longDescription}</p>
                )}
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="space-y-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                    <div className="font-medium text-gray-900">{spec.name}</div>
                    <div className="text-gray-600">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <ul className="list-disc pl-5 space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
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