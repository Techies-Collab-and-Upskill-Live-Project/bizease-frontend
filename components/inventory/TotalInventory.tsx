'use client';

import useInventoryStats from '@/hooks/useInventoryStats';
import AnimatedCountUp from '../animations/AnimatedCountUp';
import { formatCurrency } from '@/lib/utils';

const TotalInventory = () => {
  const { stats, loading, error } = useInventoryStats();

  const renderValue = (
    value: number | null | undefined,
    isCurrency = false,
  ) => {
    if (loading) return 'Loading...';
    if (error || value === undefined || value === null) return 0;
    return isCurrency ? (
      formatCurrency(value)
    ) : (
      <AnimatedCountUp amount={value} />
    );
  };

  return (
    <div className="flex bg-gradient items-center justify-between w-full pl-4 md:pr-30 max-md:pr-8 py-4 mx-auto rounded-sm">
      <div className="flex">
        <div>
          <p className="text-surface-200 text-[10px]">Total Stock Value</p>
          <p className="font-semibold text-surface-200">
            {renderValue(stats?.total_stock_value, true)}
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-[1px] h-8 my-auto bg-surface-300" />
        <div>
          <p className="text-surface-200 text-[10px]">Total Products</p>
          <p className="font-semibold text-surface-200">
            {renderValue(stats?.total_products)}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-8 md:ml-10 max-md:justify-end">
        <div className="w-[1px] h-8 my-auto bg-surface-300" />
        <div>
          <p className="text-surface-200 text-[10px]">Low Stock Count</p>
          <p className="font-semibold text-surface-200">
            {renderValue(stats?.low_stock_count)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalInventory;
