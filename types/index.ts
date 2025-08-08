import { addInventoryformSchema } from '@/lib/validations/addnewInventory';
import { editInventoryformSchema } from '@/lib/validations/editInventoryProduct';
import { z } from 'zod';

export interface UserProps {
  user: User;
}
declare type User = {
  id: string;
  name: string;
  email: string;
  business: string;
};

export type CustomLogoProp = {
  type:
    | 'Inventory'
    | 'Settings'
    | 'Dashboard'
    | 'Orders'
    | 'Reports'
    | 'BizEase';
};

export interface SearchProductMobileProps {
  setFilter: (filter: string) => void;
  filter: string;
  handleAddProduct: () => void;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export type AddInventoryFormData = z.infer<typeof addInventoryformSchema>;
export type EditInventoryFormData = z.infer<typeof editInventoryformSchema>;

export interface SearchProductProps {
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  handleAddProduct: () => void;
  currentPage: number;
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export type EditProductProps = {
  editProduct: {
    id: string;
    product_name: string;
    category: string;
    stock_level: number;
    price: number;
    low_stock_threshold: number;
    description?: string;
  };
};

export type ReportItem = {
  id: number;
  Product: string;
  revenue: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  productSold: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  lastUpdated: string;
  status: string;
  lowStockThreshold?: number;
  description?: string;
};

// export type ReportPeriod = '7d' | '30d' | 'thisMonth' | 'all';

export interface AddInventoryItem {
  owner: string;
  id?: number;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  date_added: string;
}

export interface InventoryItem {
  owner: string;
  id?: number;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  last_updated: string;
}

export type DeleteInventoryResponse = {
  success: boolean;
  message: string;
  deletedItem?: InventoryItem;
};
export interface PostInventoryItem {
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  date_added: string;
}

export interface InventoryStats {
  total_products: number;
  total_stock_value: number;
  totalValue: number;
  low_stock_count: number;
}

export interface InventoryStore {
  inventory: InventoryItem[];
  stats: InventoryStats | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;

  setSearchTerm: (term: string) => void;
  setInventory: (products: InventoryItem[]) => void;

  fetchInventoryFromAPI: () => Promise<void>;
  fetchInventoryStats: () => Promise<void>;
  addProductToAPI: (product: Partial<InventoryItem>) => Promise<void>;
  updateProductInAPI: (
    id: string,
    data: Partial<InventoryItem>,
  ) => Promise<void>;
  deleteProductFromAPI: (id: string) => Promise<void>;

