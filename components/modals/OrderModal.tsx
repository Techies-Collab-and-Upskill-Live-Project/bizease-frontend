// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';

// import { Order } from '@/types';
// import { useOrderStore } from '@/lib/store';
// import AnimatedCountUp from '../animations/AnimatedCountUp';

// interface Props {
//   order: Order | null;
//   onClose: () => void;
//   showActions?: boolean;
// }

// const OrderModal = ({ order, onClose, showActions = true }: Props) => {
//   const updateOrder = useOrderStore.getState().updateOrder;
//   const deleteOrder = useOrderStore.getState().deleteOrder;

//   // const { updateOrder, deleteOrder } = useOrderStore();

//   if (!order) return null;

//   const handleMarkDelivered = () => {
//     updateOrder({
//       ...order,
//       status: 'Delivered',
//       lastUpdated: new Date().toLocaleString(),
//     });
//     onClose();
//   };

//   const handleDelete = () => {
//     deleteOrder(order.id);
//     onClose();
//   };

//   const { id, name, date, status, total, lastUpdated } = order;

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Order Details</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-2 text-sm text-gray-600">
//           <p>
//             <strong>Order ID:</strong> {id}
//           </p>
//           <p>
//             <strong>Customer:</strong> {name}
//           </p>
//           <p>
//             <strong>Date:</strong> {date}
//           </p>
//           <p>
//             <strong>Status:</strong> {status}
//           </p>
//           <p>
//             <strong>Total:</strong> <AnimatedCountUp amount={total} />
//           </p>
//           <p>
//             <strong>Last Updated:</strong> {lastUpdated}
//           </p>
//         </div>

//         {showActions && (
//           <DialogFooter className="flex gap-2">
//             {status.toLowerCase() === 'pending' && (
//               <Button
//                 onClick={handleMarkDelivered}
//                 className="bg-success hover:bg-green-600 cursor-pointer text-white"
//               >
//                 Mark as Delivered
//               </Button>
//             )}
//             <Button
//               variant="destructive"
//               className="cursor-pointer"
//               onClick={handleDelete}
//             >
//               Delete Order
//             </Button>
//             <Button
//               variant="outline"
//               className="cursor-pointer"
//               onClick={onClose}
//             >
//               Close
//             </Button>
//           </DialogFooter>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OrderModal;

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
import { useOrderStore } from '@/lib/store';
import AnimatedCountUp from '../animations/AnimatedCountUp';

// OPTIONAL: if you want to confirm deletion before actually deleting
// import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Props {
  order: Order | null;
  onClose: () => void;
  showActions?: boolean;
}

const OrderModal = ({ order, onClose, showActions = true }: Props) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!order) return null;

  const handleMarkDelivered = () => {
    useOrderStore.getState().updateOrder({
      ...order,
      status: 'Delivered',
      lastUpdated: new Date().toLocaleString(),
    });
    onClose();
  };

  const handleDelete = () => {
    useOrderStore.getState().deleteOrder(order.id);
    onClose();
  };

  const { id, name, date, status, total, lastUpdated } = order;

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Order ID:</strong> {id}
            </p>
            <p>
              <strong>Customer:</strong> {name}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Total:</strong> <AnimatedCountUp amount={total} />
            </p>
            <p>
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
          </div>

          {showActions && (
            <DialogFooter className="flex gap-2">
              {status.toLowerCase() === 'pending' && (
                <Button
                  onClick={handleMarkDelivered}
                  className="bg-success hover:bg-green-600 cursor-pointer text-white"
                >
                  Mark as Delivered
                </Button>
              )}

              {/* Simple delete without confirmation */}
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleDelete}
              >
                Delete Order
              </Button>

              {/* If using DeleteConfirmationModal instead: */}
              {/*
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Order
              </Button>
              */}

              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Optional: Confirmation Modal for Delete */}
      {/*
      <DeleteConfirmationModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          handleDelete();
          setShowDeleteConfirm(false);
        }}
        productName={order.name}
      />
      */}
    </>
  );
};

export default OrderModal;
