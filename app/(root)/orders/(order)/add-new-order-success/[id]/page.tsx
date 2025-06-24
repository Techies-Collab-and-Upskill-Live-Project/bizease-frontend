'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

import { useOrderStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import AnimatedCountUp from '@/components/animations/AnimatedCountUp';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { id } = useParams();
  const order = useOrderStore((s) => s.orders.find((o) => o.id === id));

  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => {
        router.replace('/orders');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [order, router]);

  if (!order) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold mb-2">Invalid or Expired Order</h1>
        <p className="text-sm text-gray-500">Redirecting to orders page...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-darkblue">Order Submitted!</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Thank you, <span className="font-medium">{order.name}</span>. We have
        successfully recorded your order.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-left mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(order.lastUpdated).toLocaleDateString()}
        </p>

        <div className="mt-4">
          <p className="font-medium">Items:</p>
          <ul className="list-disc pl-5">
            {order.products.map((item) => (
              <li key={item.productId}>
                {item.productName} — {item.quantity} × ₦{item.price} = ₦
                {(item.quantity * item.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 font-bold">
          Total: <AnimatedCountUp amount={order.total} />
        </div>
      </div>

      <Button
        onClick={() => router.push('/orders')}
        className="bg-darkblue text-white"
      >
        Back to Orders
      </Button>
    </main>
  );
}
