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
  // inventory: string;
  // logo: string;
  // settings: string;
  // dashboard: string;
  // order: string;
  // report: string;
  type:
    | 'Inventory'
    | 'Settings'
    | 'Dashboard'
    | 'Orders'
    | 'Reports'
    | 'BizEase';
}
