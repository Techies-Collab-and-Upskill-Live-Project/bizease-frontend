import { axiosInstance } from '../axios';

export interface GmailLoginPayload {
  email: string;
  name: string;
}

export async function gmailLogin(payload: GmailLoginPayload) {
  try {
    const response = await axiosInstance.post('/auth/gmail-login/', payload);
    return response.data;
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.detail ||
      'Failed to login with Google credentials';
    throw new Error(backendMessage);
  }
}
