import React from "react";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: string;
  highlight?: "up" | "down";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, highlight }) => (
  <div className="bg-gradient-to-b from-blue-500 to-blue-900 text-white rounded-xl p-6 flex-1 min-w-[220px]">
    <div className="text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
    {highlight && (
      <div className="text-xs mt-2 flex gap-3">
        <Image
          src="/arrow-down.png"
          alt="down arrow"
          width={12}
          height={12}
          className="object-contain"
        />
        <Image
          src="/arrow-up.png"
          alt="up arrow"
          width={12}
          height={12}
          className="object-contain"
        />
      </div>
    )}
  </div>
);

export default StatCard;
