'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

// import { useMediaQuery } from 'usehooks-ts';

import ViewOrderModal from '@/components/modals/OrderModal';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import TopAvatar from '@/components/navigations/TopAvatar';
import { Order } from '@/types';

import MobileOrderList from '@/components/orders/MobileOrderList';
import DesktopOrderList from '@/components/orders/DesktopOrderList';
import { useOrder } from '@/hooks/useOrder';

const OrdersPage = () => {
  const [floatButtonShow, setFloatButtonShow] = useState(false);
  // const isMobile = useMediaQuery('(max-width: 1020px)');

  const { orders } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 7;

  const [cache, setCache] = useState<Record<string, Order[]>>({});

  useEffect(() => {
    setCache({});
  }, [orders]);

  const filtered = useMemo(() => {
    return orders.filter(({ client_name, status }) => {
      const matchSearch = client_name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = filter === 'all' || status.toLowerCase() === filter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, filter]);

  const paginated = useMemo(() => {
    const key = `${page}-${search}-${filter}`;
    if (cache[key]) return cache[key];

    const result = filtered.slice((page - 1) * perPage, page * perPage);
    setCache((prev) => ({ ...prev, [key]: result }));
    return result;
  }, [filtered, page, search, filter, cache]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const totalRevenue = filtered.reduce(
    (acc, { total_price }) => acc + total_price,
    0,
  );
  const totalPending = filtered.filter(
    ({ status }) => status.toLowerCase() === 'pending',
  ).length;

  return (
    <section className="bg-gray-100 pb-5">
      <TopAvatar type="Orders" />

      <div className="px-4 space-y-2">
        <h1 className="text-surface-600 font-bold text-lg mt-2 hidden lg:block">
          Orders
        </h1>

        <div className="lg:hidden">
          <MobileOrderList
            orders={paginated}
            totalPending={totalPending}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            setSelectedOrder={setSelectedOrder}
            floatButtonShow={floatButtonShow}
            setFloatButtonShow={setFloatButtonShow}
          />
        </div>
        <div className="hidden lg:block">
          <DesktopOrderList
            orders={paginated}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            setSelectedOrder={setSelectedOrder}
          />
        </div>

        {/* Summary Section */}
        <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
          <div className="flex w-1/3">
            <div>
              <p className="text-surface-200 text-[10px]">Total Order</p>
              <p className="font-semibold text-surface-200">
                {filtered.length}
              </p>
            </div>
          </div>
          <div className="flex w-1/3 gap-8">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Pending Orders</p>
              <p className="font-semibold text-surface-200">{totalPending}</p>
            </div>
          </div>
          <div className="flex w-1/3 justify-center gap-8 md:ml-10 max-md:justify-end">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Total Revenue</p>
              <p className="font-semibold text-surface-200">
                <AnimatedCountUp amount={totalRevenue} />
              </p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center pt-6">
          <span className="text-sm text-muted-foreground">
            Showing {(page - 1) * perPage + 1} -{' '}
            {Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* View Order Modal */}
        {selectedOrder && (
          <ViewOrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
