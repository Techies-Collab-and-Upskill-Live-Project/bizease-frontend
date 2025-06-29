import axios from "axios";
import { axiosInstance } from "../axios";

export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
