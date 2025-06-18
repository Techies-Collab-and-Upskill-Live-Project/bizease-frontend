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
import { Card, CardContent } from '@/components/ui/card';

import { editInventoryformSchema } from '@/lib/validations/editInventoryProduct';
import { EditInventoryFormData } from '@/types';
import { useInventoryStore } from '@/lib/store';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const inventory = useInventoryStore((state) => state.inventory);
  const updateProduct = useInventoryStore((state) => state.editProduct);

  // 🧠 Memoized product from store
  const product = useMemo(
    () => inventory.find((item) => item.id === productId),
    [inventory, productId],
  );

  // 🔁 Redirect if product is not found
  useEffect(() => {
    if (!product) {
      router.push('/inventory/edit-product-failed');
    }
  }, [product, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInventoryFormData>({
    resolver: zodResolver(editInventoryformSchema),
    defaultValues: useMemo(
      () => ({
        itemName: product?.name || '',
        category: product?.category || '',
        stockLevel: product?.stock ?? 0,
        price: product?.price ?? 0,
        lowStockThreshold: product?.lowStockThreshold ?? 5,
        description: product?.description || '',
      }),
      [product],
    ),
  });

  const onSubmit = (data: EditInventoryFormData) => {
    updateProduct(productId, {
      id: productId,
      name: data.itemName,
      category: data.category,
      stock: data.stockLevel,
      price: data.price,
      lowStockThreshold: data.lowStockThreshold,
      description: data.description,
    });

    router.push(`/inventory/edit-product-success/${productId}`);
  };

  return (
    <section className="h-screen w-full flex-center">
      <div className="w-xl mx-auto px-4 py-2 space-y-4">
        <div className="flex-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5 text-surface-500" />
          </Button>
          <h2 className="text-xl max-md:text-sm text-surface-500 font-semibold">
            Edit Product:
            <span className="text-blue-600">{product?.name}</span>
          </h2>
        </div>

        <Card className="border-0 p-4">
          <CardContent className="space-y-1 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Fields */}
              {[
                ['Item Name', 'itemName'],
                ['Category', 'category'],
                ['Stock Level', 'stockLevel', 'number'],
                ['Price', 'price', 'number'],
                ['Low Stock Threshold', 'lowStockThreshold', 'number'],
              ].map(([label, name, type]) => (
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

              {/* Buttons */}
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
      </div>
    </section>
  );
}
