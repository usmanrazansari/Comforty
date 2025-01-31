'use client'
import { Suspense } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductFilter from '../components/ProductFilter'
import ProductGrid from '../components/ProductGrid'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '../lib/types';

function ProductContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Filter products by category if one is selected
        const filteredProducts = categoryParam
          ? data.filter((product: Product) => {
              if (!product.category) return false;
              const productCategory = typeof product.category === 'string' 
                ? product.category 
                : product.category.name;
              return productCategory.toLowerCase() === categoryParam.toLowerCase();
            })
          : data;
        
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryParam])

  return (
    <main>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full bg-[#2B9DC3] text-white py-2 rounded-lg shadow-sm text-center hover:bg-[#248AAD] transition-colors"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters - Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64`}>
            <ProductFilter selectedCategory={selectedCategory} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold text-[#2B2845]">
                {categoryParam 
                  ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products`
                  : 'All Products'
                }
              </h1>
              <select className="w-full sm:w-auto border p-2 rounded-lg bg-white text-gray-600 focus:border-[#2B9DC3] focus:ring-[#2B9DC3]">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="text-center my-8 py-8 bg-white rounded-lg shadow-sm">
          <p className="text-4xl font-bold py-8 text-[#2B2845]">Subscribe to our newsletter!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]"
            />
            <button className="mt-2 bg-[#2B9DC3] text-white px-4 py-2 rounded hover:bg-[#248AAD] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Instagram Section */}
        <div className="text-center my-8 py-8">
          <p className="text-4xl font-bold py-8 text-gray-800">Follow Products And Discounts On Instagram</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            '/images/chair4.png',
            '/images/chair7.png',
            '/images/chair5.png',
            '/images/chair6.png',
            '/images/chair1.png',
            '/images/chair.png'
          ].map((src, index) => (
            <div key={index} className="relative w-full h-64">
              <Image
                src={src}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  )
}