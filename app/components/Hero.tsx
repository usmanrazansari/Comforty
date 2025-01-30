'use client'
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Elegant Living Spaces
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
            Transform your home with our curated collection of premium furniture
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors duration-200"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}