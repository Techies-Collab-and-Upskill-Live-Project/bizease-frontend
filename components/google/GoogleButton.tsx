'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function LoginWithGoogle() {
  return (
    <>
      <Button
        onClick={() => signIn('google')}
        className=" text-lightblue/60 px-4 py-2 cursor-pointer rounded"
      >
        <Image
          width={30}
          height={26}
          src={'/google.png'}
          alt=""
          className="w-6 h-6 "
        />
        or login with google
      </Button>
    </>
  );
}
