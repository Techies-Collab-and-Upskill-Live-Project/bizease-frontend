'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface InventorySearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

const InventorySearchFilter: React.FC<InventorySearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  return (
    <div className="flex lg:hidden justify-between items-center gap-4 px-2 py-2 mb-4 max-md:flex-col">
      {/* Search */}
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products"
          className="pl-9 pr-4 py-2 text-sm border rounded-md w-full"
        />
      </div>

      {/* Filter */}
      <div className="w-full md:w-56">
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full text-sm border rounded-md py-2 px-4">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="zero">Zero Stock</SelectItem>
            <SelectItem value="in">In Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InventorySearchFilter;
