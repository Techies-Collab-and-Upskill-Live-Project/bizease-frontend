import { z } from 'zod';

export const editInventoryformSchema = z.object({
  itemName: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  stockLevel: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Stock level must be non-negative'),
  price: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Price must be non-negative'),
  lowStockThreshold: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Threshold must be non-negative'),
  description: z.string().optional(),
});
