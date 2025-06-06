"use client";

import React, { useState } from "react";
import StatCard from "@/components/ui/dashboard-cards/stat-card";
import { recentOders } from "@/constants";
import TopAvatar from "@/components/navigations/TopAvatar";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Assuming 10 items per page based on the text

  // Get current orders
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = recentOders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalOrders = recentOders.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  // Handle page change
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className=" w-full ">
      <TopAvatar type="Orders" />

      <section className="py-3 px-6 ">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {/* Summary Cards */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-900 text-white rounded-xl p-6 flex items-center justify-around mb-6">
          <StatCard title="Total Orders" value="1,245" />
          <div className="border-l border-blue-300 h-12"></div>
          <StatCard title="Pending Orders" value="130" />
          <div className="border-l border-blue-300 h-12"></div>
          <StatCard title="Total Revenue" value="#5,766,900" />
        </div>

        {/* Search, Filter, and Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex-1 w-full md:w-auto">
            {/* Search Input Placeholder */}
            <input
              type="text"
              placeholder="Search Inventory..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Filter Dropdown Placeholder */}
            <select className="px-3 py-2 border rounded-md">
              <option>All Orders</option>
              <option>Pending</option>
              <option>Delivered</option>
            </select>
            {/* Add New Order Button Placeholder */}
            <button className="bg-[#0A0A4A] text-white px-4 py-2 rounded-md">
              Add New Order
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">View Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                    {order.total}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium">
                    <button className="bg-[#0A0A4A] text-white px-3 py-1 rounded text-xs">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>{`Showing ${indexOfFirstOrder + 1}-${Math.min(
            indexOfLastOrder,
            totalOrders
          )} of ${totalOrders} products`}</div>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md flex items-center gap-1 ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50 border-gray-300 text-gray-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              &lt; Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md flex items-center gap-1 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50 border-gray-300 text-gray-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
