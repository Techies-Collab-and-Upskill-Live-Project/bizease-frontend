'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import TopAvatar from '@/components/navigations/TopAvatar';
import UsernameAndButtons from '@/components/dashboard/UsernameAndAddbutton';
import MobileButtons from '@/components/dashboard/MobileButton';
import PendingOrders from '@/components/dashboard/PendingOrders';
import LowStockItems from '@/components/dashboard/LowStockItems';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import { useDashboard } from '@/hooks/useDashboard';
import { useReport } from '@/hooks/useReport';
import { ReportQuery } from '@/lib/services/report';
import InventorySkeleton from '@/components/inventory/InventorySkeleton';

const DashboardPage = () => {
  const [period] = useState<ReportQuery['period']>('last-week');

  const { dashboardStats, loading, error } = useDashboard();
  const { report } = useReport({ period });

  const revenue = dashboardStats?.revenue ?? 0;

  const topProduct = report?.top_selling_product ?? 'Not available';

  const revenueChangeImage =
    report?.revenue_change !== undefined && report.revenue_change >= 0
      ? '/icon/green.svg'
      : '/icon/red.svg';

  if (loading) return <InventorySkeleton />;

  return (
    <section className="relative min-h-screen h-fit w-full bg-gray-100">
      <TopAvatar type="Dashboard" />

      {/* Floating Mobile Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden animate-slide-up-fade">
        <MobileButtons />
      </div>

      <div className="py-3 px-8 overflow-auto">
        <UsernameAndButtons />

        {loading ? (
          <p className="text-muted-foreground text-sm mt-10">
            Loading dashboard...
          </p>
        ) : error ? (
          <p className="text-red-500 text-sm mt-10">{error}</p>
        ) : (
          <>
            {/* Revenue and Top Product Cards */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1/2 flex-col bg-gradient px-4 py-2 rounded-sm">
                <p className="text-surface-200 text-[10px]">Revenue</p>
                <p className="text-surface-200 text-sm font-semibold">
                  <AnimatedCountUp amount={revenue} />
                </p>
                <div className="flex gap-1.5 mt-2">
                  {
                    <Image
                      src={revenueChangeImage}
                      width={6}
                      height={6}
                      alt="highlight-up"
                    />
                  }
                  <p
                    className={`text-[10px] ${
                      report?.revenue_change !== undefined &&
                      report.revenue_change < 0
                        ? 'text-destructive'
                        : 'text-success'
                    }`}
                  >
                    {report?.revenue_change ?? 0} %
                  </p>
                </div>
              </div>

              <div className="flex-1/2 bg-gradient px-4 py-2 rounded-sm">
                <p className="text-surface-200 text-[10px]">Top Product</p>
                <p className="text-surface-200 text-sm">{topProduct}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="space-y-5">
                <PendingOrders />
                <LowStockItems />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
