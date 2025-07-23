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
import { Order } from '@/types';
import AnimatedCountUp from '../animations/AnimatedCountUp';
import DeleteConfirmationModal from './DeleteModal';

import { toast } from 'sonner';
import { updateOrder, deleteOrder } from '../../lib/api/inventory'; // your API service

interface Props {
  order: Order | null;
  onClose: () => void;
  showActions?: boolean;
}

const OrderModal = ({ order, onClose, showActions = true }: Props) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const handleMarkDelivered = async () => {
    try {
      setLoading(true);
      await updateOrder(String(order.id), {
        ...order,
        status: 'Delivered',
        order_date: new Date().toISOString(),
      });
      toast.success('Order marked as delivered');
      onClose();
    } catch (err) {
      toast.error('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteOrder(String(order.id));
      toast.success('Order deleted');
      onClose();
    } catch (err) {
      toast.error('Failed to delete order');
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

          <div className="space-y-2 text-sm text-gray-600">
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
              <AnimatedCountUp amount={order.total_price} />
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
        productName={order.client_name}
      />
    </>
  );
};

export default OrderModal;
