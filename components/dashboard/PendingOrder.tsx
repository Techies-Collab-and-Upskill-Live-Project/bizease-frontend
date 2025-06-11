'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

const PendingOrders = () => {
  const inventoryItems = useInventoryStore((state) => state.inventory);

  // Filter only pending orders
  const pendingOrders = inventoryItems.filter(
    ({ status }) => status === 'Pending',
  );
  const total = pendingOrders.length;

  const [showAll, setShowAll] = useState(false);
  const visibleOrders = showAll ? pendingOrders : pendingOrders.slice(0, 3);

  return (
    <div className="space-y-4">
      {pendingOrders.length > 0 && (
        <h2 className="text-lg font-bold">Pending Orders</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleOrders.map(({ id, lastUpdated, name, status }) => (
          <div
            key={id}
            className="border rounded-2xl p-3 text-surface-400 space-y-2"
          >
            <div className="flex justify-between text-sm font-medium">
              <span className="font-semibold text-gray-800">{id}</span>
              <span className="text-[11px]">{lastUpdated}</span>
            </div>
            <div className="flex font-medium text-[14px]">
              {name} - <span className="ml-1">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                <div className="h-2 w-2 bg-warn rounded-full" />
                {status}
              </span>
              <Button className="text-[12px] bg-darkblue text-white hover:bg-blue-700 px-2 cursor-pointer">
                Fulfill
              </Button>
            </div>
          </div>
        ))}
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
