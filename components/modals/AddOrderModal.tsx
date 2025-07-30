// 'use client';

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectTrigger,
//   SelectItem,
//   SelectContent,
//   SelectValue,
// } from '@/components/ui/select';

// // import { v4 as uuidv4 } from 'uuid';

// import AnimatedCountUp from '../animations/AnimatedCountUp';
// import { useInventory } from '@/hooks/useInventory';
// import { useOrder } from '@/hooks/useOrder';
// import { updateInventoryItem } from '@/lib/services/inventory';

// interface AddOrderModalProps {
//   onClose: () => void;
//   isOpen?: boolean;
// }

// export default function AddOrderModal({
//   onClose,
//   isOpen = true,
// }: AddOrderModalProps) {
//   const { inventory } = useInventory();
//   const { createNewOrder, loading } = useOrder();

//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [customer, setCustomer] = useState('');
//   const [quantity, setQuantity] = useState(1);

//   const product = inventory.find(({ id }) => id === selectedId);
//   const total = product ? product.price * quantity : 0;

//   const handleSubmit = async () => {
//     if (!product || !customer || quantity < 1 || quantity > product.stock_level)
//       return;

//     try {
//       const orderPayload = {
//         id: 0, // let backend handle ID if auto-generated
//         client_name: customer,
//         client_email: '', // optionally make this a field in the form
//         client_phone: '', // optionally make this a field in the form
//         status: 'Pending',
//         order_date: new Date().toISOString(),
//         delivery_date: new Date().toISOString(),
//         total_price: total,
//         ordered_products: [
//           {
//             name: product.product_name,
// x            quantity,
//             price: product.price,
//           },
//         ],
//       };

//       await createNewOrder(orderPayload);

//       await updateInventoryItem(String(product.id), {
//         ...product,
//         stock_level: product.stock_level - quantity,
//       });

//       onClose();
//     } catch (error) {
//       console.error('Order creation failed:', error);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="p-10 max-sm:p-5">
//         <DialogHeader className="flex-center mb-4">
//           <DialogTitle>Add New Order</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <Select onValueChange={(id) => setSelectedId(Number(id))}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select product" />
//             </SelectTrigger>
//             <SelectContent>
//               {inventory
//                 .filter(({ id }) => id !== undefined && id !== null)
//                 .map(({ id, stock_level, product_name }) => (
//                   <SelectItem
//                     key={id}
//                     value={id!.toString()}
//                     className="text-lightblue hover:text-darkblue"
//                   >
//                     {product_name} - (Left: {stock_level})
//                   </SelectItem>
//                 ))}
//             </SelectContent>
//           </Select>

//           <Input
//             placeholder="Customer name"
//             value={customer}
//             onChange={(e) => setCustomer(e.target.value)}
//           />
//           <Input
//             type="number"
//             min={1}
//             max={product?.stock_level ?? 100}
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             placeholder="Quantity"
//           />

//           <div className="text-darkblue text-sm">
//             Total:
//             <strong>
//               <AnimatedCountUp amount={total} />
//             </strong>
//           </div>
//         </div>

//         <DialogFooter className="flex gap-2">
//           <Button
//             variant="outline"
//             onClick={onClose}
//             className="cursor-pointer"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={
//               !product ||
//               !customer ||
//               quantity < 1 ||
//               quantity > (product?.stock_level ?? 0) ||
//               loading
//             }
//             className="bg-darkblue hover:bg-lightblue cursor-pointer text-surface-100"
//           >
//             {loading ? 'Placing...' : 'Place Order'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';

import AnimatedCountUp from '../animations/AnimatedCountUp';
import { useInventory } from '@/hooks/useInventory';
import { useOrder } from '@/hooks/useOrder';
import { updateInventoryItem } from '@/lib/services/inventory';

interface AddOrderModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export default function AddOrderModal({
  onClose,
  isOpen = true,
}: AddOrderModalProps) {
  const { inventory } = useInventory();
  const { createNewOrder, loading } = useOrder();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = inventory.find(({ id }) => id === selectedId);
  const total = product ? product.price * quantity : 0;

  const handleSubmit = async () => {
    if (!product || !customer || quantity < 1 || quantity > product.stock_level)
      return;

    try {
      const orderPayload = {
        client_name: customer,
        client_email: '', // optional: can be added as input
        client_phone: '', // optional: can be added as input
        status: 'Pending' as 'Pending' | 'Delivered' | 'Cancelled',
        order_date: new Date().toISOString(),
        delivery_date: new Date().toISOString(), // You may allow manual input later
        ordered_products: [
          {
            name: product.product_name,
            quantity,
            price: Number(product.price),
          },
        ],
      };

      await createNewOrder(orderPayload);

      await updateInventoryItem(String(product.id), {
        ...product,
        stock_level: product.stock_level - quantity,
      });

      onClose();
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-10 max-sm:p-5">
        <DialogHeader className="flex-center mb-4">
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Select onValueChange={(id) => setSelectedId(Number(id))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {inventory
                .filter(({ id }) => id !== undefined && id !== null)
                .map(({ id, stock_level, product_name }) => (
                  <SelectItem
                    key={id}
                    value={id!.toString()}
                    className="text-lightblue hover:text-darkblue"
                  >
                    {product_name} - (Left: {stock_level})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Customer name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <Input
            type="number"
            min={1}
            max={product?.stock_level ?? 100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
          />

          <div className="text-darkblue text-sm">
            Total:{' '}
            <strong>
              <AnimatedCountUp amount={total} />
            </strong>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !product ||
              !customer ||
              quantity < 1 ||
              quantity > (product?.stock_level ?? 0) ||
              loading
            }
            className="bg-darkblue hover:bg-lightblue cursor-pointer text-surface-100"
          >
            {loading ? 'Placing...' : 'Place Order'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
