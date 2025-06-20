import React from "react";

import TopAvatar from "@/components/navigations/TopAvatar";
import ReportSums from "@/components/reports/ReportSums";
import HeaderPeriodSelection from "@/components/reports/ReportPeriodSelection";
import SummaryTable from "@/components/reports/SummaryTable";
import Charts from "@/components/reports/Charts";

const ReportAnalytics = () => {
  return (
    <div className="w-full pt-14 bg-red-300 ">
      <div className=" w-full fixed top-0 left-0 z-50 ">
        <TopAvatar type="Reports" />
      </div>
      <HeaderPeriodSelection />
      <ReportSums />

      <div>
        <Charts />
      </div>

      <SummaryTable />
    </div>
  );
};

export default ReportAnalytics;
