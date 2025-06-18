'use client';

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
import { SearchProductMobileProps } from '@/types';

const SearchProduct = ({
  setFilter,
  handleAddProduct,
  setSearchTerm,
  searchTerm,
  setCurrentPage,
}: SearchProductMobileProps) => {
  return (
    <div className="hidden max-md:flex items-center text-center justify-between px-6 my-2">
      <div className="relative max-md:w-[43%] max-w-md mt-2">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-8 border placeholder:italic text-xs md:text-sm font-semibold border-lightblue"
        />
      </div>

      <div className="flex items-center gap-4 mt-2">
        <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
          <SelectTrigger className="w-[140px] border-1 border-lightblue text-xs font-semibold">
            <SelectValue placeholder="Filter Products" />
          </SelectTrigger>
          <SelectContent className="border-1 border-lightblue">
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="in">In Stock</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleAddProduct}
          className="hidden max-sm:hidden bg-darkblue hover:bg-lightblue font-normal text-surface-100"
        >
          Add New Product
        </Button>
      </div>
    </div>
  );
};

export default SearchProduct;
