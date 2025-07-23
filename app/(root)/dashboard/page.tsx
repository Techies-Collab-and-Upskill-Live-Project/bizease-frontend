'use client';

import React from 'react';
import Image from 'next/image';

import TopAvatar from '@/components/navigations/TopAvatar';
import UsernameAndButtons from '@/components/dashboard/UsernameAndAddbutton';
import MobileButtons from '@/components/dashboard/MobileButton';
import PendingOrders from '@/components/dashboard/PendingOrders';
import LowStockItems from '@/components/dashboard/LowStockItems';

import { useOrderStore } from '@/lib/store/orders';
import { calculateMostOrderedProduct } from '@/lib/utils';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';

const DashboardPage = () => {
  const orders = useOrderStore((state) => state.orders);

  //  Calculate total revenue from order totals
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  //  Determine top product by frequency across orders
  const mostOrdered = calculateMostOrderedProduct(
    orders.map((order) => ({
      ...order,
      products: order.products?.map((product) => ({
        ...product,
        productName: product.product_name,
      })),
    })),
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
              <AnimatedCountUp amount={totalRevenue} />
            </p>
            <div className="flex gap-1.5 mt-2">
              <Image
                src={'/icon/green.svg'}
                width={6}
                height={6}
                alt="highlight-up"
              />
              <p className="text-success text-[10px]">+6.93%</p>
            </div>
          </div>

          <div className="flex-1/2 bg-gradient px-4 py-2 rounded-sm">
            <p className="text-surface-200 text-[10px]">Top Product</p>
            <p className="text-surface-200 text-sm">{mostOrdered.name}</p>
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
