'use client';
import React, { useState } from 'react';
import { useSellerAnalytics } from '@/lib/react-query/hooks/useSellerAnalytics';
import Loading from '@/components/Loading';
import Footer from '@/components/seller/Footer';

// Import analytics components
import StatsCard from '@/components/seller/analytics/StatsCard';
import RevenueChart from '@/components/seller/analytics/RevenueChart';
import ProductCategoryChart from '@/components/seller/analytics/ProductCategoryChart';

const SellerDashboard = () => {
  const [timeRange, setTimeRange] = useState(30);
  const { stats, charts, isLoading } = useSellerAnalytics(timeRange);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between page-transition">
      <div className="md:p-10 p-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
              <p className="text-slate-400">Track your sales and inventory performance</p>
            </div>

            {/* Time Range Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange(7)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === 7
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange(30)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === 30
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange(90)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === 90
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={stats.totalRevenue}
            prefix="$"
            icon="💰"
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="📦"
          />
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon="🏷️"
          />
          <StatsCard
            title="Avg Order Value"
            value={stats.avgOrderValue}
            prefix="$"
            icon="📊"
          />
        </div>

        {/* Revenue Chart - Full Width */}
        <div className="mb-8">
          <RevenueChart data={charts.revenueOverTime} />
        </div>

        {/* Product Category Chart - Full Width */}
        <div className="mb-8">
          <ProductCategoryChart data={charts.productsByCategory} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
