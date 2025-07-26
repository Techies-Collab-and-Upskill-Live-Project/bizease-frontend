import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This formats  currency to a string with the appropriate locale and formatting.
// It uses the Nigerian locale and ensures one decimal place is shown.
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₦0'; // or "N/A" or any default
  }
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

// This function calculates the most ordered product from a list of orders.
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
    { name: 'No Leading Products', count: 0 },
  );

  return mostOrdered;
}

export const getLastNDates = (
  n: number,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' },
) => {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString(locale, options));
  }
  return dates;
};

export const calculatePercentageChange = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) return 100; // Avoid division by zero
  return ((current - previous) / previous) * 100;
};
