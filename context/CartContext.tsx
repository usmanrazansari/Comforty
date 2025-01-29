'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    try {
      setCartItems(prev => {
        const existingItem = prev.find(i => i._id === item._id);
        if (existingItem) {
          toast.success('Updated quantity in cart');
          return prev.map(i => 
            i._id === item._id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        toast.success('Added to cart');
        return [...prev, { ...item, quantity: 1 }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = (itemId: string) => {
    try {
      setCartItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      if (quantity < 1) return;
      setCartItems(prev => 
        prev.map(item => 
          item._id === itemId 
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const getCartTotal = () => {
    try {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  };

  const getCartCount = () => {
    try {
      return cartItems.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error calculating count:', error);
      return 0;
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getCartTotal,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);