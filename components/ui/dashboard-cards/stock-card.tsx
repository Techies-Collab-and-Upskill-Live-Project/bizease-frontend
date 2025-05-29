import React from "react";
import Image from "next/image";

interface StockCardProps {
  name: string;
  category: string;
  price: string;
  stock: {
    value: string;
    status: "low" | "normal" | "high";
  };
}

const StockCard: React.FC<StockCardProps> = ({
  name,
  category,
  price,
  stock,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-orange-500";
      case "normal":
        return "bg-green-500";
      case "high":
        return "bg-blue-500";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-4 flex flex-col min-w-[200px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-shadow duration-200">
      <div className="font-semibold">{name}</div>
      <div className="text-xs text-gray-500">{category}</div>
      <div className="mt-2">
        <span className="inline-flex text-xs text-[rgba(33, 33, 33, 1)] bg-[rgba(255,171,0,1)] px-2 py-1 rounded-full items-center gap-2">
          <Image src="/orange-dot.png" alt="orange-dot" width={8} height={8} />
          {stock.value}
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-[rgba(33, 33, 33, 1)">{price}</span>
        <button className="bg-[#0A0A4A] text-white px-3 py-1 rounded text-xs">
          Restock
        </button>
      </div>
    </div>
  );
};

export default StockCard;
