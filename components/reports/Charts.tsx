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

import { useOrderStore } from '@/lib/store';
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
  const { orders } = useOrderStore();

  const periodLength = 5;
  const dateLabels = getLastNDates(periodLength, 'en-US', {
    weekday: 'short',
  });

  // Group orders by weekday
  const salesMap: Record<string, number> = {};
  for (const label of dateLabels) {
    salesMap[label] = 0;
  }

  orders.forEach((order) => {
    const date = new Date(order.date);
    const label = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (salesMap[label] !== undefined) {
      salesMap[label] += 1;
    }
  });

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
        data: topProducts.map(({ revenue }) => revenue),
        backgroundColor: topProducts.map((_, i) => colors[i % colors.length]),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const lineChartData = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Sales',
        data: dateLabels.map((label) => salesMap[label] || 0),
        borderColor: 'rgba(34,211,238,1)',
        backgroundColor: 'rgba(34,211,238,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
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
          callback(value: string | number) {
            return typeof value === 'number' ? value : value;
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
    <div className="w-full max-w-[100vw] px-4 sm:px-6 lg:px-8 mt-6 space-y-4">
      {/* Line Chart */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-muted-foreground">
          Sales Over Last 6 Days
        </h2>
        <div className="bg-surface-100 rounded-xl shadow-sm p-6 overflow-hidden">
          <div className="w-full max-w-full h-[280px] md:h-[320px] relative">
            <div className="absolute top-30 -left-6 pr-4">
              <CustomLegend label="Order" />
            </div>
            <Line
              style={{ width: '98%', maxWidth: '98%' }}
              data={lineChartData}
              options={chartOptions}
            />
            <div className="absolute -bottom-9 left-0 right-0 p-4">
              <CustomLegend label="Time" />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-muted-foreground">
          Top Products by Revenue
        </h2>
        <div className="bg-surface-100 rounded-xl shadow-sm p-4 overflow-x-hiden">
          <div className="w-full h-[280px] md:h-[320px] relative">
            {topProducts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No product data available.
              </p>
            ) : (
              <Bar
                style={{ width: '100%', maxWidth: '100%' }}
                data={barChartData}
                options={chartOptions}
              />
            )}
            <div className="absolute inset-0 bg-cyan-100 opacity-5 pointer-events-none" />
          </div>
          <div className="mt-2">
            <CustomLegend label="Product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
