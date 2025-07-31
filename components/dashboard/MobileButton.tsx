'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';

const MobileButtons = () => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleAddOrder = () => router.push('/orders/add-new-order');
  const handleAddNewProduct = () => router.push('/inventory/add-product');

  return (
    <div className="hidden max-md:flex flex-col items-end gap-3 fixed bottom-4 right-4 z-50">
      {showOptions && (
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleAddOrder}
            className="bg-darkblue hover:bg-lightblue text-surface-200 font-normal"
            aria-label="Add New Order"
          >
            Add New Order checking-
          </Button>
          <Button
            onClick={handleAddNewProduct}
            className="bg-darkblue hover:bg-lightblue text-surface-200 font-normal"
            variant="ghost"
            aria-label="Add New Product"
          >
            Add New Product ---
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowOptions(showOptions)}
        className="p-4 font-semibold bg-darkblue hover:bg-lightblue text-surface-200"
        aria-label={showOptions ? 'Hide action buttons' : 'Show action buttons'}
      >
        {showOptions ? (
          <Minus className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default MobileButtons;
