import { z } from 'zod';

export const editInventoryformSchema = z.object({
  product_name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  stock_level: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Stock level must be non-negative'),
  price: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Price must be non-negative'),
  low_stock_threshhold: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Threshold must be non-negative'),
  description: z.string().optional(),
});
