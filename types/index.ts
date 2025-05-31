declare interface UserProps {
  user: User;
}
declare type User = {
  id: string;
  name: string;
  email: string;
  business: string;
};

declare interface CustomLogoProp {
  type:
    | 'Inventory'
    | 'Settings'
    | 'Dashboard'
    | 'Orders'
    | 'Reports'
    | 'BizEase';
}

declare interface SearchProductProps {
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
  filter: string;
  handleAddProduct: () => void;
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

declare interface SearchProductMobileProps {
  setFilter: (filter: string) => void;
  filter: string;
  handleAddProduct: () => void;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
