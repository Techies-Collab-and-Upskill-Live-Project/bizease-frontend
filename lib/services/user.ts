import { UpdateUser } from '@/types';
import { axiosInstance } from '../axios';
import { AxiosError } from 'axios';

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

export const updateUserInfo = async (update: UpdateUser) => {
  try {
    // Normalize currency to uppercase if provided
    if (update.currency && typeof update.currency === 'string') {
      update.currency = update.currency.toUpperCase().trim();
    }

    const response = await axiosInstance.put('/user', update);

    // Normalize in response for consistency
    if (
      response.data?.data?.currency &&
      typeof response.data.data.currency === 'string'
    ) {
      response.data.data.currency = response.data.data.currency
        .toUpperCase()
        .trim();
    }

    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};

export const deleteUserAccount = async () => {
  try {
    const response = await axiosInstance.delete('/user');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};
