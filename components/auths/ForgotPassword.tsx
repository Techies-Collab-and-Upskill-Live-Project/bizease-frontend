'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { sendResetEmail, loading } = useForgotPassword();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning('Please enter your email address');
      return;
    }

    try {
      await sendResetEmail(email);
      toast.success('If the email is valid, an OTP has been sent');

      // Navigate to confirm/reset-password screen
      router.push('/reset-confirm-password');
    } catch (err) {
      toast.error('Failed to send reset email');
      console.log('error occur', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto space-y-4 bg-white shadow p-6 rounded-xl"
    >
      <h2 className="text-lg font-semibold text-center">Forgot Password</h2>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Email'}
      </Button>
    </form>
  );
}
