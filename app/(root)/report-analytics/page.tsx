import React from 'react';

import TopAvatar from '@/components/navigations/TopAvatar';
import ReportSums from '@/components/reports/ReportSums';
import HeaderPeriodSelection from '@/components/reports/ReportPeriodSelection';
import SummaryTable from '@/components/reports/SummaryTable';
import Charts from '@/components/reports/Charts';

const ReportAnalytics = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 pt-20 px-4 md:px-8 lg:px-12">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-surface-100 shadow-md">
        <TopAvatar type="Reports" />
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto space-y-8 mt-6">
        <HeaderPeriodSelection />
        <div className="overflow-x-auto">
          <ReportSums />
          <Charts />
        </div>
        <div className="overflow-x-auto">
          <SummaryTable />
        </div>
      </div>
    </section>
  );
};

export default ReportAnalytics;
