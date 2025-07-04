'use client';

import React from 'react';
import Image from 'next/image';
import { useInventoryStore, useOrderStore } from '@/lib/store';
import { calculateMostOrderedProduct, formatCurrency } from '@/lib/utils';

const MetricCard = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string | number;
  change?: number;
}) => (
  <div className="flex flex-col justify-between bg-gradient rounded-md p-2 w-full h-full shadow-sm">
    <div className="space-y-1">
      <p className="text-surface-200 text-xs truncate">{label}</p>
      <p className="font-semibold text-surface-200 text-base truncate">
        {value}
      </p>
    </div>
    {typeof change === 'number' && (
      <div className="flex items-center gap-1 mt-2">
        <Image
          src={change >= 0 ? '/icon/green.svg' : '/icon/red.svg'}
          width={10}
          height={10}
          alt="trend"
        />
        <p
          className={`text-xs ${
            change >= 0 ? 'text-success' : 'text-destructive'
          }`}
        >
          {Math.abs(change).toFixed(1)}%
        </p>
      </div>
    )}
  </div>
);

const ReportSums = () => {
  const inventoryItems = useInventoryStore((state) => state.inventory);
  const orders = useOrderStore((state) => state.orders);

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  const totalStockValue = inventoryItems.reduce(
    (acc, item) => acc + item.price * item.stock,
    0,
  );

  const calculatePercentageChange = (
    current: number,
    previous: number,
  ): number => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const previousRevenue = 200000;
  const previousStockValue = 50000;

  const revenueChange = calculatePercentageChange(
    totalRevenue,
    previousRevenue,
  );
  const stockChange = calculatePercentageChange(
    totalStockValue,
    previousStockValue,
  );

  const totalProducts = inventoryItems.length;
  const lowStockItems = inventoryItems.filter((item) => item.stock < 5).length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  const mostOrdered = calculateMostOrderedProduct(orders);

  return (
    <div className="w-full mx-auto px-4 lg:px-8 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-fr">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={revenueChange}
        />
        <MetricCard label="Total Orders" value={totalOrders} />
        <MetricCard
          label="Total Stock Value"
          value={formatCurrency(totalStockValue)}
          change={stockChange}
        />
        <MetricCard label="Total Products" value={totalProducts} />
        <MetricCard label="Low Stock Items" value={lowStockItems} />
        <MetricCard label="Top Selling Product" value={mostOrdered.name} />
        <MetricCard label="Pending Orders" value={pendingOrders} />
      </div>
    </div>
  );
};

export default ReportSums;
