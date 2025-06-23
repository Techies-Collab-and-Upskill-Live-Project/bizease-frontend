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

import AnimatedCountUp from '../animations/AnimatedCountUp';

interface AddOrderModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export default function AddOrderModal({
  onClose,
  isOpen = true,
}: AddOrderModalProps) {
  const inventory = useInventoryStore((state) => state.inventory);
  const updateProduct = useInventoryStore((state) => state.updateProduct);
  const addOrder = useOrderStore((state) => state.addOrder);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = inventory.find(({ id }) => id === selectedId);
  const total = product ? product.price * quantity : 0;

  const handleSubmit = () => {
    if (!product || !customer || quantity < 1 || quantity > product.stock)
      return;

    addOrder({
      id: uuidv4(),
      name: customer,
      email: '',
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

    updateProduct({ ...product, stock: product.stock - quantity });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-10 max-sm:p-5">
        <DialogHeader className="flex-center mb-4">
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Select onValueChange={(id) => setSelectedId(Number(id))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {inventory.map(({ id, stock, name }) => (
                <SelectItem
                  key={id}
                  value={id.toString()}
                  className="text-lightblue hover:text-darkblue"
                >
                  {name} - (Left: {stock})
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
            Total:
            <strong>
              <AnimatedCountUp amount={total} />
            </strong>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
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
            className="bg-darkblue hover:bg-lightblue cursor-pointer text-surface-100"
          >
            Place Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
