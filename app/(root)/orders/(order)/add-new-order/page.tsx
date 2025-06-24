'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useOrderStore, useInventoryStore } from '@/lib/store';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';

const orderSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email'),
  orderDate: z.string().min(1, 'Order date is required'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Select a product'),
        quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
      }),
    )
    .min(1, 'Add at least one item'),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function AddOrderPage() {
  const router = useRouter();
  const addOrder = useOrderStore((s) => s.addOrder);
  const { inventory, fetchInventoryFromAPI, reduceStock } = useInventoryStore();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (inventory.length === 0) {
          await fetchInventoryFromAPI();
        }
      } catch (err) {
        toast.error(`Failed to load inventory ${err}`);
      } finally {
        setLoadingInventory(false);
      }
    };

    fetch();
  }, [inventory, fetchInventoryFromAPI]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ productId: '', quantity: 1 }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  const total = items.reduce((sum, item) => {
    const product = inventory.find((p) => String(p.id) === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const handlePreview = async () => {
    const valid = await trigger();
    if (!valid) {
      toast.error('Please complete all required fields.');
      return;
    }
    setPreviewOpen(true);
  };

  const onSubmit = async (data: OrderFormData) => {
    const newOrder = {
      id: uuidv4(),
      name: data.clientName,
      email: data.clientEmail,
      status: 'Pending' as const,
      total,
      lastUpdated: data.orderDate,
      date: new Date().toISOString(),
      products: data.items
        .map((item) => {
          const product = inventory.find(
            (p) => String(p.id) === item.productId,
          );
          if (!product) return null;
          return {
            productId: String(product.id),
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null),
    };

    newOrder.products.forEach((product) => {
      reduceStock(Number(product.productId), product.quantity);
    });

    addOrder(newOrder);

    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        {
          to_name: data.clientName,
          to_email: data.clientEmail,
          total,
          message: 'Your order has been placed successfully!',
        },
        'your_public_key',
      );
    } catch {
      toast.error('Order saved, but email failed.');
    }

    toast.success('Order added successfully!');
    router.push(`/orders/add-new-order-success/${newOrder.id}`);
  };

  if (loadingInventory) {
    return (
      <main className="flex items-center justify-center min-h-screen text-gray-500">
        Loading inventory...
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <section className="w-full max-w-lg space-y-6 mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/orders')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg text-darkblue md:text-lg font-semibold">
            Add New Order
          </h1>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Input placeholder="Client name" {...register('clientName')} />
          {errors.clientName && (
            <p className="text-sm text-red-500">{errors.clientName.message}</p>
          )}

          <Input placeholder="Client email" {...register('clientEmail')} />
          {errors.clientEmail && (
            <p className="text-sm text-red-500">{errors.clientEmail.message}</p>
          )}

          <div className="space-y-1">
            <Label>Items</Label>
            {fields.map((field, index) => {
              const selected = inventory.find(
                (p) => String(p.id) === watch(`items.${index}.productId`),
              );
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start text-darkblue"
                >
                  <select
                    {...register(`items.${index}.productId`)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select Product</option>
                    {inventory.map((product) => (
                      <option key={product.id} value={String(product.id)}>
                        {product.name} (₦{product.price}) — Stock:{' '}
                        {product.stock}
                      </option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    placeholder="Qty"
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    max={selected?.stock ?? 100}
                  />

                  <div className="text-sm py-2">
                    ₦{(selected?.price ?? 0) * items[index]?.quantity}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:bg-red-50 sm:col-span-3"
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              onClick={() => append({ productId: '', quantity: 1 })}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Add Item
            </Button>
          </div>

          <Input
            type="date"
            placeholder="Order date"
            {...register('orderDate')}
          />
          {errors.orderDate && (
            <p className="text-sm text-red-500">{errors.orderDate.message}</p>
          )}

          <div className="text-right font-medium">
            Total:{' '}
            <span className="text-darkblue">
              <AnimatedCountUp amount={total} />
            </span>
          </div>

          <Button
            type="button"
            onClick={handlePreview}
            disabled={!isValid}
            className="w-full bg-darkblue text-white hover:bg-blue-900"
          >
            Preview Order
          </Button>
        </form>
      </section>

      {/* PREVIEW DIALOG */}
      <Dialog open={previewOpen} onOpenChange={() => setPreviewOpen(false)}>
        <DialogContent>
          <DialogTitle>Confirm Order</DialogTitle>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {watch('clientName')}
            </p>
            <p>
              <strong>Email:</strong> {watch('clientEmail')}
            </p>
            <p>
              <strong>Date:</strong> {watch('orderDate')}
            </p>

            <strong>Items:</strong>
            <ul className="pl-5 list-disc">
              {items.map((item, i) => {
                const p = inventory.find(
                  (p) => String(p.id) === item.productId,
                );
                if (!p) return null;
                return (
                  <li key={i}>
                    {p.name} — {item.quantity} × ₦{p.price} = ₦
                    {(p.price * item.quantity).toFixed(2)}
                  </li>
                );
              })}
            </ul>

            <p>
              <strong>Total:</strong> <AnimatedCountUp amount={total} />
            </p>
          </div>

          <DialogFooter className="flex justify-center gap-10 mb-4">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Edit
            </Button>
            <Button
              className="text-surface-100 bg-darkblue p-4 cursor-pointer hover:bg-lightblue"
              onClick={handleSubmit(onSubmit)}
            >
              Confirm & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
