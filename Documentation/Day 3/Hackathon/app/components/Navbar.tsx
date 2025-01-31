'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#2B2845] text-white py-2 text-sm sm:text-base">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center">✨ Free Shipping on Orders Over $50</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-[#2B9DC3] text-2xl">🛋️</span>
              <span className="font-bold text-gray-700 text-lg ml-2">Comforty</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-600 hover:text-[#2B9DC3]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/cart" className="text-gray-600 hover:text-[#2B9DC3] flex items-center">
                <span>Cart</span>
                <span className="ml-2 bg-[#2B9DC3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Link>
              <Link 
                href="/login" 
                className="bg-[#2B9DC3] text-white px-4 py-2 rounded-md hover:bg-[#248AAD]"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-50">
            <div className="px-4 py-2 space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="block text-gray-600 hover:text-[#2B9DC3] py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/cart" 
                className="block text-gray-600 hover:text-[#2B9DC3] py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart (0)
              </Link>
              <Link 
                href="/login" 
                className="block bg-[#2B9DC3] text-white px-4 py-2 rounded-md hover:bg-[#248AAD]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
