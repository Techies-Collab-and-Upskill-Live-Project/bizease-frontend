'use client';

import { useState } from 'react';

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
import { EditInventoryFormData, EditProductProps } from '@/types';
import { inventoryItems } from '@/constants';
import { parseNumber } from '@/lib/utils';

export default function EditProduct({ editProduct }: EditProductProps) {
  const router = useRouter();
  const params = useParams();

  const productId = Number(params.id);

  const [product] = useState(() =>
    inventoryItems.find((item) => item.id === productId),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInventoryFormData>({
    resolver: zodResolver(editInventoryformSchema),
    defaultValues: {
      itemName: product?.itemsInStock || '',
      category: product?.category || '',
      stockLevel: parseNumber(product?.stockLevel),
      price: parseNumber(product?.price),
      lowStockThreshold: 0,
      description: '',
    },
  });

  const onSubmit = (data: EditInventoryFormData) => {
    console.log('Updated Product:', data);
    router.push('/inventory');
  };

  if (!product) {
    return (
      <div className="flex-center text-center p-6 text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <section className="h-screen w-full flex-center">
      <div className="w-xl mx-auto px-4 py-2 space-y-4">
        <div className="flex-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5 text-surface-500" />
          </Button>
          <h2 className="text-xl max-md:text-sm text-surface-500 font-semibold">
            Edit Product: "
            <span className="text-blue-600">{product.itemsInStock}</span>"
          </h2>
        </div>

        {/* Form */}
        <Card className="border-0 p-4">
          <CardContent className="space-y-1 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Item Name */}
              <div>
                <Label className="text-surface-500 mb-1">Item Name</Label>
                <Input
                  className="text-surface-400"
                  placeholder={product.itemsInStock}
                  {...register('itemName')}
                />
                {errors.itemName && (
                  <p className="text-red-500 text-sm">
                    {errors.itemName.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label className="text-surface-500 mb-1">Category</Label>
                <Input
                  className="text-surface-400"
                  placeholder={product.category}
                  {...register('category')}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Stock Level */}
              <div className="p-0 m-0">
                <Label className="text-surface-600 mb-1">Stock Level</Label>
                <Input
                  className="text-surface-400"
                  type="number"
                  placeholder={parseNumber(product.stockLevel).toString()}
                  {...register('stockLevel', { valueAsNumber: true })}
                />
                {errors.stockLevel && (
                  <p className="text-red-500 text-sm">
                    {errors.stockLevel.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mt-1">
                <Label className="text-surface-600 mb-1">Price</Label>
                <Input
                  className="text-surface-400"
                  type="number"
                  placeholder={parseNumber(product.price).toString()}
                  {...register('price', { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/* Low Stock Threshold */}
              <div>
                <Label className="text-surface-600 mb-1">
                  Low Stock Threshold
                </Label>
                <Input
                  className="text-surface-400"
                  type="number"
                  placeholder="Enter low stock threshold"
                  {...register('lowStockThreshold', { valueAsNumber: true })}
                />
                {errors.lowStockThreshold && (
                  <p className="text-red-500 text-sm">
                    {errors.lowStockThreshold.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label className="text-surface-600 mb-1">Description</Label>
                <Textarea
                  className="text-surface-400"
                  placeholder="Product description..."
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
