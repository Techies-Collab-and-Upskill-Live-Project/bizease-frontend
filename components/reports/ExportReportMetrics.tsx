'use client';

import React, { useMemo, useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import Image from 'next/image';

import RevenueLineChart from '../charts/RevenueLineChart';
import ProductSalesPieChart from '../charts/ProductSalesPieChart';
import { useOrder } from '@/hooks/useOrder';
import { useReport } from '@/hooks/useReport';
import { Button } from '../ui/button';

const getPercentageChange = (current: number, previous = 100): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export default function ReportExportAnalytics() {
  const [period] = useState<
    'last-week' | 'last-month' | 'last-6-months' | 'last-year'
  >('last-week');

  const { report } = useReport({ period });
  const { orders } = useOrder();
  const previewRef = React.useRef<HTMLDivElement>(null);

  // Metrics
  const totalOrders = orders.length;
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total_price ?? 0), 0),
    [orders],
  );
  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === 'Delivered'),
    [orders],
  );
  const repeatPurchaseRate = useMemo(
    () => Math.floor((completedOrders.length / (totalOrders || 1)) * 100),
    [completedOrders.length, totalOrders],
  );
  const conversionRate = useMemo(
    () => getPercentageChange(completedOrders.length),
    [completedOrders.length],
  );
  const averageItems = useMemo(
    () =>
      totalOrders > 0
        ? (
            orders.reduce((sum, o) => sum + o.ordered_products.length, 0) /
            totalOrders
          ).toFixed(1)
        : '0.0',
    [orders, totalOrders],
  );
  const bestSellingProduct = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((order) =>
      order.ordered_products.forEach((p) => {
        counts[p.name] = (counts[p.name] || 0) + p.quantity;
      }),
    );
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : 'N/A';
  }, [orders]);

  const handleDownload = async () => {
    const element = previewRef.current;
    if (!element) return;

    // Ensure charts and async images are fully rendered
    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    const data = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
    pdf.save(`sales-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <section
      id="report-preview"
      ref={previewRef}
      className="w-full max-w-5xl mx-auto space-y-4 rounded-lg overflow-x-auto overflow-y-auto max-h-[95vh] bg-white p-4"
    >
      {/* Header */}
      <header className="w-full p-3 bg-gray-100 rounded-md space-y-1">
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex gap-2 items-center">
            <Image src="/icon/logo-2.png" width={24} height={24} alt="Logo" />
            <h2 className="font-semibold text-gray-500">BizEase</h2>
          </div>
          <div className="text-right text-xs text-gray-400 leading-tight">
            <p>Report ID: {new Date().toISOString().slice(0, 10)}</p>
            <p>
              Generated: {new Date().toLocaleDateString()} at{' '}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-500 text-xs">
            My Sales Report
          </h3>
          <div className="px-2 py-1 flex items-center gap-1 rounded-full bg-surface-100">
            <Calendar className="w-3 h-3 text-gray-500" />
            <span className="text-gray-500 text-[10px]">Last 30 Days</span>
          </div>
        </div>
        <p className="text-gray-400 text-[10px]">
          A detailed analysis of your business sales performance.
        </p>
      </header>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-2">
        {/* Left */}
        <div className="flex flex-col min-h-full flex-1 gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <StatBox
              label="Total Revenue"
              value={`₦${totalRevenue.toLocaleString()}`}
            />
            <StatBox label="Total Orders Processed" value={totalOrders} />
            <StatBox label="Best Selling Product" value={bestSellingProduct} />
            <StatBox
              label="Conversion Rate"
              value={`${conversionRate.toFixed(1)}%`}
            />
          </div>
          <RevenueLineChart orders={orders} />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <div className="rounded-xl border border-gray-200 p-3">
            <SummaryRow
              label="Total Products Sold"
              value={completedOrders.length}
            />
            <SummaryRow label="Average Items per Order" value={averageItems} />
            <SummaryRow
              label="Repeat Purchase Rate"
              value={`${repeatPurchaseRate}%`}
            />
          </div>
          <div className="rounded-xl shadow-md p-4 bg-gray-100">
            <ProductSalesPieChart orders={orders} />
          </div>

          <div className="flex w-full flex-col items-center justify-center p-4 text-gray-400 gap-2">
            <div className="flex justify-center items-center gap-4">
              <StatusBox
                count={report?.pending_orders ?? 0}
                label="Pending"
                barColor="bg-yellow-400"
              />
              <StatusBox
                count={completedOrders.length}
                label="Delivered"
                barColor="bg-green-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-3">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-1 text-xs bg-blue-500 text-surface-100 hover:bg-blue-600"
        >
          <Download className="w-3 h-3" />
          Download Report
        </Button>
      </div>
    </section>
  );
}

const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-xl shadow-md px-2 py-3 text-center flex flex-col items-center justify-center bg-gray-100">
    <p className="text-gray-500 text-[10px] mb-1">{label}</p>
    <p className="text-blue-900 text-lg font-semibold">{value}</p>
  </div>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="mb-2">
    <p className="text-gray-400 text-[9px]">{label}</p>
    <span className="text-[9px] font-medium">{value}</span>
    <hr className="bg-gray-300 h-px border-none mt-1" />
  </div>
);

const StatusBox = ({
  count,
  label,
  barColor,
}: {
  count: string | number;
  label: string;
  barColor: string;
}) => (
  <div className="flex flex-col items-center justify-center">
    <div className="text-[9px] text-center">{count}</div>
    <div className="text-[9px]">{label}</div>
    <div className={`h-1 w-10 rounded-lg ${barColor}`} />
  </div>
);
