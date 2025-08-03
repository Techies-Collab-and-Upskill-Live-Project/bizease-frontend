// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { userLoginSchema } from '@/lib/validations/auth';

// export default function useForgotPassoword() {
//   const resetSchema = useForm<z.infer<typeof userLoginSchema>>({
//     resolver: zodResolver(userLoginSchema),
//     defaultValues: {
//       email: '',
//     },
//   });

//   const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
//     // We will do something with the form values later..like maybe store them in a db
//     console.log(values);
//   };

//   return { resetSchema, onSubmit };
// }

import { forgotPassword, resetPassword } from '@/lib/services/auth';
import { useState } from 'react';
import { toast } from 'sonner';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  const sendResetEmail = async (email: string) => {
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.data.detail || 'Reset email sent.');
    } catch (err) {
      toast.error('Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  const confirmReset = async (otp: string, password: string) => {
    setLoading(true);
    try {
      const res = await resetPassword({ otp, password });
      toast.success(res.data.detail || 'Password has been reset.');
    } catch (err) {
      toast.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return { sendResetEmail, confirmReset, loading };
}
