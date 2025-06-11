'use client';

import { formatCurrency } from '@/lib/utils';
import { useInventoryStore } from '@/lib/store';

const TotalInventory = () => {
  const inventoryItems = useInventoryStore((state) => state.inventory);

  const totalProducts = inventoryItems.length;

  const totalValue = inventoryItems.reduce((sum, item) => {
    const unitCount = item.stock ?? 0;
    const price = item.price ?? 0;
    return sum + unitCount * price;
  }, 0);

  const totalLowStock = inventoryItems.filter(
    (item) => Number(item.stock) < 5,
  ).length;

  return (
    <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
      <div className="flex">
        <div>
          <p className="text-surface-200 text-[10px]">Total Stock Value</p>
          <p className="font-semibold text-surface-200 ">
            <span>{formatCurrency(totalValue)}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-[1px] h-8 my-auto bg-surface-300" />
        <div>
          <p className="text-surface-200 text-[10px]">Total Products</p>
          <p className="font-semibold text-surface-200 ">
            <span>{totalProducts}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-8 md:ml-10 max-md:justify-end">
        <div className="w-[1px] h-8 my-auto bg-surface-300" />
        <div>
          <p className="text-surface-200 text-[10px]">Low Stock Counts</p>
          <p className="font-semibold text-surface-200 ">
            <span>{totalLowStock}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalInventory;
