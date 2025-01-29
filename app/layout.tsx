import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../context/CartContext';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from '../context/WishlistContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Comforty - Modern Furniture Store',
  description: 'Shop the best modern furniture for your home.',
  keywords: 'furniture, modern furniture, home decor, sofa, chair, table',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster position="bottom-right" />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
