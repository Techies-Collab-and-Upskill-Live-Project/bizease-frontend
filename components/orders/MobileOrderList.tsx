'use client';

import { Order } from '@/types';

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
  orders,
  totalPending,
  search,
  setSearch,
  filter,
  setFilter,
  setSelectedOrder,
  floatButtonShow,
  setFloatButtonShow,
}: MobileOrderListProps) => {
  return (
    <div>
      {/* Replace with your actual mobile UI logic */}
      <p className="text-sm font-medium">Mobile Orders (Filtered: {filter})</p>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => setSelectedOrder(order)}
          className="border p-2 my-2 rounded"
        >
          <p className="font-bold">{order.client_name}</p>
          <p className="text-xs">Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MobileOrderList;
