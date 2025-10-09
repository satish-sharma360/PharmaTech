import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className={`bg-gradient-to-br ${color} text-white p-6 rounded-lg shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-opacity-80 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          {subtitle && (
            <p className="text-white text-opacity-70 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && <Icon size={40} className="text-white text-opacity-30" />}
      </div>
    </div>
  );
};

export default StatsCard;