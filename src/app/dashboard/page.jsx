"use client";
import { useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const initialStats = {
  revenue: 256000,
  transactions: 850,
  orders: { pending: 30, shipped: 250, delivered: 500, canceled: 70 },
  users: { total: 1200, new: 180, active: 950 },
};

export default function AdminReportsPage() {
  const [stats, setStats] = useState(initialStats);
  const [filter, setFilter] = useState("Monthly");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border rounded-md"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Metrics Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-5 rounded-lg shadow-md flex flex-col items-center">
          <FaDollarSign className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">BDT {stats.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg shadow-md flex flex-col items-center">
          <FaShoppingCart className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Total Transactions</h2>
          <p className="text-2xl font-bold">{stats.transactions.toLocaleString()}</p>
        </div>
        <div className="bg-purple-500 text-white p-5 rounded-lg shadow-md flex flex-col items-center">
          <FaUsers className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold">{stats.users.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Order Analytics */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold">Order Overview</h3>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: stats.orders.pending, label: "Pending" },
                { id: 1, value: stats.orders.shipped, label: "Shipped" },
                { id: 2, value: stats.orders.delivered, label: "Delivered" },
                { id: 3, value: stats.orders.canceled, label: "Canceled" },
              ],
            },
          ]}
          width={600}
          height={300}
        />
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Revenue Breakdown</h3>
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Electronics", "Fashion", "Gaming", "Home"] }]}
          series={[{ data: [45000, 32000, 60000, 25000] }]}
          width={600}
          height={300}
        />
      </div>
    </div>
  );
}
