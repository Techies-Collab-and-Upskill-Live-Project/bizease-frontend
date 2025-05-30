import InventoryComponent from '@/components/inventory/InventoryProducts';
import TotalInventory from '@/components/inventory/TotalInventory';
import TopAvatar from '@/components/navigations/TopAvatar';

const Inventory = () => {
  return (
    <section className="h-screen w-full bg-gray-100">
      <TopAvatar type="Inventory" />
      <div className="flex flex-col gap-2 min-h-screen w-full px-6 py-2">
        <h2 className="font-bold text-lg max-md:hidden">Inventory</h2>
        <TotalInventory />
        <InventoryComponent />
      </div>
    </section>
  );
};

export default Inventory;
