'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#2B2845] mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#212121] mb-6 text-center">Shop by Category</h2>
        
        {/* Category Options with Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          <button 
            onClick={() => window.location.href = '/product'}
            className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="w-16 h-16 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <span className="text-[#800020] group-hover:text-black font-medium">All Categories</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => window.location.href = `/product?category=${category.slug}`}
              className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[#800020] group-hover:text-black font-medium">{category.name}</span>
            </button>
          ))}

          {/* Additional Category Options */}
          <button
            onClick={() => window.location.href = '/product?category=living-room'}
            className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden">
              <Image
                src="/images/livingroom.jpg"
                alt="Living Room Furniture"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[#800020] group-hover:text-black font-medium">Living Room</span>
          </button>

          <button
            onClick={() => window.location.href = '/product?category=modern-sofa'}
            className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden">
              <Image
                src="/images/modernsofa.jpg"
                alt="Modern Sofa Collection"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[#800020] group-hover:text-black font-medium">Modern Sofa</span>
          </button>

          <button
            onClick={() => window.location.href = '/product?category=bed-frames'}
            className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden">
              <Image
                src="/images/bedframe.jpg"
                alt="Bed Frames"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[#800020] group-hover:text-black font-medium">Bed Frames</span>
          </button>

          {/* New Category */}
          <button
            onClick={() => window.location.href = '/product?category=office-chairs'}
            className="group flex flex-col items-center p-4 rounded-lg bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden">
              <Image
                src="/images/officechair.jpg"
                alt="Office Chairs"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[#800020] group-hover:text-black font-medium">Office Chairs</span>
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/product?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-w-3 aspect-h-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-[#B8860B] text-sm font-medium">
                    Shop Now →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}