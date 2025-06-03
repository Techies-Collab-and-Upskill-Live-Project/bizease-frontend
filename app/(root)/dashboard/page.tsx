import TopAvatar from '@/components/navigations/TopAvatar';
import React from 'react';
import StatCard from '@/components/ui/dashboard-cards/stat-card';
import OrderCard from '@/components/ui/dashboard-cards/order-card';
import StockCard from '@/components/ui/dashboard-cards/stock-card';

const DashboardPage = () => (
  <div className="h-screen w-full">
    <TopAvatar type="Dashboard" />
    <section className="py-3 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <div className="text-lg font-semibold">Jessie's Tees</div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <button className="px-2 py-1 border border-blue-300 rounded w-full md:w-auto">
            Add New Order
          </button>
          <button className="px-2 py-1 border border-blue-300 rounded w-full md:w-auto">
            Add New Product
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <StatCard title="Revenue" value="#100,000" highlight="up" />
        <StatCard title="Top Product" value="Nike Sneakers" />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Pending Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <OrderCard
              key={i}
              orderId="123"
              customer="Frank Edward"
              amount="#5,000"
              date="April 25, 2025"
              status="Pending"
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Low Stock Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <StockCard
              key={i}
              name="Necklace"
              category="Accessories"
              price="#3,500"
              stock={{
                value: '5 units - Low Stock',
                status: 'low',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default DashboardPage;
