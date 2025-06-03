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

export interface CustomLogoProp {
  type:
    | 'Inventory'
    | 'Settings'
    | 'Dashboard'
    | 'Orders'
    | 'Reports'
    | 'BizEase';
}

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
