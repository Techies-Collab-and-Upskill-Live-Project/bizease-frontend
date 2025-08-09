'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface OrderControlsProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const OrderControls = ({
  search,
  setSearch,
  filter,
  setFilter,
}: OrderControlsProps) => {
  return (
    <section className="flex mt-4 max-lg:mb-4 lg:items-center justify-between gap-4 w-full">
      {/* Search */}
      <div className="relative w-full lg:w-1/3 min-w-[200px] max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search orders..."
          className="pl-10 pr-4 py-2 text-sm border border-lightblue rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter and Add New */}
      <div className="flex gap-2 w-auto items-stretch lg:items-center">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[160px] border border-lightblue text-sm rounded-md">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Link href={'/orders/add-new-order'} className="max-lg:hidden">
          <Button className=" bg-darkblue text-white hover:bg-lightblue whitespace-nowrap">
            Add New Order
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OrderControls;
