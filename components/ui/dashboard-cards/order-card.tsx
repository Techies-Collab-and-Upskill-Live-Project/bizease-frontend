import React from 'react';
import { Button } from '../button';

interface OrderCardProps {
  orderId: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  customer,
  amount,
  date,
  status,
}) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col min-w-[200px]">
    <div className="flex justify-between text-xs text-gray-500">
      <span>Order #{orderId}</span>
      <span>{date}</span>
    </div>
    <div className="mt-2 font-semibold">
      {customer} - {amount}
    </div>
    <div className="mt-2 flex items-center">
      <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
        {status}
      </span>
      <Button className="ml-auto bg-darkblue text-white px-3 py-1 rounded text-xs">
        Fulfill
      </Button>
    </div>
  </div>
);

export default OrderCard;
