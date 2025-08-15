import axios, { AxiosError } from 'axios';

type GmailLoginInput = {
  email: string;
  name: string;
};

type GmailLoginResponse = {
  access: string;
  refresh: string;
};

export async function gmailLogin(
  input: GmailLoginInput,
): Promise<GmailLoginResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`,
      input,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response.data.data;
  } catch (error: unknown) {
    let backendMessage = 'Failed to login with Google credentials';

    if (error instanceof AxiosError && error.response?.data?.detail) {
      backendMessage = error.response.data.detail;
    }

    throw new Error(backendMessage);
  }
}
