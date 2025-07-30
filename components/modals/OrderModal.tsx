'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { UpdateOrderModalProps } from '@/types';
import AnimatedCountUp from '../animations/AnimatedCountUp';
import DeleteConfirmationModal from './DeleteModal';
import { toast } from 'sonner';
import { useOrder } from '@/hooks/useOrder';

const OrderModal = ({
  order,
  onClose,
  showActions = true,
}: UpdateOrderModalProps) => {
  const { editOrder, removeOrder } = useOrder();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const handleMarkDelivered = async () => {
    try {
      setLoading(true);
      await editOrder(String(order.id), {
        ...order,
        status: 'Delivered',
      });
      toast.success('Order marked as delivered');
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update order';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await removeOrder(String(order.id));
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update order';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-sm text-gray-600 shadow">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer:</strong> {order.client_name}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(order.order_date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong>{' '}
              <AnimatedCountUp amount={order?.total_price ?? 0} />
            </p>
            <p>
              <strong>Last Updated:</strong>{' '}
              {new Date(order.order_date).toLocaleString()}
            </p>
          </div>

          {showActions && (
            <DialogFooter className="flex gap-2">
              {order.status.toLowerCase() === 'pending' && (
                <Button
                  onClick={handleMarkDelivered}
                  className="bg-success hover:bg-green-600 text-white"
                  disabled={loading}
                >
                  Mark as Delivered
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                Delete Order
              </Button>

              <Button variant="outline" onClick={onClose} disabled={loading}>
                Close
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <DeleteConfirmationModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        productName={order.ordered_products[0].name}
        productId={String(order.id)}
      />
    </>
  );
};

export default OrderModal;
