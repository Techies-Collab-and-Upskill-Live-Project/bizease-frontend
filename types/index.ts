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
export type Order = {
  id: string;
  email: string;
  name: string;
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

export type EditProductProps = {
  editProduct: {
    id: string;
    itemName: string;
    category: string;
    stockLevel: number;
    price: number;
    lowStockThreshold: number;
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

export type OrderProduct = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
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

export type ReportPeriod = '7d' | '30d' | 'thisMonth' | 'all';

export interface InventoryStore {
  inventory: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setInventory: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  removeProduct: (id: number) => void;
  editProduct: (id: number, data: Partial<Product>) => void;
  reduceStock: (id: number, quantity: number) => void;
  fetchInventoryFromAPI: () => Promise<void>;
}

export interface InventoryItem {
  id?: number;
  owner: string;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  last_updated: string;
}
