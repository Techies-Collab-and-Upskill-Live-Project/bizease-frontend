import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface SummaryItem {
  product: string;
  unitSold: number;
  revenue: number;
  stockStatus: string;
}

interface SummaryTableProps {
  summary: SummaryItem[];
}

const SummaryTable = ({ summary }: SummaryTableProps) => (
  <div className="w-full mt-6 px-6">
    <h2 className="text-sm text-surface-500 font-semibold mb-2">Summary</h2>
    <div className="overflow-x-auto rounded-md shadow-md border">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-darkblue">
          <tr className="text-[12px] text-surface-200">
            <th className="p-3 font-normal">Product</th>
            <th className="p-3 font-normal">Unit Sold</th>
            <th className="p-3 font-normal">Revenue</th>
            <th className="p-3 font-normal">Stock Status</th>
          </tr>
        </thead>
        <tbody className="bg-blue-100 text-left">
          {summary.map((item, index) => (
            <tr key={index} className="text-[10px]">
              <td className="p-3 font-medium text-left">{item.product}</td>
              <td className="p-3">{item.unitSold}</td>
              <td className="p-3">{formatCurrency(item.revenue)}</td>
              <td className="p-3">{item.stockStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SummaryTable;
