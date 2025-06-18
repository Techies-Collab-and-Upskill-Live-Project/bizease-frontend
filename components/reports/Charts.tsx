'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { useReportStore, useOrderStore } from '@/lib/store';
import CustomLegend from './CustomLegend';
import { getLastNDates } from '@/lib/utils';
import { computeTopProductRevenues } from '@/lib/revenue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

const Charts = () => {
  const { period } = useReportStore();
  const { orders } = useOrderStore();

  const periodLength = parseInt(period.replace(/\D/g, ''), 10) || 5;
  const dateLabels = getLastNDates(periodLength);

  // Get top 5 products by revenue
  const topProducts = computeTopProductRevenues(orders, 5);

  const colors = [
    'rgba(34,211,238,0.7)',
    'rgba(34,211,238,0.5)',
    'rgba(34,211,238,0.3)',
    'rgba(34,211,238,0.6)',
    'rgba(34,211,238,0.4)',
  ];

  const barChartData = {
    labels: topProducts.map(({ name }) => name),
    datasets: [
      {
        label: 'Revenue',
        data: topProducts.map((revenue) => revenue),
        backgroundColor: topProducts.map((_, i) => colors[i % colors.length]),
        borderRadius: 2,
      },
    ],
  };

  const lineChartData = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Sales',
        data: dateLabels.map(() => Math.floor(Math.random() * 100)), // Replace with actual per-day sales
        borderColor: 'rgba(34,211,238,1)',
        backgroundColor: 'rgba(34,211,238,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          callback(tickValue: string | number) {
            if (typeof tickValue === 'number') {
              return `₦${tickValue.toLocaleString()}`;
            }
            return tickValue;
          },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <div className="w-full px-7 mt-6">
        <h2 className="text-base font-semibold mb-4">Charts</h2>
        <div className="flex flex-col md:flex-row bg-surface-100 max-w-6xl mx-auto justify-center items-center gap-4 px-6">
          <CustomLegend label="Order" />
          <div className="flex-1 w-full max-md:max-w-lg pr-8 py-6">
            <div className="h-72">
              <Line data={lineChartData} options={chartOptions} />
            </div>
            <CustomLegend label="Time" />
          </div>
        </div>
      </div>

      <div className="w-full px-8 mt-4">
        <div className="flex flex-col w-full max-md:max-w-lg py-6 mx-auto justify-center max-w-6xl px-5 bg-surface-100">
          <div className="h-72 relative">
            {topProducts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No product data available.
              </p>
            ) : (
              <Bar data={barChartData} options={chartOptions} />
            )}
            <div className="absolute inset-0 bg-cyan-100 opacity-5 pointer-events-none" />
          </div>
          <CustomLegend label="Product" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
