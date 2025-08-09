'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addInventoryformSchema } from '@/lib/validations/addnewInventory';
import { AddInventoryFormData } from '@/types';
import { useInventory } from '@/hooks/useInventory';

export default function AddProductPage() {
  const { createItem } = useInventory();

  const router = useRouter();

  const form = useForm<AddInventoryFormData>({
    resolver: zodResolver(addInventoryformSchema),
    defaultValues: {
      product_name: '',
      category: '',
      description: '',
      stock_level: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: AddInventoryFormData) => {
    const newProduct = {
      product_name: data.product_name,
      description: data.description,
      category: data.category,
      stock_level: data.stock_level,
      price: data.price,
      low_stock_threshold: 5, // default
      date_added: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await createItem(newProduct);

      const productId = res?.data?.id;

      if (!productId) throw new Error('No product ID returned from API');

      router.push(`/inventory/add-product-success/${productId}`);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-600 max-sm:text-sm">
            Add New Product
          </h1>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Product category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock_level"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock level"
                      {...field}
                      className="text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button
                type="submit"
                className="w-full font-normal text-surface-200 bg-darkblue hover:bg-lightblue"
              >
                Add Product
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-gray-700"
                onClick={() => router.push('/inventory')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
