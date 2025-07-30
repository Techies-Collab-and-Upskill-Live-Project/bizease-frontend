import axios from 'axios';

// This function fetches dashboard stats from the local API route
export const getDashboardStats = async () => {
  try {
    const response = await axios.get('/api/dashboard');

    // Ensure valid data structure is returned
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response structure from dashboard API');
    }

    return response.data.data; // Contains the business_name, revenue, orders, etc.
  } catch (error) {
    console.error('[getDashboardStats] Error fetching dashboard stats:', error);
    throw error;
  }
};
