'use client';

import { Order } from '@/types';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Link from 'next/link';
import { Button } from '../ui/button';

interface MobileOrderListProps {
  orders: Order[];
  totalPending: number;
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  setSelectedOrder: (order: Order) => void;
  floatButtonShow: boolean;
  setFloatButtonShow: (value: boolean) => void;
}

const MobileOrderList = ({
  // orders,
  // totalPending,
  search,
  setSearch,
  filter,
  setFilter,
  // setSelectedOrder,
  floatButtonShow,
  setFloatButtonShow,
}: MobileOrderListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-4 my-6 lg:hidden">
        <div className="relative w-fit max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={14}
          />
          <Input
            placeholder="Search orders..."
            className="pl-10 border border-lightblue"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[160px] border border-lightblue">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Floating Add Button */}
      {floatButtonShow ? (
        <div className="fixed z-50 right-4 bottom-30 lg:hidden flex items-end gap-3 animate-fade-in-up">
          <Link href="/orders/add-new-order">
            <Button className="bg-darkblue text-white hover:bg-lightblue shadow-lg">
              Add New Order
            </Button>
          </Link>
          <Button
            onClick={() => setFloatButtonShow(false)}
            className="bg-darkblue text-surface-100 hover:bg-lightblue p-2 rounded-md shadow-md"
            aria-label="Hide FAB"
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="fixed z-50 right-4 flex gap-2 bottom-35 lg:hidden animate-fade-in">
          <Button
            onClick={() => setFloatButtonShow(true)}
            className="bg-darkblue text-white hover:bg-lightblue p-4 rounded-md shadow-lg"
            aria-label="Show FAB"
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileOrderList;
