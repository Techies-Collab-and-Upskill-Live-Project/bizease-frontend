// import { UpdateUser } from '@/types';
// import { axiosInstance } from '../axios';
// import { AxiosError } from 'axios';

// export const getAuthenticatedUser = async () => {
//   try {
//     const response = await axiosInstance.get('/user');
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       throw error.response?.data || error;
//     } else {
//       throw error;
//     }
//   }
// };

// export const updateUserInfo = async (update: UpdateUser) => {
//   try {
//     const response = await axiosInstance.put('/user', update);
//     return response.data.data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       throw error.response?.data || error;
//     } else {
//       throw error;
//     }
//   }
// };

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
