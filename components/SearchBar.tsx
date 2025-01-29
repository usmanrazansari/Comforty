'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#2B9DC3] text-white rounded-lg hover:bg-[#2589ab]"
      >
        Search
      </button>
    </form>
  );
} 