import React from "react";

interface StockCardProps {
  name: string;
  category: string;
  price: string;
  stock: string;
}

const StockCard: React.FC<StockCardProps> = ({
  name,
  category,
  price,
  stock,
}) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col min-w-[200px]">
    <div className="font-semibold">{name}</div>
    <div className="text-xs text-gray-500">{category}</div>
    <div className="mt-2">
      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
        {stock}
      </span>
    </div>
    <div className="mt-2 font-bold">{price}</div>
    <button className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs">
      Restock
    </button>
  </div>
);

export default StockCard;
