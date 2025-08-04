import { axiosInstance } from '../axios';

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

export interface GmailLoginPayload {
  email: string;
  name: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', payload);
  return response;
};

export const signup = async (payload: SignUpPayload) => {
  const response = await axiosInstance.post('/auth/signup', payload);
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response;
};

export async function forgotPassword(email: string) {
  return axiosInstance.post('/auth/forgot-password', { email });
}

export async function resetPassword(payload: {
  otp: string;
  password: string;
  email: string;
}) {
  return axiosInstance.post('/auth/reset-password', payload);
}
