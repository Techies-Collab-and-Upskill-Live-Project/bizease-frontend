'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userSignUpSchema } from '@/lib/validations/auth';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/services/auth';
import { toast } from 'sonner';

export default function useSignUp() {
  const router = useRouter();
  const signUpSchema = useForm<z.infer<typeof userSignUpSchema>>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      business_name: '',
      country: '',
      state: '',
      currency: '',
      business_type: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignUpSchema>) => {
    await toast.promise(signup(values), {
      loading: 'Signing up...',
      success: () => {
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);

        return 'signed up successfully!';
      },
      error: (err) => {
        return err?.response?.data.message || err.response.status;
      },
    });
  };

  return { signUpSchema, onSubmit };
}
