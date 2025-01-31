import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Cart() {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image 
                      src="/images/modernsofa.jpg" 
                      alt="Modern Sofa" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Modern Sofa</h3>
                    <p className="text-gray-600">Color: Gray</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded">
                        <button className="px-3 py-1 hover:bg-gray-50">-</button>
                        <span className="px-4 py-1 border-x">1</span>
                        <button className="px-3 py-1 hover:bg-gray-50">+</button>
                      </div>
                      <button className="text-red-500 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">$999</p>
                  </div>
                </div>
              </div>

              {/* Second Item */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image 
                      src="/images/bedframe.jpg" 
                      alt="Bed Frame" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Bed Frame</h3>
                    <p className="text-gray-600">Color: Gray</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded">
                        <button className="px-3 py-1 hover:bg-gray-50">-</button>
                        <span className="px-4 py-1 border-x">1</span>
                        <button className="px-3 py-1 hover:bg-gray-50">+</button>
                      </div>
                      <button className="text-red-500 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">$1299</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$2298</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>$2298</span>
                </div>
              </div>
              <button className="w-full bg-[#2B9DC3] hover:bg-[#2589ab] text-white py-3 rounded-lg mt-6 transition-colors">
                Proceed to Checkout
              </button>
              <div className="mt-4">
                <input 
                  type="text" 
                  placeholder="Enter coupon code"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-8">
          <Footer variant="light" />
        </div>
      </>
    )
}