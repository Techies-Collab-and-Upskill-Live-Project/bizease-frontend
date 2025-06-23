'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

interface PendingOrdersMobileProps {
  lowStockCount: number;
  pendingOrders: Order[];
  onViewDetails: (order: Order) => void;
}

const PendingOrdersMobile: React.FC<PendingOrdersMobileProps> = ({
  lowStockCount,
  pendingOrders,
  onViewDetails,
}) => {
  return (
    <section className="space-y-4 sm:hidden">
      {/* Low stock alert card */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-600" size={20} />
          <h2 className="text-sm font-semibold text-yellow-700">
            Pending Order Alert
          </h2>
        </div>
        <p className="text-sm font-medium text-yellow-800">
          {lowStockCount} item{lowStockCount !== 1 && 's'} have not been
          attended to and will be due tomorrow.
        </p>
      </div>

      {/* Pending orders list */}
      {pendingOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm border p-4 space-y-2 text-sm"
        >
          <div className="flex justify-between font-semibold text-darkblue">
            <span>Ord - {order.id}</span>
            <span>{order.date}</span>
          </div>
          <p className="text-gray-700">{order.name}</p>
          <div className="flex justify-between items-center">
            <span
              className={cn(
                'capitalize px-2 py-1 rounded-xl text-xs font-semibold',
                {
                  'bg-yellow-100 text-yellow-600': order.status === 'Pending',
                  'bg-green-100 text-green-600': order.status === 'Delivered',
                  'bg-blue-100 text-blue-600': order.status === 'Cancelled',
                },
              )}
            >
              {order.status}
            </span>
            <Button
              onClick={() => onViewDetails(order)}
              className="bg-darkblue text-white hover:bg-lightblue text-xs px-3 py-1"
            >
              Fulfill
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PendingOrdersMobile;
