'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="section-padding">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Search</h1>
        <div className="relative mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="form-input pl-12 text-lg"
          />
        </div>
        {query && (
          <p className="text-center text-[var(--text-muted)] py-12">
            No results found for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
