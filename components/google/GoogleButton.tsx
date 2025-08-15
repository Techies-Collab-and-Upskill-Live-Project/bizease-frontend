'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      toast.loading('Logging in with Google...');
      await signIn('google');
    } catch (err) {
      toast.error('Something went wrong during login.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="flex items-center gap-2 text-surface-300 px-4 py-2 cursor-pointer rounded"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Logging in...
        </>
      ) : (
        <>
          or login with Google
          <Image
            width={30}
            height={26}
            src="/google.png"
            alt="Google logo"
            className="w-6 h-6"
          />
        </>
      )}
    </Button>
  );
}
