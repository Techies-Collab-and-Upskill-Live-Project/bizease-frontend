import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const parseNumber = (value: string | undefined): number => {
  if (!value) return 0;
  const numeric = value.replace(/[^\d]/g, '');
  return parseInt(numeric, 10) || 0;
};
