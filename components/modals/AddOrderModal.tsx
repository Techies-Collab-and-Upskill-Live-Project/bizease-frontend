'use client';

import { useState } from 'react';
import { useInventoryStore, useOrderStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';

import { formatCurrency } from '@/lib/utils';

interface Props {
  onClose: () => void;
}

export default function AddOrderModal({ onClose }: Props) {
  const { inventory, updateProduct } = useInventoryStore();
  const { addOrder } = useOrderStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = inventory.find(({ id }) => id === selectedId);
  const total = product ? product.price * quantity : 0;

  const handleSubmit = () => {
    if (!product || !customer || quantity < 1 || quantity > product.stock)
      return;

    // Create order with product details
    addOrder({
      id: uuidv4(),
      name: customer,
      total,
      date: new Date().toISOString(),
      status: 'Pending',
      lastUpdated: new Date().toISOString(),
      products: [
        {
          productId: product.id.toString(),
          productName: product.name,
          quantity,
          price: product.price,
        },
      ],
    });

    // Reduce stock
    updateProduct({ ...product, stock: product.stock - quantity });

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="p-10 max-sm:p-5">
        <DialogHeader className="flex-center mb-4">
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Select onValueChange={(val) => setSelectedId(Number(val))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {inventory.map(({ id, stock, name }) => (
                <SelectItem
                  className="text-lightblue hover:text-darkblue"
                  key={id}
                  value={id.toString()}
                >
                  {name} - (product left in inventory is {stock})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Customer name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <Input
            type="number"
            min={1}
            max={product?.stock ?? 100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
          />

          <div className="text-darkblue text-sm">
            Total: <strong>{formatCurrency(total)}</strong>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !product ||
              !customer ||
              quantity < 1 ||
              quantity > (product?.stock ?? 0)
            }
            className="bg-darkblue hover:bg-lightblue text-surface-100"
          >
            Place Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
