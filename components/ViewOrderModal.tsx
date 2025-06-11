'use client';

import { useOrderStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types';

interface Props {
  order: Order;
  onClose: () => void;
}

export default function ViewOrderModal({ order, onClose }: Props) {
  const { deleteOrder, updateOrder } = useOrderStore();

  const handleMarkDelivered = () => {
    updateOrder({
      ...order,
      status: 'Delivered',
      lastUpdated: new Date().toLocaleString(),
    });
    onClose();
  };

  const handleDelete = () => {
    deleteOrder(order.id);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Order ID:</strong> Ord - {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.name}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> {formatCurrency(order.total)}
          </p>
          <p>
            <strong>Last Updated:</strong> {order.lastUpdated}
          </p>
        </div>

        <DialogFooter>
          {order.status.toLowerCase() === 'pending' && (
            <Button
              onClick={handleMarkDelivered}
              className="bg-success hover:bg-green-600 text-white"
            >
              Mark as Delivered
            </Button>
          )}
          <Button variant="destructive" onClick={handleDelete}>
            Delete Order
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
