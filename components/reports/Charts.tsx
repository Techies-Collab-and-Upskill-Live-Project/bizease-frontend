import { reportSummary } from '@/constants';
import React from 'react';
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
  const colors = [
    'rgba(59, 130, 246, 0.6)',
    'rgba(16, 130, 246, 0.4)',
    'rgba(59, 130, 246, 0.6)',
    'rgba(59, 197, 200, 0.6)',
  ];

  const dynamicBarColors = reportSummary.map(
    (_, index) => colors[index % colors.length],
  );

  const lineChartData = {
    labels: ['May 1st', 'May 2nd', 'May 3rd', 'May 4th'],
    datasets: [
      {
        label: 'Sales',
        data: reportSummary.map((item) => item.productSold),
        borderColor: dynamicBarColors,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 1,
        tension: 0.5,
        pointRadius: 5,
      },
    ],
  };

  const barChartData = {
    labels: reportSummary.map((item) => item.Product),
    datasets: [
      {
        label: 'Products',
        data: reportSummary.map((item) => item.productSold),
        backgroundColor: dynamicBarColors,
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 25,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className=" w-full mx-auto px-7 mt-6">
        <h2 className="text-base font-semibold mb-4">Charts</h2>
        <div className="flex bg-surface-100  max-w-6xl mx-auto justify-center items-center gap-4 px-8">
          <CustomLegend label={'Order'} />
          <div className="flex-1 w-[100%] max-md:max-w-lg   bg-surface-100">
            <Line data={lineChartData} options={lineOptions} />
            <CustomLegend label={'Time'} />
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-8 mt-4">
        <div className="flex flex-col w-[100%] max-md:max-w-lg mx-auto justify-center max-w-6xl px-5 bg-surface-100">
          <Bar data={barChartData} options={lineOptions} />
          <CustomLegend label={'Product'} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
