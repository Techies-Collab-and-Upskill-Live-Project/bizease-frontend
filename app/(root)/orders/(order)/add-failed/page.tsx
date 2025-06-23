'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function OrderFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Order Failed</h1>
      <p className="text-muted-foreground mb-3">
        Something went wrong while processing the order.
      </p>

      {id && (
        <p className="text-sm text-muted-foreground mb-6">
          Failed Order ID: <strong>{id}</strong>
        </p>
      )}

      <Button onClick={() => router.push('/orders')}>Back to Orders</Button>
    </main>
  );
}
