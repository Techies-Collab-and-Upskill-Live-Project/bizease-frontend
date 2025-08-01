import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';

// import { NextAuthOptions, User, getServerSession } from 'next-auth';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
// import Credentials from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

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

export async function gmailLogin(payload: GmailLoginPayload) {
  try {
    const response = await axiosInstance.post('/auth/', payload);
    return response.data;
  } catch (error: unknown) {
    let backendMessage = 'Failed to login with Google credentials';

    if (error instanceof AxiosError && error.response?.data?.detail) {
      backendMessage = error.response.data.detail;
    }

    throw new Error(backendMessage);
  }
}
