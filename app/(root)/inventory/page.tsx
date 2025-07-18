'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import InventoryComponent from '@/components/inventory/InventoryProducts';
import TotalInventory from '@/components/inventory/TotalInventory';
import TopAvatar from '@/components/navigations/TopAvatar';
import { InventoryHeaderActions } from '@/components/inventory/InnventorySearchAndFilter';
import { InventoryHeaderActionsMobile } from '@/components/inventory/inventorySearchAndFilterMobile';
import { useInventoryStore } from '@/lib/store';

const Inventory = () => {
  const inventorySearch = useInventoryStore((state) => state.searchTerm);
  const setInventorySearch = useInventoryStore((state) => state.setSearchTerm);
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

      <InventoryHeaderActionsMobile
        searchTerm={inventorySearch}
        setSearchTerm={setInventorySearch}
        onResetPage={() => setCurrentPage(1)}
        filterValue={filter}
        setFilter={setFilter}
      />

      <div className="flex flex-col gap-2 w-full px-6 py-2">
        <h2 className="font-bold text-lg max-lg:hidden">Inventory</h2>

        <TotalInventory />

        <InventoryHeaderActions
          searchTerm={inventorySearch}
          setSearchTerm={setInventorySearch}
          onResetPage={() => setCurrentPage(1)}
          filterValue={filter}
          setFilter={setFilter}
        />

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
