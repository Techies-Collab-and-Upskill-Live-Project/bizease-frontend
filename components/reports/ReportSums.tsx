'use client';

import React from 'react';
import Image from 'next/image';
import { useInventoryStore, useOrderStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

const MetricCard = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string | number;
  change?: number;
}) => (
  <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 rounded-sm">
    <p className="text-surface-200 text-[10px]">{label}</p>
    <p className="font-semibold text-surface-200">{value}</p>
    {typeof change === 'number' && (
      <div className="flex gap-1.5 mt-2">
        <Image
          src={change >= 0 ? '/icon/green.svg' : '/icon/red.svg'}
          width={6}
          height={6}
          alt="trend"
        />
        <p
          className={`text-[10px] ${
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

  // Calculate sales count for each product
  const productSales: Record<string, number> = {};

  orders.forEach((order) => {
    if (order.status === 'Cancelled') return;

    order.items?.forEach((item) => {
      const name = item?.productName;
      if (name && typeof item.quantity === 'number') {
        productSales[name] = (productSales[name] || 0) + item.quantity;
      }
    });
  });

  const topSellingProduct =
    Object.entries(productSales).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    'No Leading Product';

  const revenueChange = 7; // mock for now
  const stockChange = 12; // mock for now

  return (
    <div className="flex flex-col w-full mt-3 gap-2">
      <div className="flex w-full gap-4 px-6 h-20">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={revenueChange}
        />
        <MetricCard label="Total Orders" value={totalOrders} />
      </div>

      <div className="flex w-full gap-4 px-6 h-20">
        <MetricCard
          label="Total Stock Value"
          value={formatCurrency(totalStockValue)}
          change={stockChange}
        />
        <MetricCard label="Total Products" value={totalProducts} />
      </div>

      <div className="flex w-full gap-4 px-6 h-20">
        <MetricCard label="Low Stock Items" value={lowStockItems} />
        <MetricCard label="Top Selling Product" value={topSellingProduct} />
      </div>

      <div className="flex w-1/2 gap-4 pl-6 pr-2 h-20">
        <MetricCard label="Pending Orders" value={pendingOrders} />
      </div>
    </div>
  );
};

export default ReportSums;
