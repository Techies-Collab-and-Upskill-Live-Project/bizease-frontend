'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, ChevronLeft, AlertTriangle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'usehooks-ts';
import ViewOrderModal from '@/components/modals/OrderModal';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import TopAvatar from '@/components/navigations/TopAvatar';
import MobileOrderList from '@/components/orders/MobileOrderList';
import { useOrder } from '@/hooks/useOrder';
import { useOrderStats } from '@/hooks/useOrderStats';
import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import type { Order } from '@/types';

const OrdersPage = () => {
  const { orders } = useOrder();
  const { stats, loading: statsLoading } = useOrderStats();

  const [floatButtonShow, setFloatButtonShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'pending' | 'delivered' | 'cancelled'
  >('all');
  const [cache, setCache] = useState<Record<string, Order[]>>({});
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1020px)');

  const [page, setPage] = useState(1);
  const perPage = 7;

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const totalPending =
    stats?.pending_orders ??
    filtered.filter(({ status }) => status.toLowerCase() === 'pending').length;

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
            setFilter={(val) => setFilter(val as typeof filter)}
            setSelectedOrder={setSelectedOrder}
            floatButtonShow={floatButtonShow}
            setFloatButtonShow={setFloatButtonShow}
          />
        </div>
        {/* Summary Section */}
        <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
          <div className="flex w-1/3">
            <div>
              <p className="text-surface-200 text-[10px]">Total Order</p>
              <p className="font-semibold text-surface-200">
                {statsLoading ? 'loading...' : stats?.total_orders ?? 0}
              </p>
            </div>
          </div>
          <div className="flex w-1/3 gap-8">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Pending Orders</p>
              <p className="font-semibold text-surface-200">
                {statsLoading ? 'loading...' : stats?.pending_orders ?? 0}
              </p>
            </div>
          </div>
          <div className="flex w-1/3 justify-center gap-8 md:ml-10 max-md:justify-end">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Total Revenue</p>
              <p className="font-semibold text-surface-200">
                {statsLoading ? (
                  'loading...'
                ) : (
                  <AnimatedCountUp amount={stats?.total_revenue ?? 0} />
                )}
              </p>
            </div>
          </div>
        </div>
        {/* Mobile Alert */}
        {hasMounted && isMobile && (
          <div className="p-4 rounded-lg shadow-sm mt-4">
            <div className="flex-center items-center gap-2 mb-2">
              <AlertTriangle className="text-warning" size={18} />
              <h2 className="font-semibold text-surface-500 text-lg">
                Pending Order Alert
              </h2>
            </div>
            <p className="text-center text-sm text-surface-400 font-medium">
              {stats?.pending_orders} order{stats?.total_orders !== 1 && 's'}{' '}
              are pending, check it up and update.
            </p>
            <p className="text-xs text-center text-surface-400 mt-1">
              Product{stats?.pending_orders !== 1 && 's'} have not been attended
              to and may be due tomorrow.
            </p>
          </div>
        )}
        {hasMounted && isMobile && (
          <div className="min-h-50 space-y-4 mt-6 bg-gray-50">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-100 p-4 rounded-lg shadow border"
              >
                <div className="flex justify-between text-xs font-semibold text-surface-500 mb-1">
                  <span className="text-sm text-surface-500">
                    ID - {order.id}
                    {uuidv4()}
                  </span>
                  <span className="text-sm text-surface-400">
                    {new Date(order.order_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-semibold text-surface-400 mt-2">
                  {order.client_name} - ₦
                  {Number(order.total_price).toLocaleString()}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div
                    className={cn(
                      'text-xs flex items-center font-semibold px-3 py-1 rounded-full capitalize',
                      {
                        'bg-warning-bg text-warning':
                          order.status.toLowerCase() === 'pending',
                        'bg-success-bg text-success':
                          order.status.toLowerCase() === 'delivered',
                        'bg-blue-100 text-darkblue':
                          order.status.toLowerCase() === 'cancelled',
                      },
                    )}
                  >
                    <div
                      className={cn('h-2 w-2 rounded-full mr-2', {
                        'bg-warning': order.status.toLowerCase() === 'pending',
                        'bg-success':
                          order.status.toLowerCase() === 'delivered',
                        'bg-darkblue':
                          order.status.toLowerCase() === 'cancelled',
                      })}
                    />
                    {order.status}
                  </div>
                  <Button
                    size="sm"
                    className="text-[11px] px-3 py-1 bg-darkblue text-surface-200 hover:bg-lightblue"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Fulfill
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Desktop Table */}
        {hasMounted && !isMobile && (
          <>
            <div className="lg:flex justify-between items-center gap-4 mt-6 hidden">
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

              <div className="flex gap-2">
                <Select
                  value={filter}
                  onValueChange={(val) => setFilter(val as typeof filter)}
                >
                  <SelectTrigger className="w-[160px] border border-lightblue">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Link href="/orders/add-new-order">
                  <Button className="bg-darkblue text-white hover:bg-lightblue">
                    Add New Order
                  </Button>
                </Link>
              </div>
            </div>

            {orders?.length === 0 ? (
              <p className="min-h-100 flex-center text-muted-foreground">
                No Orders
              </p>
            ) : (
              <div className="bg-surface-100 py-6 px-8 rounded mt-4">
                <div className="grid grid-cols-6 font-semibold text-base bg-gray-100 text-muted-foreground border-b p-2">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Total</span>
                  <span>Date</span>
                  <span className="ml-4">Status</span>
                  <span className="text-center">Actions</span>
                </div>

                <div className="space-y-2">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-6 items-center text-surface-500 py-2 border-b text-sm"
                    >
                      <span>
                        ID {order.id}
                        {uuidv4()}
                      </span>
                      <span>{order.client_name}</span>
                      <span>
                        <AnimatedCountUp amount={order.total_price || 0} />
                      </span>
                      <span className="text-left">
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                      <span
                        className={cn('capitalize px-3 py-1 rounded-xl w-fit', {
                          'text-warning bg-warning-bg':
                            order.status.toLowerCase() === 'pending',
                          'text-success bg-success-bg':
                            order.status.toLowerCase() === 'delivered',
                          'text-darkblue bg-blue-100':
                            order.status.toLowerCase() === 'cancelled',
                        })}
                      >
                        {order.status}
                      </span>
                      <Button
                        size="sm"
                        className="bg-darkblue text-white hover:bg-lightblue text-xs"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {/* Pagination */}
        <div className="flex justify-between items-center pt-6">
          <span className="text-sm text-muted-foreground">
            Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, 0)}{' '}
            of {0}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} /> Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next <ChevronRight size={16} />
            </Button>
          </div>
        </div>
        {/* View Order Modal */}
        {selectedOrder && (
          <ViewOrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}{' '}
      </div>
    </section>
  );
};

export default OrdersPage;
