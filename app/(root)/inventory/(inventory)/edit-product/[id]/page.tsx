'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { editInventoryformSchema } from '@/lib/validations/editInventoryProduct';
import { EditInventoryFormData } from '@/types';
import { useInventory } from '@/hooks/useInventory';

import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const { inventory, updateItem } = useInventory();

  const product = useMemo(
    () => inventory.find((item) => item.id === productId),
    [inventory, productId],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditInventoryFormData>({
    resolver: zodResolver(editInventoryformSchema),
    defaultValues: {
      product_name: '',
      category: '',
      stock_level: 0,
      price: 0,
      low_stock_threshold: 5,
      description: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        product_name: product.product_name,
        category: product.category,
        stock_level: product.stock_level,
        price: product.price,
        low_stock_threshold: product.low_stock_threshold,
        description: product.description,
      });
    }
  }, [product, reset]);
  const onSubmit = async (data: EditInventoryFormData) => {
    try {
      await updateItem(String(productId), data);
      router.push(`/inventory/edit-product-success/${productId}`);
    } catch (err: unknown) {
      let errorMessage = 'Error updating product. Please try again.';

      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.detail || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      console.error('Update item failed:', errorMessage);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <Card className="w-full border-0">
        <CardHeader className="flex-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5 text-surface-500" />
            </Button>
            <h2 className="text-2xl max-md:text-md text-surface-400 font-semibold">
              Edit Product:
              <span className="text-blue-600"> {product?.product_name} </span>
            </h2>
          </div>
        </CardHeader>

        <CardContent className="w-full mx-auto max-w-md md:max-w-lg space-y-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {[
              { label: 'Item Name', name: 'product_name' },
              { label: 'Category', name: 'category' },
              { label: 'Stock Level', name: 'stock_level', type: 'number' },
              { label: 'Price', name: 'price', type: 'number' },
              {
                label: 'Low Stock Threshold',
                name: 'low_stock_threshold',
                type: 'number',
              },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label className="text-surface-400 mb-1">{label}</Label>
                <Input
                  className="text-surface-400"
                  type={type ?? 'text'}
                  {...register(name as keyof EditInventoryFormData, {
                    valueAsNumber: type === 'number',
                  })}
                />
                {errors[name as keyof EditInventoryFormData] && (
                  <p className="text-red-500 text-sm">
                    {errors[name as keyof EditInventoryFormData]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <Label className="text-surface-400 mb-1">Description</Label>
              <Textarea
                className="text-surface-400"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
              <Button
                type="submit"
                className="w-full bg-darkblue text-surface-100 hover:bg-lightblue"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('/inventory')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
