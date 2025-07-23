'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  X,
  AlertTriangle,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useMediaQuery } from 'usehooks-ts';

import ViewOrderModal from '@/components/modals/OrderModal';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import TopAvatar from '@/components/navigations/TopAvatar';
import { Order } from '@/types';

import MobileOrderList from '@/components/orders/MobileOrderList';
import DesktopOrderList from '@/components/orders/DesktopOrderList';
import { useOrder } from '@/hooks/useOrder';
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

const OrdersPage = () => {
  const [floatButtonShow, setFloatButtonShow] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1020px)');

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
        {/* <div className="hidden lg:block">
          <DesktopOrderList
            orders={paginated}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            setSelectedOrder={setSelectedOrder}
          />
        </div> */}

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

        {isMobile ? (
          <>
            <div className="p-4 rounded-lg shadow-sm mt-4">
              <div className="flex-center items-center gap-2 mb-2">
                <AlertTriangle className="text-warning" size={18} />
                <h2 className="font-semibold text-surface-500 text-lg">
                  Pending Order Alert
                </h2>
              </div>
              <p className="text-center text-sm text-surface-400 font-medium">
                {totalPending} order{totalPending !== 1 && 's'} are pending,
                check it up and update.
              </p>
              <p className="text-xs text-center text-surface-400 mt-1">
                Product{totalPending !== 1 && 's'} have not been attended to and
                may be due tomorrow.
              </p>
            </div>

            <div className="min-h-50 space-y-4 mt-6 bg-gray-50">
              {paginated.map(
                ({
                  client_name,
                  id,
                  total_price,
                  order_date,
                  status,
                  client_phone,
                  delivery_date,
                  ordered_products,
                  client_email,
                }) => (
                  <div
                    key={id}
                    className="bg-gray-100 p-4 rounded-lg shadow border"
                  >
                    <div className="flex justify-between text-xs font-semibold text-surface-500 mb-1">
                      <span className="text-sm text-surface-500">{id}</span>
                      <span className="text-sm text-surface-400">
                        {order_date}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-surface-400 mt-2">
                      {client_name} - {total_price}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div
                        className={cn(
                          'text-xs flex-center font-semibold px-3 py-1 rounded-full capitalize',
                          {
                            'bg-warning-bg text-warning': status === 'Pending',
                            'bg-success-bg text-success':
                              status === 'Delivered',
                            'bg-blue-100 text-darkblue': status === 'Cancelled',
                          },
                        )}
                      >
                        <div
                          className={cn('h-2 w-2 rounded-full mr-2', {
                            'bg-warning': status === 'Pending',
                            'bg-success': status === 'Delivered',
                            'bg-darkblue': status === 'Cancelled',
                          })}
                        />
                        {status}
                      </div>
                      <Button
                        size="sm"
                        className="text-[11px] px-3 py-1 bg-darkblue text-surface-200 hover:bg-lightblue"
                        onClick={() =>
                          setSelectedOrder({
                            id,
                            client_name,
                            client_phone,
                            client_email,
                            total_price,
                            status,
                            order_date,
                            delivery_date,
                            ordered_products,
                          })
                        }
                      >
                        Fulfill
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
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

                <Link href="/orders/add-new-order">
                  <Button className="bg-darkblue text-white hover:bg-lightblue">
                    Add New Order
                  </Button>
                </Link>
              </div>
            </div>

            {paginated.length === 0 ? (
              <p className="min-h-100 flex-center text-muted-foreground">
                No Orders
              </p>
            ) : (
              <div className="bg-surface-100 py-6 px-8 rounded mt-4">
                <div className="grid grid-cols-6 font-semibold text-sm bg-gray-100 text-muted-foreground border-b p-2">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Total</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                <div className="space-y-2">
                  {paginated.map(
                    ({
                      client_name,
                      id,
                      total_price,
                      order_date,
                      status,
                      client_phone,
                      delivery_date,
                      ordered_products,
                      client_email,
                    }) => (
                      <div
                        key={id}
                        className="grid grid-cols-6 items-center py-2 border-b text-sm"
                      >
                        <span>{id}</span>
                        <span>{client_name}</span>
                        <span>
                          <AnimatedCountUp amount={total_price} />
                        </span>
                        <span className="text-center">{order_date}</span>
                        <span
                          className={cn(
                            'capitalize px-3 py-1 rounded-xl w-fit',
                            {
                              'text-warning bg-warning-bg':
                                status.toLowerCase() === 'pending',
                              'text-success bg-success-bg':
                                status.toLowerCase() === 'delivered',
                              'text-darkblue bg-blue-100':
                                status.toLowerCase() === 'cancelled',
                            },
                          )}
                        >
                          {status}
                        </span>
                        <Button
                          size="sm"
                          className="bg-darkblue text-white hover:bg-lightblue text-xs"
                          onClick={() =>
                            setSelectedOrder({
                              id,
                              client_name,
                              client_phone,
                              client_email,
                              total_price,
                              status,
                              order_date,
                              delivery_date,
                              ordered_products,
                            })
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </>
        )}

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
