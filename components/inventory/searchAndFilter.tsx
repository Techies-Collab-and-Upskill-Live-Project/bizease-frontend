'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useInventorySearch } from '@/hooks/useInventorySearch';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTER_OPTIONS = [
  { label: 'All Products', value: 'all' },
  { label: 'Low Stock', value: 'low' },
];

export default function InventorySearchFilter() {
  const [filter, setFilter] = useState('All Products');
  const { query, setQuery, fetchResults } = useInventorySearch();

  useEffect(() => {
    fetchResults();
  }, [query, filter]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full md:w-1/2">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
          size={18}
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search inventory..."
          className={cn(
            'pl-10 border border-blue-200 bg-blue-50 text-blue-900 focus-visible:ring-blue-600',
          )}
        />
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full md:w-[200px] px-4 py-2 border border-blue-300 bg-blue-50 text-blue-900 rounded-md focus:ring-blue-600 focus:outline-none"
      >
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
