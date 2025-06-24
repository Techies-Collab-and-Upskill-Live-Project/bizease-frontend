'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const LowStockItems = () => {
  const inventoryItems = useInventoryStore((state) => state.inventory);
  const lowStockItems = inventoryItems.filter(({ stock }) => stock < 5);

  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? lowStockItems : lowStockItems.slice(0, 6);

  const lowStockCount = lowStockItems.length;

  return (
    <div className="space-y-4 mb-10">
      {/* Mobile Alert Card */}
      <div className="sm:hidden space-y-4">
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
          <div className="flex items-center gap-2 text-yellow-700 font-semibold">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Pending Order Alert
          </div>
          <p className="mt-1 text-sm font-medium text-yellow-800">
            {lowStockCount} items have not been attended to and will be due
            tomorrow.
          </p>
        </div>

        {visibleItems.map(({ id, stock, name, category, price }) => (
          <div
            key={id}
            className="bg-white shadow-sm border rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>ID: {id}</span>
              <span>Stock: {stock}</span>
            </div>
            <div className="text-sm font-semibold text-darkblue">{name}</div>
            <div className="text-xs text-gray-500">{category}</div>
            <div className="text-sm font-medium text-gray-800">
              {formatCurrency(price)}
            </div>
            <div className="flex justify-between items-center">
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  'bg-yellow-100 text-yellow-700',
                )}
              >
                Low Stock
              </span>
              <Link href={`/inventory/edit-product/${id}`}>
                <Button className="bg-darkblue font-normal text-white hover:bg-lightblue px-3 py-1 text-xs">
                  Restock
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {!showAll && lowStockItems.length > 6 && (
          <Button
            variant="outline"
            className="mx-auto block mt-2 text-sm"
            onClick={() => setShowAll(true)}
          >
            Show More
          </Button>
        )}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden sm:block">
        <h2 className="text-lg font-bold">Low Stock Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleItems.map(({ id, stock, category, name, price }) => (
            <div
              key={id}
              className="border rounded-2xl p-4 shadow-sm space-y-2"
            >
              <div className="text-sm font-medium">{name}</div>
              <div className="text-sm text-gray-500">{category}</div>
              <div className="flex items-center text-xs font-semibold py-1 bg-warning rounded-3xl px-2 w-fit gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{stock} Units</span> - <span>Low Stock</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>{formatCurrency(price)}</span>
                <Link href={`/inventory/edit-product/${id}`}>
                  <Button className="bg-darkblue font-normal text-surface-300 hover:bg-lightblue px-2 cursor-pointer">
                    Restock
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {!showAll && lowStockItems.length > 6 && (
          <Button
            variant="outline"
            className="mx-auto block mt-2 text-sm"
            onClick={() => setShowAll(true)}
          >
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default LowStockItems;
