'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from './ProductDetails'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart, cartItems } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      toast.success('Item already in cart!');
      return;
    }
    
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: 1
    }
    addToCart(cartItem)
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
      toast.success('Removed from wishlist!')
    } else {
      addToWishlist(product._id)
      toast.success('Added to wishlist!')
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/products/${product._id}`}>
            <div className="relative h-64 w-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>
          </Link>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/products/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-[#2B9DC3] transition-colors">
                  {product.name}
                </h3>
              </Link>
              <button
                onClick={() => handleWishlistToggle(product)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {isInWishlist(product._id) ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              {product.description || `Beautiful product`}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#2B9DC3]">
                ${product.price.toLocaleString()}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center gap-2 bg-[#2B9DC3] text-white px-4 py-2 rounded-md hover:bg-[#248AAB] transition-colors"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {typeof product.category === 'object' && product.category 
                  ? product.category.name 
                  : typeof product.category === 'string' 
                    ? product.category 
                    : 'Uncategorized'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
