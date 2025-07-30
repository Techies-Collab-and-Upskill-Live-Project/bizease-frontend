'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useInventory } from '@/hooks/useInventory';

const LowStockItems = () => {
  const { inventory } = useInventory();

  const lowStockItems = inventory.filter(({ stock_level }) => stock_level <= 5);

  const [showAll, setShowAll] = useState(false);
  const [showFloatButtons, setShowFloatButtons] = useState(false);

  const visibleItems = showAll ? lowStockItems : lowStockItems.slice(0, 6);
  const lowStockCount = lowStockItems.length;

  return (
    <div className="relative space-y-4 mb-24">
      <h2 className="font-semibold text-lg">Low Stock Items</h2>

      {/* ===== MOBILE VIEW ===== */}
      <div className="hidden max-lg:block space-y-4">
        {lowStockCount > 0 ? (
          <>
            <div className="rounded-xl border border-warning bg-warning-bg p-4">
              <div className="flex items-center gap-2 text-warning font-semibold">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Low Stock Alert
              </div>
              <p className="mt-1 text-sm font-medium text-warning">
                {lowStockCount} items currently low. Please restock as soon as
                possible.
              </p>
            </div>

            {visibleItems.map(
              ({ id, stock_level, product_name, category, price }) => (
                <div
                  key={id}
                  className="bg-surface-100 shadow-sm border rounded-lg p-4"
                >
                  <div className="flex justify-between items-end">
                    <div className="space-y-2 text-sm">
                      <div className="font-semibold text-surface-500">
                        {product_name}
                      </div>
                      <div className="text-xs font-medium text-surface-400">
                        {category}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium bg-warning rounded-lg px-2 py-1 text-surface-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        {stock_level} units - <span>Low Stock</span>
                      </div>
                      <div className="text-sm text-surface-500 font-medium">
                        {formatCurrency(price)}
                      </div>
                    </div>
                    <Link href={`/inventory/edit-product/${id}`}>
                      <Button className="bg-darkblue text-surface-200 hover:bg-lightblue text-xs px-3 py-1 mt-1">
                        Restock
                      </Button>
                    </Link>
                  </div>
                </div>
              ),
            )}

            {!showAll && lowStockItems.length > 6 && (
              <Button
                variant="outline"
                className="mx-auto block mt-2 text-sm"
                onClick={() => setShowAll(true)}
              >
                Show More
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-10 border rounded-xl text-sm text-gray-500 bg-white shadow-sm">
            <p className="font-medium text-base text-gray-600">
              You are all stocked up
            </p>
            <p className="text-sm mt-1">No low-stock items at the moment.</p>
          </div>
        )}
      </div>

      {/* ===== DESKTOP VIEW ===== */}
      <div className="max-lg:hidden">
        {lowStockCount > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleItems.map(
                ({ id, stock_level, category, product_name, price }) => (
                  <div
                    key={id}
                    className="border rounded-2xl p-4 shadow-sm space-y-2"
                  >
                    <div className="text-sm font-medium">{product_name}</div>
                    <div className="text-sm text-gray-500">{category}</div>
                    <div className="flex items-center text-xs font-semibold py-1 bg-warning rounded-3xl px-2 w-fit gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>{stock_level} Units</span> - <span>Low Stock</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>{formatCurrency(price)}</span>
                      <Link href={`/inventory/edit-product/${id}`}>
                        <Button className="bg-darkblue font-normal text-white hover:bg-lightblue px-3 text-xs">
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
                className="mx-auto block mt-4 text-sm"
                onClick={() => setShowAll(true)}
              >
                Show More
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-16 border rounded-xl text-sm text-gray-500 bg-white shadow-sm">
            <p className="font-semibold text-lg text-gray-600">
              No Low Stock Items
            </p>
            <p className="text-sm mt-2">No Low Stock Items in the Inventory.</p>
          </div>
        )}
      </div>

      {/* ===== FLOATING BUTTONS (Mobile only) ===== */}
      <div className="lg:hidden fixed bottom-30 right-4 z-50 pointer-events-none">
        {/* Backdrop */}
        <AnimatePresence>
          {showFloatButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black pointer-events-auto"
              onClick={() => setShowFloatButtons(false)}
            />
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <AnimatePresence>
            {showFloatButtons && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/inventory/add-new-product">
                    <Button className="bg-darkblue text-white hover:bg-lightblue text-sm">
                      + Add New Product
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <Link href="/orders/add-new-order">
                    <Button className="bg-darkblue text-white hover:bg-lightblue text-sm">
                      + Add New Order
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Toggle */}
          <Button
            onClick={() => setShowFloatButtons((prev) => !prev)}
            className="bg-darkblue text-white hover:bg-lightblue text-sm px-4 py-2"
          >
            {showFloatButtons ? '×' : '+'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LowStockItems;
