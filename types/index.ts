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
