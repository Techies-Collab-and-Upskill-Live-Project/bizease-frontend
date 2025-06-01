import { addInventoryformSchema } from '@/lib/validations/addnewInventory';
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

export interface SearchProductProps {
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  handleAddProduct: () => void;
  currentPage: number;
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
