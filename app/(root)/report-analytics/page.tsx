import React from 'react';

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

      <SummaryTable />
    </section>
  );
};

export default ReportAnalytics;
