import { axiosInstance } from "../axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  full_name: string;
  business_name: string;
  country: string;
  state: string;
  currency: string;
  business_type: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response;
};

export const signup = async (payload: SignUpPayload) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response;
};
