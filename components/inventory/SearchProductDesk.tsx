'use client';

import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { SearchProductProps } from '@/types';
import { useInventoryStore } from '@/lib/store';

const SearchProduct = ({
  setFilter,
  handleAddProduct,
  setSearchTerm,
  searchTerm,
  setCurrentPage,
}: SearchProductProps) => {
  const inventoryItems = useInventoryStore((state) => state.inventory);

  const customStatuses = ['Low Stock', 'In Stock'];

  return (
    <div className="flex max-md:hidden items-center text-center justify-between">
      <div className="relative w-fit max-w-md mt-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 border placeholder:italic border-lightblue"
        />
      </div>

      <div className="flex items-center gap-4">
        <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
          <SelectTrigger className="w-[160px] border-1 border-lightblue">
            <SelectValue placeholder="Filter Products" />
          </SelectTrigger>
          <SelectContent className="border-1 border-lightblue">
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="in">In Stock</SelectItem>
            {customStatuses
              .filter((status) => !['Low Stock', 'In Stock'].includes(status))
              .map((status) => (
                <SelectItem key={status} value={status?.toLowerCase()}>
                  {status}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleAddProduct}
          className="bg-darkblue hover:bg-lightblue font-normal text-surface-100"
        >
          Add New Product
        </Button>
      </div>
    </div>
  );
};

export default SearchProduct;
