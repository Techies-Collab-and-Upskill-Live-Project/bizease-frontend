'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import React from 'react';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const SearchProduct = ({
  setFilter,
  handleAddProduct,
  setSearchTerm,
  searchTerm,
  setCurrentPage,
}: SearchProductProps) => {
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
          className="pl-10 border border-lightblue"
        />
      </div>

      <div className="flex items-center gap-4">
        <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="in">In Stock</SelectItem>
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
