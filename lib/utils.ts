import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export const parseNumber = (value: string | undefined): number => {
  if (!value) return 0;
  const numeric = value.replace(/[^\d]/g, '');
  return parseInt(numeric, 10) || 0;
};

// lib/utils/stats.ts

interface ProductEntry {
  productId: string;
  productName: string;
}

interface Order {
  products?: ProductEntry[];
}

interface ProductCount {
  name: string;
  count: number;
}

export function calculateMostOrderedProduct(orders: Order[]): ProductCount {
  const productCountMap: Record<string, ProductCount> = {};

  orders.forEach(({ products }) => {
    products?.forEach(({ productId, productName }) => {
      if (!productId) return;

      if (!productCountMap[productId]) {
        productCountMap[productId] = {
          name: productName,
          count: 1,
        };
      } else {
        productCountMap[productId].count += 1;
      }
    });
  });

  const mostOrdered = Object.values(productCountMap).reduce(
    (top, current) => (current.count > top.count ? current : top),
    { name: 'N/A', count: 0 },
  );

  return mostOrdered;
}
