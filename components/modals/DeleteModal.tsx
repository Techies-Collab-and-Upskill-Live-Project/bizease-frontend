'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useOrder } from '@/hooks/useOrder';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  productId?: string;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  productName,
  productId,
}: DeleteConfirmationModalProps) {
  // const { editOrder, removeOrder } = useOrder();

  console.log('deleting', productId, productName);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full h-fit p-6 text-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-xl text-darkblue">
            Delete Product
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-gray-700 my-1">
            Are you sure you want to delete <strong>{productName}</strong>? Are
            you sure you want to delete <strong>Order ID:{productId}</strong>?
          </p>
          <p className="text-md text-red-500 mb-6">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex-center flex-col gap-4 w-full">
          <DialogFooter className="flex flex-col gap-2">
            <Button
              onClick={onConfirm}
              className="bg-darkblue hover:bg-lightblue cursor-pointer text-surface-200 flex-1 w-full"
            >
              Delete
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full flex-1 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
