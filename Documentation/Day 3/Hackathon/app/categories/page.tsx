'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = [
  {
    id: 1,
    name: 'Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    description: 'Comfortable and stylish sofas'
  },
  {
    id: 2,
    name: 'Chairs',
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
    description: 'Ergonomic and designer chairs'
  },
  {
    id: 3,
    name: 'Tables',
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500',
    description: 'Dining and coffee tables'
  },
  {
    id: 4,
    name: 'Beds',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500',
    description: 'Comfortable beds and mattresses'
  },
  {
    id: 5,
    name: 'Storage',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
    description: 'Wardrobes and storage solutions'
  },
  {
    id: 6,
    name: 'Lighting',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    description: 'Modern lighting solutions'
  }
]

export default function Categories() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#2B2845] mb-8">Categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/product?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-[#2B2845]">{category.name}</h2>
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 