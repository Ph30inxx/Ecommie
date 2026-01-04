import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  'Order Placed': '#3b82f6',
  'Pending': '#eab308',
  'Completed': '#22c55e',
  'Cancelled': '#ef4444',
  'Processing': '#06b6d4',
  'Shipped': '#8b5cf6',
  'Delivered': '#10b981',
  'Unknown': '#64748b'
};

const OrderStatusChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card-dark p-6 rounded-xl border border-slate-700 h-80 flex items-center justify-center">
        <p className="text-slate-400">No order data available</p>
      </div>
    );
  }

  const getColor = (status) => STATUS_COLORS[status] || STATUS_COLORS['Unknown'];

  return (
    <div className="card-dark p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Orders by Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusChart;
