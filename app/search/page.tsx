'use client'
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react'

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          Search Results for "{query}"
        </h1>
        {/* Add your search results display logic here */}
      </div>
      <Footer />
    </>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
} 