'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { useReport } from '@/hooks/useReport';
import { Button } from '../ui/button';
import Link from 'next/link';

const SummaryTable = () => {
  const { report, loading, error } = useReport({ period: 'last-week' });

  const productSales = report?.product_sales_chart_data ?? [];

  console.log(productSales);
  console.log('report page', report);

  return (
    <div className="w-full min-h-36 px-4 lg:px-8 mt-6">
      <h2 className="text-sm text-surface-500 font-semibold mb-3">
        Recent Sales Summary
      </h2>
      {/* <Link
        href="/report-analytics/generate-reports"
        className="w-full sm:w-auto"
      >
        <Button className="w-full bg-darkblue hover:bg-lightblue">
          Export
        </Button>
      </Link> */}

      <div className="overflow-x-auto rounded-md border shadow-sm">
        {loading ? (
          <div className="text-center py-6 text-gray-500 font-medium text-sm">
            Loading report...
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-500 font-medium text-sm">
            Failed to load report.
          </div>
        ) : productSales.length > 0 ? (
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-darkblue">
              <tr className="text-[12px] text-surface-200">
                <th className="p-3 font-normal whitespace-nowrap">Productss</th>
                <th className="p-3 font-normal whitespace-nowrap">Unit Sold</th>
                <th className="p-3 font-normal whitespace-nowrap">Revenue</th>
                <th className="p-3 font-normal whitespace-nowrap">
                  Stock Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-50 text-left">
              {productSales.map((item, index) => (
                <tr key={index} className="text-[11px] text-gray-800">
                  <td className="p-3 font-medium whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="p-3">{item?.quantity_sold}</td>
                  <td className="p-3">{formatCurrency(item?.revenue)}</td>
                  <td className="p-3">{item?.stock_status ?? 'In Stock'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500 font-medium text-sm">
            No sales data from recent orders.
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryTable;
