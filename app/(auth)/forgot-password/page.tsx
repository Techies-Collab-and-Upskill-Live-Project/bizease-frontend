'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { sendResetEmail, loading } = useForgotPassword();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetEmail(email);

    router.push('reset-password');
  };

  return (
    <section className="min-h-screen bg-surface-100">
      {/* Top Section */}
      <div className="flex py-10 md:py-40 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <Image
          sizes="fill"
          src="/icon/logo-2.png"
          alt="logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <p className="text-2xl font-bold">Bizease</p>
      </div>

      {/* Floating Form */}
      <div className="absolute top-60 md:top-60 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md bg-white rounded-lg shadow-2xl z-10 px-7 py-8">
        <div className="text-center my-6 md:py-4">
          <h2 className="text-2xl font-semibold">Forgot Your Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div>
            <label className="text-xs md:text-sm font-semibold">Email</label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pr-10 text-xs"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-darkblue hover:bg-lightblue py-3 md:py-6 text-xs md:text-sm font-semibold"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
