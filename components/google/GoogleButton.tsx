'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      toast.loading('Logging in with google...');
      await signIn('google');
    } catch (err) {
      toast.error('Something went wrong during login:');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <span className="bg-surface-200 rounded-lg py-2 text-surface-400 px-4">
        Loading...
      </span>
    );
  }

  return (
    <>
      <Button
        onClick={handleGoogleLogin}
        className=" text-surface-300 px-4 py-2 cursor-pointer rounded"
      >
        or login with google
        <Image
          width={30}
          height={26}
          src={'/google.png'}
          alt=""
          className="w-6 h-6 "
        />
      </Button>
    </>
  );
}
