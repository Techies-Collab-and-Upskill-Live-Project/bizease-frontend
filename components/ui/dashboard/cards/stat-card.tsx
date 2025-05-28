import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  highlight?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, highlight }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-xl p-6 flex-1 min-w-[220px]">
    <div className="text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
    {highlight && <div className="text-xs mt-2">{highlight}</div>}
  </div>
);

export default StatCard;
