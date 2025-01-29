'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { getCartCount } = useCart();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/auth/login')
  }

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
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/cart" 
                className="flex items-center text-gray-600 hover:text-[#2B9DC3]"
              >
                <span className="relative">
                  Cart ({getCartCount()})
                </span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#2B9DC3] text-white px-4 py-2 rounded-md hover:bg-[#248AAD]"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="bg-[#2B9DC3] text-white px-4 py-2 rounded-md hover:bg-[#248AAD]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white text-[#2B9DC3] border border-[#2B9DC3] px-4 py-2 rounded-md hover:bg-gray-50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
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
                Cart ({getCartCount()})
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
