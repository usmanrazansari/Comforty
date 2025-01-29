'use client'
import { useState, useEffect } from 'react';
import FeaturedProducts from './components/FeaturedProducts'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Navbar from './components/Navbar'
import PromoBanner from './components/PromoBanner'
import Footer from './components/Footer'

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
        <div className="bg-[#2B9DC3] text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Welcome back, {userProfile.name}!</h2>
                <p className="text-sm opacity-90">Member since {new Date(userProfile.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.location.href = '/orders'}
                  className="bg-white text-[#2B9DC3] px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  My Orders
                </button>
                <button 
                  onClick={() => window.location.href = '/wishlist'}
                  className="bg-white text-[#2B9DC3] px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  My Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="flex flex-col bg-gray-100">
        <Hero />
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