'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useReport } from '@/hooks/useReport';
import { ReportQuery } from '@/lib/services/report';
import { formatCurrency } from '@/lib/utils';
import { useOrder } from '@/hooks/useOrder';
import Link from 'next/link';
import { Button } from '../ui/button';
import ReportSumsSkeleton from './SkeletalLoad';

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
  const [period, setPeriod] = useState<ReportQuery['period']>('last-week');
  const { report, loading } = useReport({ period });
  const { orders } = useOrder();

  const totalRevenue = useMemo(() => {
    if (!report?.date_revenue_chart_data) return 0;
    return report.date_revenue_chart_data.reduce(
      (sum, entry) => sum + Number(entry.revenue || 0),
      0,
    );
  }, [report?.date_revenue_chart_data]);

  const revenueChange = report?.revenue_change;

  if (loading) return <ReportSumsSkeleton />;

  return (
    <section className="w-full mx-auto px-4 lg:px-8 mt-1">
      <div className="flex justify-between max-lg:justify-end">
        <h1 className="text-lg font-bold text-darkblue hidden lg:block">
          Report & Analytics
        </h1>
        <div className="flex gap-2">
          <Link
            href="/report-analytics/generate-reports"
            className="w-full sm:w-auto"
          >
            <Button className="w-full bg-darkblue hover:bg-lightblue">
              Export
            </Button>
          </Link>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as ReportQuery['period'])}
            className=" mb-4 border border-darkblue p-2 rounded-md text-sm text-darkblue"
          >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-fr">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={revenueChange}
        />
        <MetricCard label="Total Orders" value={orders.length} />
        <MetricCard
          label="Total Stock Value"
          value={formatCurrency(Number(report?.total_stock_value ?? 0))}
        />
        <MetricCard
          label="Total Products"
          value={report?.total_products ?? 0}
        />
        <MetricCard
          label="Low Stock Items"
          value={report?.low_stock_items ?? 0}
        />
        <MetricCard
          label="Top Selling Product"
          value={report?.top_selling_product ?? 'N/A'}
        />
        <MetricCard
          label="Pending Orders"
          value={report?.pending_orders ?? 0}
        />
      </div>
    </section>
  );
};

export default ReportSums;
