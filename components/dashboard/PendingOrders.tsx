'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import OrderModal from '@/components/modals/OrderModal';
import { useOrder } from '@/hooks/useOrder';
import { Order } from '@/types';
// import { v4 as uuidv4 } from 'uuid';

const PendingOrders = () => {
  const { orders } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAll, setShowAll] = useState(false);

  const pendingOrders = orders.filter((order) => order.status === 'Pending');
  const visibleOrders = showAll ? pendingOrders : pendingOrders.slice(0, 3);

  // const FrontEndProductId = uuidv4();

  return (
    <div className="space-y-4">
      <h2 className="text-lg text-gray-600 font-bold">Pending Orders</h2>

      {pendingOrders.length === 0 ? (
        <div className="text-muted-foreground font-medium text-sm">
          No pending orders.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleOrders.map((order) => {
              const product = order.ordered_products?.[0];

              return (
                <div
                  key={order.id}
                  className="border rounded-2xl p-3 text-surface-400 space-y-2"
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span className="font-semibold text-gray-600">
                      Order Id: {order.id}
                      {/* {FrontEndProductId} */}
                    </span>
                    <span className="text-xs text-surface-400">
                      {new Date(order.order_date).toLocaleDateString('en-NG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="text-[14px] font-medium text-gray-700">
                    {product?.name ?? 0} -{' '}
                    <span>{formatCurrency(product?.price ?? 0)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 font-medium bg-warning-bg text-warning px-2 py-1 rounded-full">
                      <div className="h-2 w-2 text-xs bg-warning rounded-full" />
                      {order.status}
                    </span>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[12px] font-normal bg-darkblue text-shadow-surface-200 hover:bg-blue-700 px-2 cursor-pointer"
                      >
                        Fulfill
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {pendingOrders.length > 3 && (
            <Button
              variant="outline"
              className="mx-auto block"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </>
      )}

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default PendingOrders;
