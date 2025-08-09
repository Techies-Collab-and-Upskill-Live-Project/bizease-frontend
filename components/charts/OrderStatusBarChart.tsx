'use client';

import React from 'react';
import { Order } from '@/types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const OrderStatusBarChart = ({ orders }: { orders: Order[] }) => {
  const statusCounts: Record<string, number> = {};
  orders.forEach((order) => {
    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
  });

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Orders by Status',
        data: Object.values(statusCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Orders by Status' },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar options={options} data={data} />
    </div>
  );
};

export default OrderStatusBarChart;
