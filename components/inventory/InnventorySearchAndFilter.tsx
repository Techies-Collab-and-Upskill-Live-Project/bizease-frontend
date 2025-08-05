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
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

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
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  const handleAddProduct = () => {
    router.push('/inventory/add-product');
  };

  return (
    <section className="flex flex-wrap items-center justify-between mx-auto w-full gap-4 py-2 mb-4">
      {/* Search - stays left */}
      <div className="relative min-w-[200px] max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products"
          className="pl-9 pr-4 py-2 text-sm border border-lightblue rounded-md w-full"
        />
      </div>

      {/* Button + Filter - right side */}
      <div className="flex w-fullitems-center gap-2">
        <Button
          onClick={handleAddProduct}
          className="bg-darkblue text-surface-200 hover:bg-lightblue max-lg:hidden"
        >
          Add New Product
        </Button>
        <div className="w-full">
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="text-sm border border-lightblue rounded-md py-2 px-4">
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
    </section>
  );
};

export default InventorySearchFilter;
