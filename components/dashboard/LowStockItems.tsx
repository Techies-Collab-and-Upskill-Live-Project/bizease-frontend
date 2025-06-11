'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { inventoryItems } from '@/constants';

export const lowStockItems = inventoryItems.filter(
  (item) => item.status.toLowerCase() === 'low stock',
);

const LowStockItems = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? lowStockItems : lowStockItems.slice(0, 6);

  return (
    <div className="space-y-4 mb-10 bg-gray-100 ">
      <h2 className="text-lg font-bold">Low Stock Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleItems.map(
          ({ id, itemsInStock, category, stockLevel, price }) => (
            <div
              key={id}
              className="border rounded-2xl p-4 shadow-sm space-y-2"
            >
              <div className="text-sm font-medium">{itemsInStock}</div>
              <div className="text-sm text-gray-500">{category}</div>
              <div className="flex  items-center text-[10px] font-semibold py-1 bg-warning rounded-3xl px-2 w-fit  gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{stockLevel} Units</span> - <span>Low Stock</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>₦{price}</span>
                <Link href={`./inventory/edit-product/${id}`}>
                  <Button className="bg-darkblue font-normal text-surface-300 hover:bg-lightblue px-2 cursor-pointer">
                    Restock
                  </Button>
                </Link>
              </div>
            </div>
          ),
        )}
      </div>
      {!showAll && lowStockItems.length > 6 && (
        <Button
          variant="outline"
          className="mx-auto block"
          onClick={() => setShowAll(true)}
        >
          Show More
        </Button>
      )}
    </div>
  );
};

export default LowStockItems;
