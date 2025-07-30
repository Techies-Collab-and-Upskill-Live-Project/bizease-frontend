'use client';

import { Order } from '@/types';
import { FC } from 'react';

interface DesktopOrderListProps {
  orders: Order[];
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  setSelectedOrder: (order: Order) => void;
}

const DesktopOrderList: FC<DesktopOrderListProps> = ({
  orders,
  // search,
  // setSearch,
  // filter,
  // setFilter,
  setSelectedOrder,
}) => {
  return (
    <div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-2 py-1">Client</th>
            <th className="text-left px-2 py-1">Status</th>
            <th className="text-left px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-2 py-1">{order.client_name}</td>
              <td className="px-2 py-1">{order.status}</td>
              <td className="px-2 py-1">{order.order_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopOrderList;