  editProduct: (id: string, data: Partial<InventoryItem>) => void;
  reduceStock: (id: string, quantity: number) => void;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Cancelled';

export interface OrderedProduct {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  order_date: string;
  delivery_date: string;
  ordered_products: OrderedProduct[];
  total_price?: number;
}

export type UserData = {
  business_name: string;
  full_name: string;
  email: string;
  business_type: string;
  country: string;
  currency: string;
  state: string;
  rcv_mail_for_new_orders: boolean;
  rcv_mail_for_low_stocks: boolean;
  phone: string;
  business_phone: string;
  business_address: string;
  rcv_mail_notification: boolean;
  rcv_msg_notification: boolean;
  default_order_status: string;
  language: string;
  low_stock_threshold: number;
};

export interface UpdateUser {
  business_name: string;
  full_name: string;
  country: string;
  currency: string;
  state: string;
  rcv_mail_for_new_orders: boolean;
  rcv_mail_for_low_stocks: boolean;
  phone: string;
  business_phone: string;
  business_address: string;
  rcv_mail_notification: boolean;
  rcv_msg_notification: boolean;
  default_order_status: string;
  language: string;
  low_stock_threshold: number;
}

export interface OrderedProductPayload {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  client_name: string;
  client_email: string;
  client_phone: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  order_date: string;
  delivery_date: string;
  ordered_products: OrderedProductPayload[];
}

export interface OrderUpdatePayload {
  client_name: string;
  client_email: string;
  client_phone: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  order_date: string;
  delivery_date: string;
  ordered_products: OrderedProductPayload[];
}

export interface UpdateOrderModalProps {
  order: Order | null;
  onClose: () => void;
  showActions?: boolean;
}

export type RevenueChartData = {
  date: string; // e.g., '2025-07-24'
  revenue: number; // e.g., 250000
};

export type ReportData = {
  total_products: number;
  total_stock_value: number;
  low_stock_items: number;
  pending_orders: number;
  period: string; // e.g., 'last-week' or 'this-month'
  top_selling_product: string;
  date_revenue_chart_data: RevenueChartData[];
};

export interface ReportSummaryItem {
  title: string;
  value: number | string;
  icon?: string;
  growthRate?: number;
  change?: string;
  name: string;
  stock_status: string;
  quantity_sold: number;
  revenue: number;
}

export interface ReportSummaryResponse {
  data: {
    period: string;
    summary: ReportSummaryItem[];
  };
}

export interface InventorySalesItem {
  title: string;
  value: number | string;
  icon?: string;
  growthRate?: number;
  change?: string;
  name: string;
  stock_status: string;
  quantity_sold: number;
  revenue: number;
  owner: string;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  date_added: string;
}

export interface DeleteOrderResponse {
  detail?: string;
  message?: string;
}
// types/inventoryResponses.ts

export interface InventorySuccessResponse {
  detail: 'New Item added to inventory';
}

export interface InventoryValidationErrorResponse {
  detail: {
    [field: string]: string[]; // e.g. "product_name": ["This field is required"]
  };
}

export interface InventoryUnauthorizedResponse {
  detail: 'Authentication credentials were not provided.';
}

export interface InventoryServerErrorResponse {
  detail: 'Something went wrong while trying to process your request';
}

export type AddInventoryItemResponse =
  | InventorySuccessResponse
  | InventoryValidationErrorResponse
  | InventoryUnauthorizedResponse
  | InventoryServerErrorResponse;

export interface DashboardSuccessResponse {
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
}

export interface DashboardUnauthorizedResponse {
  detail: 'Authentication credentials were not provided.';
}

export interface DashboardServerErrorResponse {
  detail: 'Something went wrong while trying to process your request';
}

export type DashboardDataResponse =
  | DashboardUnauthorizedResponse
  | DashboardServerErrorResponse;

// Success response (200)
export interface GeneralReportSummaryResponse {
  data: {
    period: string; // e.g., "All time", "Last week", etc.
    summary: {
      name: string;
      revenue: number;
      quantity_sold: number;
      stock_status: 'in stock' | 'low stock' | 'out of stock' | string;
    }[];
  };
}

// 400 - Invalid query parameters
export interface InvalidQueryParamsResponse {
  detail: string; // e.g., "Invalid GET parameters. Only 'period' or a combination of 'start_date' and 'end_date' is allowed"
}

// 401 - Unauthorized
export interface UnauthorizedResponse {
  detail: string; // e.g., "Authentication credentials were not provided."
}

// 500 - Server error
export interface ServerErrorResponse {
  detail: string; // e.g., "Something went wrong while trying to process your request"
}

// Valid values for period
export type ReportPeriod =
  | 'last-week'
  | 'last-month'
  | 'last-6-months'
  | 'last-year';

// Query parameters can be either period or a custom date range
export type GeneralReportQuery =
  | { period: ReportPeriod; start_date?: never; end_date?: never }
  | { period?: never; start_date: string; end_date: string };

export interface DateRevenueChartData {
  date: string;
  revenue: number;
}

export interface ProductSalesChartData {
  name: string;
  quantity_sold: number;
}

export interface GeneralReportData {
  period: string;
  top_selling_product: string;
  low_stock_items: number;
  pending_orders: number;
  total_products: number;
  total_stock_value: string;
  stock_value_change: number;
  total_revenue: number;
  revenue_change: number;
  date_revenue_chart_data: DateRevenueChartData[];
  product_sales_chart_data: ProductSalesChartData[];
}

export interface GeneralReportResponse {
  data: GeneralReportData;
}

export interface ErrorResponse {
  detail: string;
}
