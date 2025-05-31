'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
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

export default function AddProductPage() {
  const router = useRouter();

  const form = useForm<AddInventoryFormData>({
    resolver: zodResolver(addInventoryformSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      stock: 0,
      price: 0,
    },
  });

  const onSubmit = (data: AddInventoryFormData) => {
    const existing = JSON.parse(localStorage.getItem('inventory') || '[]');
    const newProduct = { ...data, id: Date.now() };

    localStorage.setItem(
      'inventory',
      JSON.stringify([...existing, newProduct]),
    );

    router.push('/inventory');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="flex-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="max-sm:text-sm text-gray-600 font-semibold">
            Add New Product
          </h1>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
              name="stock"
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

            <div className="space-y-1 pt-2">
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
