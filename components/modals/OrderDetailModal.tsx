'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const OrderDetailsModal = ({ open, onClose, order }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground">Client</p>
            <p>{order.client_name || 'N/A'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Order Date</p>
            <p>{formatDate(order.order_date)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="capitalize">{order.status}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Total Price</p>
            <p>{formatCurrency(order.total_price)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Products</p>
            {order.ordered_products?.length ? (
              <ul className="list-disc ml-5 space-y-1">
                {order.ordered_products.map((product, index) => (
                  <li key={index}>
                    {product.cummulative_price} — {product.quantity} *{' '}
                    {formatCurrency(product.price)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products in this order</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
