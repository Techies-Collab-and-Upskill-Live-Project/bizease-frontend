'use client';

import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/loading-button';

const slides = [
  {
    text: 'Manage your Orders ',
    highlighted: 'Efficiently.',
    color: 'text-[#06005B]',
    image: '/splash.png',
  },
  {
    text: 'Keep stock of your ',
    highlighted: 'Inventory.',
    color: 'text-[#FFC400]',
    image: '/splash-2.png',
  },
];

export default function Landing() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      router.push('/about');
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[currentSlide];

  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen">
      {/* Image Section */}
      <div className="relative bg-gradient-to-b from-blue-800 to-blue-600 px-4 py-8 rounded-b-2xl lg:rounded-none lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <p className="text-white font-semibold text-base md:text-lg">
            {current.text}
            <span className={current.color}>{current.highlighted}</span>
          </p>

          <Image
            width={400}
            height={300}
            src={current.image}
            alt="Slide image"
            className="w-72 h-72 md:w-80 md:h-80 object-contain"
          />

          {/* Carousel Controls */}
          <div className="flex justify-center gap-3 py-2">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentSlide === index ? 'bg-white' : 'bg-surface-100/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-10 md:px-10 lg:w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center mb-6">
            <p className="text-2xl md:text-5xl font-bold">Welcome</p>
            <p className="text-2xl md:text-5xl font-bold">to</p>
            <p className="text-2xl md:text-5xl font-bold bg-gradient-to-b from-blue-800 to-blue-600 text-transparent bg-clip-text">
              Bizease!
            </p>
          </div>

          <Image
            width={60}
            height={58}
            src="/icon/logo-2.png"
            alt="logo"
            className="mb-6"
          />

          <div className="w-full px-5 md:px-20 lg:w-2/3">
            <LoadingButton
              onClick={handleGetStarted}
              type="submit"
              loading={loading}
              disabled={loading}
              className="rounded-lg bg-[#06005B] hover:bg-blue-900 w-full py-3 text-white"
            >
              Sign Up
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
