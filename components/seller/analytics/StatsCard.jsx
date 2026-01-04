import React from 'react';

const StatsCard = ({ title, value, icon, prefix = '' }) => {
  return (
    <div className="card-dark p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-100">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        {icon && (
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-3 rounded-lg">
            <span className="text-2xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
