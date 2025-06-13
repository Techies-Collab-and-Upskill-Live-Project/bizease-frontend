'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { useInventoryStore, useOrderStore } from '@/lib/store';
import type { Order, OrderProduct } from '@/types';

const SummaryTable = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const orders = useOrderStore((state) => state.orders);

  //  Sort and select 5 most recent orders
  const recentOrders: Order[] = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  //  Compute sold units from recent orders only
  const soldUnitsMap = recentOrders.reduce((acc, order) => {
    const products: OrderProduct[] = order.products ?? [];

    for (const { productId, quantity } of products) {
      if (productId && typeof quantity === 'number') {
        acc[productId] = (acc[productId] || 0) + quantity;
      }
    }

    return acc;
  }, {} as Record<string, number>);

  //  Generate inventory summary for displayed products
  const summary = inventory
    .filter((product) => soldUnitsMap[product.id]) // Only show products from recent orders
    .map(({ id, price, stock, name, lowStockThreshold }) => {
      const sold = soldUnitsMap[id] || 0;
      const revenue = sold * price;

      let stockStatus = 'In Stock';
      if (stock === 0) {
        stockStatus = 'Zero Stock';
      } else if (stock <= (lowStockThreshold ?? 5)) {
        stockStatus = 'Low Stock';
      }

      return {
        product: name,
        unitSold: sold,
        revenue,
        stockStatus,
      };
    });

  return (
    <div className="w-full mt-6 px-6">
      <h2 className="text-sm text-surface-500 font-semibold mb-2">
        Recent Sales Summary
      </h2>
      <div className="overflow-x-auto rounded-md shadow-md border">
        {summary.length > 0 ? (
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
                  <td className="p-3 font-medium">{item.product}</td>
                  <td className="p-3">{item.unitSold}</td>
                  <td className="p-3">{formatCurrency(item.revenue)}</td>
                  <td className="p-3">{item.stockStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500 font-semibold">
            No sales data from recent orders.
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryTable;
