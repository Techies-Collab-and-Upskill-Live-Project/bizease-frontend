import React from 'react';

import { reportSummary } from '@/constants';

import TopAvatar from '@/components/navigations/TopAvatar';
import ReportSums from '@/components/reports/ReportSums';
import HeaderPeriodSelection from '@/components/reports/ReportPeriodSelection';
import SummaryTable from '@/components/reports/SummaryTable';
import Charts from '@/components/reports/Charts';

const ReportAnalytics = () => {
  return (
    <section className="w-full flex flex-col pb-10 bg-gray-100">
      <TopAvatar type="Reports" />
      <HeaderPeriodSelection />
      <ReportSums />

      <div>
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
