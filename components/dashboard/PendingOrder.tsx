'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { recentOders } from '@/constants';

const PendingOrders = () => {
  const pendingOrders = recentOders.filter(
    ({ status }) => status === 'Pending',
  );
  const [showAll, setShowAll] = useState(false);
  const visibleOrders = showAll ? pendingOrders : pendingOrders.slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Pending Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleOrders.map(
          ({ id, orderId, date, customerName, total, status }) => (
            <div
              key={id}
              className="border rounded-2xl p-3 text-surface-400 space-y-2"
            >
              <div className="flex justify-between text-sm font-medium">
                <span className="font-semibold text-gray-800">{orderId}</span>
                <span className="text-[11px]">{date}</span>
              </div>
              <div className="flex font-medium text-[14px]">
                {customerName} - <span>{total}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-semibold bg-warning-bg text-warning px-2 py-1 rounded-full">
                  <div className="h-2 w-2 bg-warning rounded-full" />
                  {status}
                </span>
                <Button className="text-[12px] bg-darkblue text-surface-200 hover:bg-lightblue px-2 cursor-pointer">
                  Fulfill
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
      {!showAll && pendingOrders.length > 3 && (
        <Button
          variant="outline"
          className="mx-auto block cursor-pointer"
          onClick={() => setShowAll(true)}
        >
          Show More
        </Button>
      )}
    </div>
  );
};

export default PendingOrders;
