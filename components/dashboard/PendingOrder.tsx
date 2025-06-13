'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

const PendingOrders = () => {
  const orders = useOrderStore((state) => state.orders);
  const pendingOrders = orders.filter((order) => order.status === 'Pending');

  const [showAll, setShowAll] = useState(false);
  const visibleOrders = showAll ? pendingOrders : pendingOrders.slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Pending Orders</h2>

      {pendingOrders.length === 0 ? (
        <div className="text-muted-foreground text-sm">No pending orders.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleOrders.map(({ id, lastUpdated, name, total, status }) => (
              <div
                key={id}
                className="border rounded-2xl p-3 text-surface-400 space-y-2"
              >
                <div className="flex justify-between text-sm font-medium">
                  <span className="font-semibold text-gray-800">{id}</span>
                  <span className="text-[11px]">{lastUpdated}</span>
                </div>

                <div className="text-[14px] font-medium text-gray-700">
                  {name} - <span>{formatCurrency(total)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                    {status}
                  </span>
                  <Button className="text-[12px] bg-darkblue text-white hover:bg-blue-700 px-2 cursor-pointer">
                    Fulfill
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {pendingOrders.length > 3 && (
            <Button
              variant="outline"
              className="mx-auto block"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default PendingOrders;
