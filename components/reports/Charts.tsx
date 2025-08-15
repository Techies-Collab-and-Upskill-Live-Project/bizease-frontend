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

import CustomLegend from './CustomLegend';
import { useReport } from '@/hooks/useReport';
import { format } from 'date-fns';
import { Skeleton2 } from '../ui/skeleton';

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
  const { report, loading, error } = useReport({ period: 'last-week' });

  if (loading)
    return <p className="text-center text-muted">Loading charts...</p>;
  if (error) return <p className="text-center text-destructive">{error}</p>;
  if (!report) return <p className="text-center text-muted">No report data.</p>;

  const lineChartData = {
    labels: report.date_revenue_chart_data.map((d) =>
      format(new Date(d.date), 'EEE'),
    ),
    datasets: [
      {
        label: 'Revenue',
        data: report.date_revenue_chart_data.map((d) => d.revenue),
        borderColor: '#2E9185',
        backgroundColor: '#2E9185',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const colors = ['#2E9185', '#2E9185', '#2E9185', '#2E9185', '#2E9185'];

  const barChartData = {
    labels: report.product_sales_chart_data.map((p) => p.name),
    datasets: [
      {
        label: 'Units Sold',
        data: report.product_sales_chart_data.map((p) => p.quantity_sold),
        backgroundColor: colors.slice(
          0,
          report.product_sales_chart_data.length,
        ),
        borderRadius: 6,
        borderSkipped: false,
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

  if (loading) return <Skeleton2 />;

  return (
    <div className="w-full max-w-[100vw] px-4 sm:px-6 lg:px-8 mt-6 space-y-4">
      {/* Line Chart */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-muted-foreground">
          Revenue Over Time
        </h2>
        <div className="bg-surface-100 rounded-xl shadow-sm p-6 overflow-hidden">
          <div className="w-full max-w-full h-[280px] md:h-[320px] relative">
            <div className="absolute top-30 -left-6 pr-4">
              <CustomLegend label="Revenue" />
            </div>
            <Line
              style={{ width: '90%', maxWidth: '90%' }}
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
          Top Products by Quantity Sold
        </h2>
        <div className="bg-surface-100 rounded-xl shadow-sm p-4 overflow-x-hidden">
          <div className="w-full h-[280px] md:h-[305px] relative">
            {report.product_sales_chart_data.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No product sales data available.
              </p>
            ) : (
              <Bar
                style={{ width: '90%', maxWidth: '90%' }}
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
