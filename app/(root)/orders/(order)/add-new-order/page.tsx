'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
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
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';
import { useOrder } from '@/hooks/useOrder';
import { useInventory } from '@/hooks/useInventory';

const orderSchema = z.object({
  client_name: z.string().min(1, 'Client name is required'),
  client_email: z.string().email('Invalid email'),
  order_date: z.string().min(1, 'Order date is required'),
  ordered_products: z
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
  const { inventory, fetchInventory } = useInventory();
  const { createNewOrder } = useOrder();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (inventory.length === 0) {
          await fetchInventory();
        }
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'message' in err
            ? String((err as { message?: string }).message)
            : 'Failed to load inventory';
        toast.error(message);
      } finally {
        setLoadingInventory(false);
      }
    };

    fetch();
  }, [inventory, fetchInventory]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ordered_products: [{ productId: '', quantity: 1 }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ordered_products',
  });

  const items = watch('ordered_products');

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
    const products = data.ordered_products
      .map((item) => {
        const product = inventory.find((p) => String(p.id) === item.productId);
        if (!product) return null;
        return {
          name: product.product_name,
          price: Number(product.price),
          quantity: item.quantity,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    const orderPayload = {
      client_name: data.client_name,
      client_email: data.client_email,
      client_phone: '',
      status: 'Pending' as 'Pending' | 'Cancelled' | 'Delivered',
      order_date: data.order_date,
      delivery_date: new Date().toISOString().split('T')[0],
      ordered_products: products,
    };

    try {
      const createdOrder = await createNewOrder(orderPayload);

      if (!createdOrder || !createdOrder.id) {
        throw new Error('Invalid response from server');
      }

      toast.success('Order added successfully!');
      router.push(`/orders/add-new-order-success/${createdOrder.id}`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create order';

      toast.error(errorMessage);
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Client name" {...register('client_name')} />
          {errors.client_name && (
            <p className="text-sm text-red-500">{errors.client_name.message}</p>
          )}

          <Input placeholder="Client email" {...register('client_email')} />
          {errors.client_email && (
            <p className="text-sm text-red-500">
              {errors.client_email.message}
            </p>
          )}

          <div className="space-y-1">
            <Label>Items</Label>
            {fields.map((field, index) => {
              const selected = inventory.find(
                (p) =>
                  String(p.id) === watch(`ordered_products.${index}.productId`),
              );
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start text-darkblue"
                >
                  <select
                    {...register(`ordered_products.${index}.productId`)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select Product</option>
                    {inventory.map((product) => (
                      <option key={product.id} value={String(product.id)}>
                        {product.product_name} (₦{product.price}) — Stock:{' '}
                        {product.stock_level}
                      </option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    placeholder="Qty"
                    {...register(`ordered_products.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    max={selected?.stock_level ?? 100}
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
            {...register('order_date')}
          />
          {errors.order_date && (
            <p className="text-sm text-red-500">{errors.order_date.message}</p>
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
              <strong>Name:</strong> {watch('client_name')}
            </p>
            <p>
              <strong>Email:</strong> {watch('client_email')}
            </p>
            <p>
              <strong>Date:</strong> {watch('order_date')}
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
                    {p.product_name} — {item.quantity} x ₦{p.price} = ₦
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
