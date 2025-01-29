'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Success() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been processed successfully.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-[#2B9DC3] text-white py-2 px-4 rounded-md hover:bg-[#2589ab] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 