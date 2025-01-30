'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { getCartCount } = useCart();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      setIsAuthenticated(!!token);
      setUser(userStr ? JSON.parse(userStr) : null);
    };

    // Check auth status immediately
    checkAuth();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    
    // Redirect to login
    router.push('/auth/login');
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/product', label: 'Products', icon: '🛍️' },
    { href: '/categories', label: 'Categories', icon: '📑' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ]

  const userLinks = [
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/orders', label: 'My Orders', icon: '📦' },
    { href: '/wishlist', label: 'Wishlist', icon: '❤️' },
  ]

  return (
    <div className="sticky top-0 z-50 bg-[#FAFAFA]">
      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center text-2xl font-bold text-[#800020]">
              <span className="text-[#800020] text-xl sm:text-2xl">🛋️</span>
              <span className="font-bold text-[#800020] text-base sm:text-lg ml-2">Comforty</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-[#800020] hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/cart" 
                className="flex items-center text-[#800020] hover:text-black transition-colors duration-200"
              >
                <span className="relative">
                  Cart ({getCartCount()})
                  {getCartCount() > 0 && (
                    <span className="ml-1 bg-[#800020] text-white rounded-full px-2 py-1 text-xs">
                      {getCartCount()}
                    </span>
                  )}
                </span>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile" className="text-[#800020] hover:text-black transition-colors duration-200">
                    <span className="flex items-center space-x-2">
                      <span className="h-8 w-8 bg-[#9E9E9E] text-white rounded-full flex items-center justify-center">
                        {user?.name?.[0]?.toUpperCase() || '👤'}
                      </span>
                      <span>{user?.name || 'Profile'}</span>
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[#800020] hover:text-black transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-white bg-black hover:bg-[#333333] px-4 py-2 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-[#FAFAFA] transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Right Section */}
            <div className="flex md:hidden items-center space-x-3">
              <Link 
                href="/cart" 
                className="flex items-center text-[#800020]"
              >
                <span className="relative text-[#800020]">
                  🛒 <span className="ml-0.5">({getCartCount()})</span>
                  {getCartCount() > 0 && (
                    <span className="ml-1 bg-[#800020] text-white rounded-full px-2 py-1 text-xs">
                      {getCartCount()}
                    </span>
                  )}
                </span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className="text-[#800020] focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#212121] bg-opacity-50">
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
              <div className="flex justify-end p-4">
                <button
                  className="text-[#800020]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-4 py-2 space-y-1">
                {isAuthenticated && (
                  <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-100">
                    <span className="h-8 w-8 bg-[#9E9E9E] text-white rounded-full flex items-center justify-center text-lg">
                      {user?.name?.[0]?.toUpperCase() || '👤'}
                    </span>
                    <span className="font-medium text-[#800020]">{user?.name || 'Profile'}</span>
                  </div>
                )}
                
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-[#800020] hover:bg-[#FAFAFA] hover:text-black rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="space-y-1 border-t border-gray-100 pt-2">
                    <div className="flex justify-between px-4 py-2">
                      <Link
                        href="/wishlist"
                        className="flex items-center space-x-2 text-sm font-medium text-[#800020] hover:text-black transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-sm">❤️</span>
                        <span>Wishlist</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center space-x-2 text-sm font-medium text-[#800020] hover:text-black transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-sm">📦</span>
                        <span>Orders</span>
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm font-medium text-[#800020] hover:bg-[#FAFAFA] hover:text-black rounded-lg transition-colors duration-200"
                    >
                      <span className="text-base">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="px-4 py-3 space-y-2">
                    <Link
                      href="/auth/login"
                      className="flex justify-center w-full bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-[#333333] transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex justify-center w-full bg-white text-black border border-black px-4 py-2 text-sm rounded-md hover:bg-[#FAFAFA] transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
