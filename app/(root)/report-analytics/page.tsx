'use client';

import React, { useState } from 'react';

import { reportSummary } from '@/constants';

import TopAvatar from '@/components/navigations/TopAvatar';
import ReportSums from '@/components/reports/ReportSums';
import HeaderPeriodSelection from '@/components/reports/ReportPeriodSelection';
import SummaryTable from '@/components/reports/SummaryTable';
import Charts from '@/components/reports/Charts';

const handleExport = () => {
  const csvHeader = 'Product,Unit Sold,Revenue,Stock Status\n';
  const csvRows = reportSummary
    .map((item) =>
      [item.Product, item.productSold, item.revenue, item.stockStatus].join(
        ',',
      ),
    )
    .join('\n');

  const csvContent = csvHeader + csvRows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'report-summary.csv');
  link.click();
};

const ReportAnalytics = () => {
  const [filter, setFilter] = useState<string>('all');

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
    <section className="w-full flex flex-col pb-10 bg-gray-100">
      <TopAvatar type="Reports" />
      <HeaderPeriodSelection
        onExport={handleExport}
        filter={filter}
        onFilterChange={setFilter}
      />
      <ReportSums
        totalRevenue={totalRevenue}
        lowStockCount={lowStockCount}
        topSold={topSold.Product}
      />

      <div className="">
        <Charts />
      </div>

      <SummaryTable
        summary={reportSummary.map((item) => ({
          product: item.Product,
          unitSold: item.productSold,
          revenue: item.revenue,
          stockStatus: item.stockStatus,
        }))}
      />
    </section>
  );
};

export default ReportAnalytics;
