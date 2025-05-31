'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function Landing() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push('/sign-up');
  };
  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen">
      {/* Top Section */}
      <div className="relative bg-gradient-to-b from-blue-800 to-blue-600 px-2 md:px-4 py-3 md:py-8 rounded-b-2xl lg:rounded-none lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
          <p className="text-center text-white font-semibold">
            Manage your Orders{' '}
            <span className="text-blue-600">Efficiently.</span>
          </p>
          <img
            src="splash.png"
            alt="Order image"
            className="w-75 h-75 md:w-85 md:h-85"
          />
          <div className="flex justify-center gap-2 md:gap-3 md:py-2 py-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-4 md:px-8 md:py-10 lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <p className="text-2xl md:text-5xl font-bold">Welcome</p>
            <p className="text-2xl md:text-5xl font-bold">to</p>
            <p className="text-2xl md:text-5xl font-bold bg-gradient-to-b from-blue-800 to-blue-600 text-transparent bg-clip-text">
              Bizease!
            </p>
          </div>
          <img src="/icon/logo-2.png" alt="logo" className="my-6 h-20 w-20" />
          <div className="px-5 py-2 md:px-20 md:py-4 lg:py-10 w-full lg:w-2/3">
            <Button
              onClick={handleGetStarted}
              className="rounded-lg text-base font-semibold bg-[#06005B] hover:bg-blue-900 cursor-pointer w-full py-6 md:py-8 lg:py-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
