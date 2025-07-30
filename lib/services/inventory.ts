import {
  DeleteInventoryResponse,
  InventoryItem,
  PostInventoryItem,
} from '@/types';
import { axiosInstance } from '../axios';

export const getInventory = async () => {
  try {
    const res = await axiosInstance.get('/inventory');
    if (res.data.error) {
      throw new Error(res.data.error);
    }

    return res.data.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch inventory';

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'detail' in err.response.data &&
      typeof err.response.data.detail === 'string'
    ) {
      errorMessage = err.response.data.detail;
    } else if (err instanceof Error && err.message) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};

export const addInventoryItem = async (data: PostInventoryItem) => {
  try {
    const res = await axiosInstance.post('/inventory', data);

    console.log('Response from addInventoryItem:', res.data);

    // Check for failure
    if (!res.data.data) {
      console.error('Error adding inventory item:', res.data.message);
      throw new Error(res.data.message || 'Failed to add inventory item');
    }

    console.log('Inventory item posted successfully:', res.data.data);
    return res.data.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch inventory';

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'detail' in err.response.data &&
      typeof err.response.data.detail === 'string'
    ) {
      errorMessage = err.response.data.detail;
    } else if (err instanceof Error && err.message) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};

export const updateInventoryItem = async (
  id: string,
  data: Partial<InventoryItem>,
) => {
  try {
    const res = await axiosInstance.put(`/inventory/${id}`, data);
    console.log(res, 'from services');
    return res.data.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch inventory';

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'detail' in err.response.data &&
      typeof err.response.data.detail === 'string'
    ) {
      errorMessage = err.response.data.detail;
    } else if (err instanceof Error && err.message) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};

export const deleteInventoryItem = async (
  id: string,
): Promise<DeleteInventoryResponse> => {
  try {
    const response = await axiosInstance.delete(`/inventory/${id}`);

    if (response.data?.error) {
      console.error(
        '[deleteInventoryItem] Backend error:',
        response.data.error,
      );
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch inventory';

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'detail' in err.response.data &&
      typeof err.response.data.detail === 'string'
    ) {
      errorMessage = err.response.data.detail;
    } else if (err instanceof Error && err.message) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};

export const getInventoryStats = async () => {
  try {
    const response = await axiosInstance.get('/inventory/stats/');

    if (response.data.error) {
      console.error('Error fetching inventory stats:', response.data.error);
      throw new Error(response.data.error);
    }

    return response.data.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch inventory';

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof err.response === 'object' &&
      err.response !== null &&
      'data' in err.response &&
      typeof err.response.data === 'object' &&
      err.response.data !== null &&
      'detail' in err.response.data &&
      typeof err.response.data.detail === 'string'
    ) {
      errorMessage = err.response.data.detail;
    } else if (err instanceof Error && err.message) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};
