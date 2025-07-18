'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email') ?? '';

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/verify-email', {
        email,
        otp,
      });

      setSuccess('Email verified successfully!');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-sm mx-auto mt-20 p-4 border rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Verify Your Email
      </h2>
      <p className="text-sm mb-2 text-muted-foreground">
        An OTP has been sent to <span className="font-medium">{email}</span>.
        Enter it below.
      </p>

      <Input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        className="mb-3"
      />

      <Button
        onClick={handleVerify}
        disabled={loading || otp.length < 6}
        className="w-full"
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-3">{success}</p>}
    </section>
  );
}
