import React from 'react';
import Image from 'next/image';

import { recentOders, reportSummary } from '@/constants';
import { formatCurrency } from '@/lib/utils';

const ReportSums = () => {
  const totalOrder = recentOders.length;

  const topSold = reportSummary.reduce((prev, curr) =>
    curr.productSold > prev.productSold ? curr : prev,
  );

  const totalRevenue = reportSummary.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const lowStockCount = reportSummary.filter(
    (item) => item.stockStatus === 'Low Stock',
  ).length;

  return (
    <div className="flex flex-col w-full mt-3 gap-2">
      <div className="flex w-full gap-4 px-6 h-20">
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 rounded-sm">
          <p className="text-surface-200 text-[10px]">Total Revenue</p>
          <p className="font-semibold text-surface-200 ">
            <span> {formatCurrency(totalRevenue)} </span>
          </p>
          <div className="flex gap-1.5 mt-2">
            <Image
              src={'./icon/green.svg'}
              width={6}
              height={6}
              alt="highlight-up"
            />
            <p className="text-success text-[10px]">6.93%</p>
          </div>
        </div>

        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 rounded-sm">
          <p className="text-surface-200 text-[10px]">Total Orders</p>
          <p className="font-semibold text-surface-200 ">{totalOrder}</p>
        </div>
      </div>

      <div className="flex w-full gap-4 px-6 h-20">
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-1 space-y-1 rounded-sm">
          <p className="text-surface-200 text-[10px]">Total Stock Value</p>
          <p className="font-semibold text-surface-200 ">
            <span>{formatCurrency(8000000)}</span>
          </p>
          <div className="flex gap-1.5 mt-2">
            <Image
              src={'./icon/green.svg'}
              width={6}
              height={6}
              alt="highlight-up"
            />
            <p className="text-success text-[10px]">30%</p>
          </div>
        </div>
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-1 space-y-1 rounded-sm">
          <p className="text-surface-200 text-[10px]">Total Products</p>
          <p className="font-semibold text-surface-200 ">500</p>
        </div>
      </div>

      <div className="flex w-full gap-4 px-6 h-20 ">
        <div className="flex-1/2 flex-col bg-gradient px-4 py-2 rounded-sm">
          <p className="text-surface-200 text-[10px]">Low Stock Items</p>
          <p className="text-surface-200 text-sm font-semibold">
            {lowStockCount}
          </p>
        </div>

        <div className="flex-1/2 flex-col bg-gradient px-4 py-2 rounded-sm">
          <p className="text-surface-200 text-[10px]">Top Selling Product</p>
          <p className="text-surface-200 text-sm font-semibold">
            <span>{topSold.Product}</span>
          </p>
        </div>
      </div>
      <div className="flex w-1/2 gap-4 pl-6 pr-2 h-20">
        <div className="flex-1/2 flex-col bg-gradient px-4 py-2 rounded-sm">
          <p className="text-surface-200 text-[10px]">Pendind Orders</p>
          <p className="text-surface-200 text-sm font-semibold">130</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSums;
