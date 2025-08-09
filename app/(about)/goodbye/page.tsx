'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const Goodbye = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 9000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-darkblue to-lightblue/80 text-surface-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Goodbye 👋</h1>
        <p className="text-lg max-w-md mx-auto">
          Your account has been successfully deleted. We are sad to see you go,
          but we wish you all the best on your journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <p className="text-sm opacity-80">Redirecting you to the homepage...</p>
      </motion.div>
    </div>
  );
};

export default Goodbye;
