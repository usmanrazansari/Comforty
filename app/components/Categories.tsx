'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';

type Category = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "category"] {
            _id,
            name,
            "slug": slug.current,
            "image": image.asset->url
          }
        `);
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
      <div className="max-w-7xl mx-auto px-4 py-16">
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
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-[#2B2845] mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            key={category._id} 
            href={`/products?category=${category.slug}`}
            className="group"
          >
            <div className="relative h-48 mb-2 overflow-hidden rounded-lg">
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#2B9DC3]">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}