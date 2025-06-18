'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userLoginSchema } from '@/lib/validations/auth';

export default function useForgotPassoword() {
  const resetSchema = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
    // We will do something with the form values later..like maybe store them in a db
    console.log(values);
  };

  return { resetSchema, onSubmit };
}
