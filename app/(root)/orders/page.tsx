'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'usehooks-ts';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import TopAvatar from '@/components/navigations/TopAvatar';
import { useOrder } from '@/hooks/useOrder';
import { useOrderStats } from '@/hooks/useOrderStats';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import ViewOrderModal from '@/components/modals/OrderModal';

import { Order } from '@/types';
import { Skeleton2 } from '@/components/ui/skeleton';
import InventorySkeleton from '@/components/inventory/InventorySkeleton';
import OrderControls from '@/components/orders/SearchAndFilterOrder';

const OrdersPage = () => {
  const { orders, loading } = useOrder();
  const { stats, loading: statsLoading } = useOrderStats();

  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'delivered'>('all');
  const [cache, setCache] = useState<Record<string, Order[]>>({});
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1020px)');

  const [page, setPage] = useState(1);
  const perPage = 7;

  useEffect(() => setHasMounted(true), []);
  useEffect(() => setCache({}), [orders]);

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

  if (loading) return <InventorySkeleton />;

  return (
    <section className="bg-gray-100 pb-5">
      <TopAvatar type="Orders" />

      <div className="px-4 space-y-2">
        <h1 className="text-surface-600 font-bold text-lg mt-2 hidden lg:block">
          Orders
        </h1>

        <div className="w-full lg:hidden">
          <OrderControls
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={(val) => setFilter(val as typeof filter)}
          />
        </div>

        <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
          <div className="flex w-1/3">
            <div>
              <p className="text-surface-200 text-[10px]">Total Order</p>
              {statsLoading ? (
                <Skeleton2 className="h-4 w-12" />
              ) : (
                <p className="font-semibold text-surface-200">
                  {stats?.total_orders ?? 0}
                </p>
              )}
            </div>
          </div>
          <div className="flex w-1/3 gap-8">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Pending Orders</p>
              <span className="font-semibold text-surface-200">
                {statsLoading ? (
                  <Skeleton2 className="h-4 w-12" />
                ) : (
                  stats?.pending_orders ?? 0
                )}
              </span>
            </div>
          </div>
          <div className="flex w-1/3 justify-center gap-8 md:ml-10 max-md:justify-end">
            <div className="w-[1px] h-8 my-auto bg-surface-300" />
            <div>
              <p className="text-surface-200 text-[10px]">Total Revenue</p>
              <span className="font-semibold text-surface-200">
                {statsLoading ? (
                  <Skeleton2 />
                ) : (
                  <AnimatedCountUp amount={stats?.total_revenue ?? 0} />
                )}
              </span>
            </div>
          </div>
        </div>

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
            {paginated.map((order) => (
              <div
                key={order.id}
                className="bg-gray-100 p-4 rounded-lg shadow border"
              >
                <div className="flex justify-between text-xs font-semibold text-surface-500 mb-1">
                  <span className="text-sm text-surface-500">
                    Order Id: - {order.id}
                  </span>
                  <span className="text-sm text-surface-400">
                    {new Date(order.order_date).toLocaleDateString('en-NG', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-sm font-semibold text-surface-400 mt-2">
                  {order.client_name} - ₦ {order.total_price}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div
                    className={cn(
                      'text-xs flex items-center font-medium px-3 py-1 rounded-full capitalize',
                      {
                        'bg-warning-bg text-warning':
                          order.status.toLowerCase() === 'pending',
                        'bg-success-bg text-success':
                          order.status.toLowerCase() === 'delivered',
                      },
                    )}
                  >
                    <div
                      className={cn('h-2 w-2 text-xs rounded-full mr-2', {
                        'bg-warning': order.status.toLowerCase() === 'pending',
                        'bg-success':
                          order.status.toLowerCase() === 'delivered',
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

        {hasMounted && !isMobile && (
          <>
            <div className="hidden lg:flex">
              <OrderControls
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={(val) => setFilter(val as typeof filter)}
              />
            </div>

            {paginated?.length === 0 ? (
              <p className="min-h-100 flex-center text-muted-foreground">
                No Orders
              </p>
            ) : (
              <div className="bg-surface-100 py-6 px-8 rounded mt-4">
                <div className="grid grid-cols-6 font-semibold text-base bg-gray-100 text-muted-foreground border-b p-2">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Total</span>
                  <span className="ml-8">Date</span>
                  <span className="ml-8">Status</span>
                  <span className="text-center">Actions</span>
                </div>

                <div className="space-y-2">
                  {paginated.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-6 items-center text-surface-500 py-2 border-b text-sm"
                    >
                      <span>Order Id: {order.id}</span>
                      <span className="ml-4">{order.client_name}</span>
                      <span>
                        <AnimatedCountUp amount={order.total_price || 0} />
                      </span>
                      <span className="text-xs text-surface-400">
                        {new Date(order.order_date).toLocaleDateString(
                          'en-NG',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </span>
                      <span
                        className={cn(
                          'capitalize px-2 py-1 text-xs ml-6 rounded-xl w-fit',
                          {
                            'text-warning bg-warning-bg':
                              order.status.toLowerCase() === 'pending',
                            'text-success bg-success-bg':
                              order.status.toLowerCase() === 'delivered',
                          },
                        )}
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
      </div>

      <div className="fixed bottom-25 right-6 z-50 lg:hidden">
        <div className="flex items-center gap-2">
          {fabOpen && (
            <Button
              onClick={() => router.push('/orders/add-new-order')}
              className="bg-darkblue hover:bg-lightblue text-white border border-surface-100 rounded-md px-4 py-3 transition-all duration-300"
            >
              <span className="text-sm font-medium">Add New Order</span>
            </Button>
          )}
          <Button
            onClick={() => setFabOpen(!fabOpen)}
            aria-label={fabOpen ? 'Close FAB' : 'Open FAB'}
            className="bg-darkblue hover:bg-lightblue text-white border border-surface-100 rounded-md p-3 transition-all duration-300"
          >
            {fabOpen ? (
              <Minus className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </Button>
        </div>
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
