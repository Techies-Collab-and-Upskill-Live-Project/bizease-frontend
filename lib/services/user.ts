import { axiosInstance } from '../axios';
import { AxiosError } from 'axios';

export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get('/user');
    console.log('getAuthenticatedUser response:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};
