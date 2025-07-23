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
// import { useInventoryStore } from '@/lib/store/inventory';

export default function EditProduct() {
  //  Hooks
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  //  Zustand store: get inventory list and update function
  const inventory = useInventoryStore((state) => state.inventory);
  const updateProduct = useInventoryStore((state) => state.editProduct);

  //  Find current product by ID (memoized for performance)
  const product = useMemo(
    () => inventory.find((item) => item.id === productId),
    [inventory, productId],
  );

  //  Redirect to fallback page if product doesn't exist
  useEffect(() => {
    if (!product) {
      router.push('/inventory/edit-product-failed');
    }
  }, [product, router]);

  //  Default form values from product (memoized)
  const defaultValues = useMemo(
    () => ({
      itemName: product?.name || '',
      category: product?.category || '',
      stockLevel: product?.stock ?? 0,
      price: product?.price ?? 0,
      lowStockThreshold: product?.low_stock_threshold ?? 5,
      description: product?.description || '',
    }),
    [product],
  );

  //  React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInventoryFormData>({
    resolver: zodResolver(editInventoryformSchema),
    defaultValues,
  });

  //  Submit handler: update store and redirect
  const onSubmit = (data: EditInventoryFormData) => {
    updateProduct(String(productId), {
      id: productId,
      product_name: data.itemName,
      description: data.description,
      category: data.category,
      stock_level: data.stockLevel,
      low_stock_threshold: data.lowStockThreshold,
      price: data.price,
    });

    router.push(`/inventory/edit-product-success/${productId}`);
  };

  //  Form UI
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <Card className="w-full border-0">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5 text-surface-500" />
            </Button>
            <h2 className="text-2xl max-md:text-md text-surface-400 font-semibold">
              Edit Product:
              <span className="text-blue-600"> {product?.name} </span>
            </h2>
          </div>
        </CardHeader>

        <CardContent className="w-full mx-auto max-w-md md:max-w-lg space-y-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/*  Input Fields */}
            {[
              { label: 'Item Name', name: 'itemName' },
              { label: 'Category', name: 'category' },
              { label: 'Stock Level', name: 'stockLevel', type: 'number' },
              { label: 'Price', name: 'price', type: 'number' },
              {
                label: 'Low Stock Threshold',
                name: 'lowStockThreshold',
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

            {/* Description */}
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

            {/* Action Buttons */}
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
