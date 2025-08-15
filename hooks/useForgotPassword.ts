import { forgotPassword, resetPassword } from '@/lib/services/auth';
import { useState } from 'react';
import { toast } from 'sonner';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const sendResetEmail = async (email: string) => {
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      toast.success(res?.data?.detail || 'Reset email sent.');
    } catch (err: any) {
      console.error(
        'sendResetEmail error:',
        err?.response?.data || err.message || err,
      );
      toast.error(err?.response?.data?.detail || 'Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  const confirmReset = async (otp: string, password: string, email: string) => {
    setLoading(true);
    try {
      const res = await resetPassword({ otp, password, email });
      toast.success(res.data.detail || 'Password has been reset.');
    } catch (err) {
      toast.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return { sendResetEmail, confirmReset, loading };
}
