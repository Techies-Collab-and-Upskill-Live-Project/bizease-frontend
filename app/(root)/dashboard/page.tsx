'use client';

import React from 'react';
import Image from 'next/image';

import TopAvatar from '@/components/navigations/TopAvatar';
import { formatCurrency } from '@/lib/utils';
import UsernameAndButtons from '@/components/dashboard/UsernameAndAddbutton';
import MobileButtons from '@/components/dashboard/MobileButton';
import PendingOrders from '@/components/dashboard/PendingOrder';
import LowStockItems from '@/components/dashboard/LowStockItems';

import { useInventoryStore } from '@/lib/store';

const DashboardPage = () => {
  const inventoryItems = useInventoryStore((state) => state.inventory);

  const revenueData = inventoryItems.map((item) => {
    const units = item.stock || 0;
    const price = item.price || 0;
    const revenue = units * price;

    return {
      ...item,
      units,
      price,
      revenue,
    };
  });

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);

  const topSellingProduct = revenueData.reduce(
    (top, item) => (item.revenue > top.revenue ? item : top),
    revenueData[0] || { revenue: 0, name: 'N/A' },
  );

  return (
    <section className="relative min-h-screen h-fit w-full bg-gray-100">
      <TopAvatar type="Dashboard" />

      {/* Floating Mobile Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden animate-slide-up-fade">
        <MobileButtons />
      </div>

      <div className="py-3 px-8 overflow-auto">
        <UsernameAndButtons />

        {/* Revenue and Top Product Cards */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1/2 flex-col bg-gradient px-4 py-2 rounded-sm">
            <p className="text-surface-200 text-[10px]">Revenue</p>
            <p className="text-surface-200 text-sm font-semibold">
              {formatCurrency(totalRevenue)}
            </p>
            <div className="flex gap-1.5 mt-2">
              <Image
                src={'/icon/green.svg'}
                width={6}
                height={6}
                alt="highlight-up"
              />
              <p className="text-success text-[10px]">6.93%</p>
            </div>
          </div>

          <div className="flex-1/2 bg-gradient px-4 py-2 rounded-sm">
            <p className="text-surface-200 text-[10px]">Top Product</p>
            <p className="text-surface-200 text-sm">
              {topSellingProduct.name || 'N/A'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="space-y-5">
            <PendingOrders />
            <LowStockItems />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
