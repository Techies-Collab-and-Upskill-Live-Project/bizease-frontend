'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import InventoryComponent from '@/components/inventory/InventoryProducts';
import SearchProduct from '@/components/inventory/SearchProductMobile';
import TotalInventory from '@/components/inventory/TotalInventory';
import TopAvatar from '@/components/navigations/TopAvatar';

const Inventory = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddProduct = () => {
    router.push('/inventory/add-product');
  };

  return (
    <section className="w-full bg-gray-100">
      <div className="sticky top-0 z-50">
        <TopAvatar type="Inventory" />
      </div>

      <SearchProduct
        handleAddProduct={handleAddProduct}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex flex-col gap-2 w-full px-6 py-2">
        <h2 className="font-bold text-lg max-md:hidden">Inventory</h2>

        <TotalInventory />

        <InventoryComponent
          handleAddProduct={handleAddProduct}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </section>
  );
};

export default Inventory;
