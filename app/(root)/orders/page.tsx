'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddOrderModal from '@/components/modals/AddOrderModal';

import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { useOrderStore } from '@/lib/store';
import TopAvatar from '@/components/navigations/TopAvatar';
import { cn } from '@/lib/utils';
import ViewOrderModal from '@/components/modals/OrderModal';
import { Order } from '@/types';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';

export default function OrdersPage() {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders } = useOrderStore();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 7;

  const lastUpdated = new Date().toISOString();

  const filtered = useMemo(() => {
    return orders.filter(({ name, status }) => {
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filter === 'all' || status.toLowerCase() === filter;
      return matchesSearch && matchesStatus;
    });
  }, [search, filter, orders]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const totalRevenue = filtered.reduce((acc, { total }) => acc + total, 0);
  const totalPending = filtered.filter(
    ({ status }) => status.toLowerCase() === 'pending',
  ).length;
  const totalOrders = filtered.length;

  return (
    <section className="bg-gray-100 pb-10">
      <TopAvatar type="Orders" />
      <div className="px-4 space-y-2">
        <h1 className="text-surface-600 font-bold text-lg mt-2">Orders</h1>
        <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
          <div className="flex w-1/3">
            <div>
              <p className="text-surface-200 text-[10px]">Total Order</p>
              <p className="font-semibold text-surface-200 ">
                <span> {totalOrders} </span>
              </p>
            </div>
          </div>
          <div className="flex w-1/3 gap-8">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Pending Orders</p>
              <p className="font-semibold text-surface-200 ">
                <span> {totalPending} </span>
              </p>
            </div>
          </div>
          <div className="flex w-1/3 justify-center gap-8 md:ml-10 max-md:justify-end">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Total Revenue</p>
              <p className="font-semibold text-surface-200 ">
                <AnimatedCountUp amount={totalRevenue} />
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col my-4 md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3 ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={14}
            />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-fit border border-lightblue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px] border cursor-pointer border-lightblue">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="border border-lightblue">
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="shipped">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowAddOrderModal(true)}
              className="bg-darkblue curs hover:bg-lightblue font-normal text-[14px] text-surface-200 cursor-pointer"
            >
              Add New Order
            </Button>

            {showAddOrderModal && (
              <AddOrderModal onClose={() => setShowAddOrderModal(false)} />
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-100 py-6 px-8 rounded">
          <div className="grid grid-cols-6 place-items-center font-semibold text-sm bg-gray-100 text-muted-foreground border-b p-2">
            <span className="text-left">Order ID</span>
            <span>Customer</span>
            <span>Total</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="space-y-2">
            {paginated.map(({ name, id, total, date, status }) => (
              <div
                key={id}
                className="grid grid-cols-6 place-items-center items-center py-2 border-b text-[11px] font-medium text-surface-500"
              >
                <span className="text-left">Ord - {id}</span>
                <span>{name}</span>
                <span className="text-sm text-surface-500 font-normal">
                  <AnimatedCountUp amount={total} />
                </span>
                <span>{date}</span>
                <span
                  className={cn('capitalize', {
                    'text-warning bg-warning-bg px-4 py-1  w-fit rounded-xl':
                      status.toLowerCase() === 'pending',
                    'text-success bg-success-bg px-4 py-1 w-fit rounded-xl ':
                      status.toLowerCase() === 'delivered',
                    'text-lightblue w-fit bg-blue-50 px-4 py-1 rounded-xl':
                      status.toLowerCase() === 'shipped',
                    'text-red-600 bg-red-50  w-fit rounded-xl px-4 py-1 ':
                      status.toLowerCase() === 'failed',
                  })}
                >
                  {status}
                </span>
                <Button
                  onClick={() =>
                    setSelectedOrder({
                      id,
                      name,
                      total,
                      date,
                      status,
                      lastUpdated,
                      products: [],
                    })
                  }
                  className="w-full cursor-pointer bg-darkblue hover:bg-lightblue font-normal text-surface-200 text-[10px]"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {(page - 1) * perPage + 1} -{' '}
            {Math.min(page * perPage, filtered.length)} of {filtered.length}{' '}
            orders
          </span>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="flex items-center text-surface-600 font-normal text-[10px] border border-lightblue gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="flex items-center text-surface-600 text-[10px] font-normal border border-lightblue gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {selectedOrder && (
            <ViewOrderModal
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
