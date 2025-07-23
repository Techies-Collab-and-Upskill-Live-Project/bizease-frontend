import { axiosInstance } from '../axios';
import { AxiosError } from 'axios';

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

export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};

export const updateUserInfo = async (update: UserData) => {
  try {
    const response = await axiosInstance.put('/user', update);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};
