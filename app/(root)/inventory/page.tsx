import InventoryComponent from '@/components/inventory/InventoryProducts';
import TotalInventory from '@/components/inventory/TotalInventory';
import TopAvatar from '@/components/navigations/TopAvatar';

const Inventory = () => {
  return (
    <section className="w-full bg-gray-100">
      <div className="sticky top-0 z-50">
        <TopAvatar type="Inventory" />
      </div>

      <div className="flex flex-col gap-2 w-full px-6 py-2">
        <h2 className="font-bold text-lg max-lg:hidden">Inventory</h2>

        <div className="max-lg:mt-20">
          <TotalInventory />
        </div>

        <InventoryComponent />
      </div>
    </section>
  );
};

export default Inventory;
