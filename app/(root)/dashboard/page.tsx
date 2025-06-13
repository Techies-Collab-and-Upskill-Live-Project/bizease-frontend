'use client';

import React from 'react';
import Image from 'next/image';

import TopAvatar from '@/components/navigations/TopAvatar';
import UsernameAndButtons from '@/components/dashboard/UsernameAndAddbutton';
import MobileButtons from '@/components/dashboard/MobileButton';
import PendingOrders from '@/components/dashboard/PendingOrder';
import LowStockItems from '@/components/dashboard/LowStockItems';

import { useOrderStore, useInventoryStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

const DashboardPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const inventoryItems = useInventoryStore((state) => state.inventory);

  // 1. Calculate total revenue from orders
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // 2. Determine most ordered product
  const productStats: Record<string, { name: string; count: number }> = {};

  orders.forEach(({ products }) => {
    products?.forEach(({ productId, productName }) => {
      if (!productId) return;
      if (!productStats[productId]) {
        productStats[productId] = { name: productName, count: 1 };
      } else {
        productStats[productId].count += 1;
      }
    });
  });

  const mostOrdered = Object.values(productStats).reduce(
    (top, current) => (current.count > top.count ? current : top),
    { name: 'N/A', count: 0 },
  );

  return (
    <section className="relative min-h-screen w-full bg-gray-100">
      <TopAvatar type="Dashboard" />

      {/* Floating Mobile Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden animate-slide-up-fade">
        <MobileButtons />
      </div>

      <div className="py-4 px-6 md:px-8">
        <UsernameAndButtons />

        {/* Revenue & Top Product Summary */}
        <div className="flex flex-col sm:flex-row gap-4 my-6">
          {/* Revenue Card */}
          <div className="flex-1 bg-gradient px-4 py-3 rounded-md text-surface-200">
            <p className="text-[11px] uppercase">Total Revenue</p>
            <p className="text-sm font-semibold">
              {formatCurrency(totalRevenue)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <Image src="/icon/green.svg" width={6} height={6} alt="up" />
              <p className="text-success text-[10px]">+6.93%</p>
            </div>
          </div>

          {/* Top Product Card */}
          <div className="flex-1 bg-gradient px-4 py-3 rounded-md text-surface-200">
            <p className="text-[11px] uppercase">Top Product</p>
            <p className="text-sm">{mostOrdered.name}</p>
          </div>
        </div>

        {/* Orders & Inventory Alerts */}
        <div className="space-y-5 mb-6">
          <PendingOrders />
          <LowStockItems />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
