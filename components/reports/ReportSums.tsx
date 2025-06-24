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
  <div className="flex flex-col bg-gradient rounded-md p-4 w-full min-w-0 shadow-sm">
    <p className="text-surface-200 text-xs truncate">{label}</p>
    <p className="font-semibold text-surface-200 text-base truncate">{value}</p>
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
          {Math.abs(change)}%
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

  const totalProducts = inventoryItems.length;
  const lowStockItems = inventoryItems.filter((item) => item.stock < 5).length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  const mostOrdered = calculateMostOrderedProduct(orders);

  const revenueChange = 7;
  const stockChange = 12;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-sm:w-md max-sm:mx-auto">
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
