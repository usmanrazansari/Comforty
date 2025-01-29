'use client'
import { useCart } from '../../context/CartContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to checkout');
        setIsProcessing(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        toast.error('Payment system not available');
        return;
      }

      console.log('Cart items being sent:', cartItems); // Debug log

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            ...item,
            images: item.images?.filter(img => img && img.startsWith('http')) || [],
          })),
          email: 'customer@example.com',
        }),
      });

      const data = await response.json();
      console.log('Stripe API response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Checkout error details:', error);
      toast.error(
        error.message || 'Failed to process checkout. Please try again later.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <Image 
                        src={item.images[0]} 
                        alt={item.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded">
                          <button 
                            className="px-3 py-1 hover:bg-gray-50"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 hover:bg-gray-50"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>${getCartTotal()}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-[#2B9DC3] hover:bg-[#2589ab] text-white py-3 rounded-lg mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}