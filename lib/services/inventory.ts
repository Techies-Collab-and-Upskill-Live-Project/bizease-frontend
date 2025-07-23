import { axiosInstance } from '../axios';

export const getInventory = async () => {
  try {
    const res = await axiosInstance.get('/inventory');
    if (res.data.error) {
      console.error('Error fetching inventory:', res.data.error);
      throw new Error(res.data.error);
    }

    console.log('Inventory get data successfully:', res.data.data);

    return res.data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.error || 'Failed to fetch inventory');
  }
};

export const addInventoryItem = async (data: any) => {
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
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.error ||
        err?.message ||
        'Failed to add inventory item',
    );
  }
};

export const updateInventoryItem = async (id: string, data: any) => {
  try {
    const res = await axiosInstance.put(`/inventory/${id}`, [data]);
    if (res.data.error) {
      console.error('Error updating inventory item:', res.data.error);
      throw new Error(res.data.error);
    }
    console.log('Inventory item updated successfully:', res.data.data);
    return res.data.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.error || 'Failed to update inventory item',
    );
  }
};

export const deleteInventoryItem = async (
  id: string,
  token: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.error) {
      console.error(
        '[deleteInventoryItem] Backend error:',
        response.data.error,
      );
      throw new Error(response.data.error);
    }

    console.log('[deleteInventoryItem] Deleted successfully:', response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.error ||
      error.message ||
      'Failed to delete inventory item';
    console.error('[deleteInventoryItem] Error:', errorMsg);
    throw new Error(errorMsg);
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
  } catch (error: any) {
    console.error('Error fetching inventory stats:', error);
    throw new Error(
      error?.response?.data?.error || 'Failed to fetch inventory stats',
    );
  }
};
