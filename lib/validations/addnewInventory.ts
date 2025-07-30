import { z } from 'zod';

export const addInventoryformSchema = z.object({
  product_name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  stock_level: z.coerce.number().min(1, 'Stock must be at least 1'),
  price: z.coerce.number().min(50, 'Price must be at least 50 Naira'),
});
