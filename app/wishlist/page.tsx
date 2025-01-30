'use client'
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
};

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products for wishlist items
        const promises = wishlist.map(id =>
          fetch(`/api/products/${id}`).then(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch product with ID: ${id}`);
            }
            return res.json();
          })
        );
        const productsData = await Promise.all(promises);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error);
        toast.error('Failed to load wishlist items');
      } finally {
        setLoading(false);
      }
    };

    if (wishlist.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
      setProducts([]); // Clear products if wishlist is empty
    }
  }, [wishlist]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8 bg-black text-white px-4 py-2 rounded-lg inline-block">My Wishlist</h1>
          <div>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 bg-black text-white px-4 py-2 rounded-lg inline-block">My Wishlist</h1>
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow p-6">
                <div className="relative h-48 mb-4">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                      priority // Add priority for above-the-fold images
                    />
                  )}
                </div>
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold mb-4">${product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart({ ...product, quantity: 1 });
                      removeFromWishlist(product._id);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(product._id);
                      toast.success(`${product.name} removed from wishlist`);
                    }}
                    className="px-4 py-2 border border-black text-black rounded hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}