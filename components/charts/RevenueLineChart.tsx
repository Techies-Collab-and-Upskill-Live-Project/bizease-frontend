'use client';

import React from 'react';
import { Order } from '@/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Legend,
);

const RevenueLineChart = ({ orders }: { orders: Order[] }) => {
  const last5Days = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (4 - i));
    return d.toISOString().split('T')[0];
  });

  const dataByDate = last5Days.map((date) => {
    const total = orders
      .filter((order) => order?.order_date?.startsWith(date))
      .reduce((sum, order) => sum + (order?.total_price ?? 0), 0);
    return total;
  });

  const data = {
    labels: last5Days,
    datasets: [
      {
        label: 'Revenue (₦)',
        data: dataByDate,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Revenue Over Last 5 Days' },
    },
  };

  return (
    <div className="bg-surface-100 rounded w-full min-h-10">
      <Line options={options} data={data} />
    </div>
  );
};

export default RevenueLineChart;
