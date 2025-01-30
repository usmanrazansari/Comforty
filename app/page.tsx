'use client'
import { useState, useEffect } from 'react';
import FeaturedProducts from './components/FeaturedProducts'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Navbar from './components/Navbar'
import PromoBanner from './components/PromoBanner'
import Footer from './components/Footer'
import Image from 'next/image'

type UserProfile = {
  name: string;
  email: string;
  createdAt: string;
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(userStr);
        setUserProfile(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      {isLoggedIn && userProfile && (
        <div className="bg-black border-t border-b text-white">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-white">Welcome back, {userProfile.name}!</p>
                <p className="text-sm text-white opacity-90">Member since {new Date(userProfile.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.location.href = '/orders'}
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 shadow-md"
                >
                  My Orders
                </button>
                <button 
                  onClick={() => window.location.href = '/wishlist'}
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 shadow-md"
                >
                  My Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="flex flex-col bg-gray-100">
        {/* Hero Section */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/Header.png"
              alt="Welcome Header"
              fill
              priority
              className="object-contain w-full scale-100 transition-transform duration-700 hover:scale-105"
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
        <div className="-mt-[1vw] sm:-mt-[2vw] md:-mt-[2.5vw] lg:-mt-[2vw]">
          <PromoBanner />
        </div>
        <Categories />
        <FeaturedProducts />
        <Footer />
      </main>
    </>
  )
}