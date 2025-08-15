'use client';

import React from 'react';
import { Order } from '@/types';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductSalesPieChart = ({ orders }: { orders: Order[] }) => {
  const productCounts: Record<string, number> = {};

  orders.forEach((order) => {
    order.ordered_products.forEach((item) => {
      productCounts[item.name] =
        (productCounts[item.name] || 0) + item.quantity;
    });
  });

  const labels = Object.keys(productCounts);
  const values = Object.values(productCounts);

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity Sold',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#66BB6A',
          '#EF5350',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Pie data={data} />
    </div>
  );
};

export default ProductSalesPieChart;
