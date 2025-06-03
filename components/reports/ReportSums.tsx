import { recentOders } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import React from 'react';
import StatCard from '../ui/dashboard-cards/stat-card';
import Image from 'next/image';

interface ReportSumsProps {
  totalRevenue: number;
  lowStockCount: number;
  topSold: string;
}
const totalOrder = recentOders.length;
const ReportSums = ({
  totalRevenue,
  lowStockCount,
  topSold,
}: ReportSumsProps) => {
  return (
    <div className="flex flex-col w-full mt-3 gap-2">
      <div className="flex w-full gap-4 px-6 h-22">
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 rounded-sm">
          <p className="text-surface-200 text-[10px]">Total Orders</p>
          <p className="font-semibold text-surface-200 ">
            <span> {totalOrder} units </span>
          </p>
          <div className="flex gap-2 mt-3">
            <span className="text-red-600 font-bold">
              <Image src="/icon/red.svg" alt="" width={14} height={14} />
            </span>
            <span className="text-green-500 font-bold">
              <Image src="/icon/green.svg" alt="" width={14} height={14} />
            </span>
          </div>
        </div>
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 rounded-sm">
          <p className="text-surface-200 text-[10px]">Revenue</p>
          <p className="font-semibold text-surface-200 ">
            <span> {formatCurrency(totalRevenue)} </span>
          </p>
          <div className="flex gap-2 mt-3">
            <span className="text-red-600 font-bold">
              <Image src="/icon/red.svg" alt="" width={14} height={14} />
            </span>
            <span className="text-green-500 font-bold">
              <Image src="/icon/green.svg" alt="" width={14} height={14} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 px-6 h-22">
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 space-y-1 rounded-sm">
          <p className="text-surface-200 text-[10px]">Low Stock Items</p>
          <p className="font-semibold text-surface-200 ">
            <span> {lowStockCount} </span>
          </p>
        </div>
        <div className="flex flex-col px-3 w-full justify-start bg-gradient py-3 space-y-1 rounded-sm">
          <p className="text-surface-200 text-[10px]">Top Product</p>
          <p className="font-semibold text-surface-200 ">
            <span>{topSold}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportSums;
