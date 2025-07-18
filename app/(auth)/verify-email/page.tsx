'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email');

  const handleVerify = async () => {
    if (!email) return toast.error('No email found in URL');
    if (!otp) return toast.error('Please enter the OTP');

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Verification failed');

      toast.success('Email verified successfully!');
      router.push('/log-in');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
      <p className="mb-2 text-center text-sm text-muted-foreground">
        Enter the OTP sent to{' '}
        <span className="font-semibold text-darkblue italic">{email}</span>
      </p>
      <Input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="max-w-sm my-4"
      />
      <Button
        onClick={handleVerify}
        disabled={loading}
        className="w-full text-darkblue hover:cursor-pointer hover:text-lightblue "
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>
    </div>
  );
}
