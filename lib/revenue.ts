type TopProduct = {
  name: string;
  revenue: number;
};

type Order = {
  id: string;
  name: string; // Buyer's name
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  status: 'Pending' | 'Delivered' | 'Cancelled';
  total: number;
  lastUpdated: string;
  date: string;
};

export function computeTopProductRevenues(
  orders: Order[],
  top: number = 5,
): TopProduct[] {
  const productRevenueMap: Record<string, number> = {};

  orders.forEach((order) => {
    order.products?.forEach((product) => {
      const { productName, price, quantity } = product;

      if (!productName || price == null || quantity == null) return;

      if (!productRevenueMap[productName]) {
        productRevenueMap[productName] = 0;
      }

      productRevenueMap[productName] += price * quantity;
    });
  });

  return Object.entries(productRevenueMap)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, top);
}
