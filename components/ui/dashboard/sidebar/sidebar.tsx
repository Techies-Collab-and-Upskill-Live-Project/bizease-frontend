import React from "react";
import Image from "next/image";

const Sidebar: React.FC = () => (
  <aside className="w-64 h-screen bg-[#0A0A4A] text-white flex flex-col">
    <div className="p-6 flex items-center space-x-2">
      <Image src="/logo.png" alt="BizEase Logo" width={32} height={32} />
      <span className="text-xl font-bold">BizEase</span>
    </div>
    <div className="p-4 bg-[#1A1A6A] rounded-lg mx-4 mb-4 flex items-center space-x-3">
      <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
        <span className="text-blue-900">JT</span>
      </div>
      <div>
        <div className="font-semibold">Jessie's Tees</div>
        <div className="text-xs text-blue-200">Premium Plan</div>
      </div>
    </div>
    <nav className="flex-1 px-4 space-y-2">
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded bg-blue-800 font-semibold"
      >
        <Image
          src="/icon/home.svg"
          alt="Dashboard"
          width={20}
          height={20}
          className="mr-3 text-white"
        />
        Dashboard
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded hover:bg-blue-700"
      >
        <Image
          src="/icon/cart.svg"
          alt="Orders"
          width={20}
          height={20}
          className="mr-3 text-white"
        />
        Orders
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded hover:bg-blue-700"
      >
        <Image
          src="/icon/inventory.svg"
          alt="Inventory"
          width={20}
          height={20}
          className="mr-3 text-white"
        />
        Inventory
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded hover:bg-blue-700"
      >
        <Image
          src="/icon/report.svg"
          alt="Reports"
          width={20}
          height={20}
          className="mr-3 text-white"
        />
        Reports
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded hover:bg-blue-700"
      >
        <Image
          src="/icon/edit.svg"
          alt="Settings"
          width={20}
          height={20}
          className="mr-3 text-white"
        />
        Settings
      </a>
    </nav>
  </aside>
);

export default Sidebar;
