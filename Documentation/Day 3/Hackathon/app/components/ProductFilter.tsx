"use client";

import { useState } from 'react';

export default function ProductFilter() {
    const [priceRange, setPriceRange] = useState(5000);

    return (
      <div className="space-y-6 sticky top-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <div className="space-y-3">
            {['Living Room', 'Bedroom', 'Dining', 'Office'].map((category) => (
              <label key={category} className="flex items-center hover:text-[#2B9DC3] cursor-pointer">
                <input type="checkbox" className="mr-3 w-4 h-4 accent-[#2B9DC3]" />
                <span className="text-sm sm:text-base">{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-4">Price Range</h3>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[#2B9DC3]"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span className="text-[#2B9DC3] font-medium">${priceRange}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-4">Filter By</h3>
          <div className="space-y-3">
            <label className="flex items-center hover:text-[#2B9DC3] cursor-pointer">
              <input type="checkbox" className="mr-3 w-4 h-4 accent-[#2B9DC3]" />
              <span className="text-sm sm:text-base">In Stock</span>
            </label>
            <label className="flex items-center hover:text-[#2B9DC3] cursor-pointer">
              <input type="checkbox" className="mr-3 w-4 h-4 accent-[#2B9DC3]" />
              <span className="text-sm sm:text-base">On Sale</span>
            </label>
          </div>
        </div>
      </div>
    )
}