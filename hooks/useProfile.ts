import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormValues, profileSchema } from '@/lib/validations/settings';

export const useProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (typeof window !== 'undefined') {
        setAvatarPreview(URL.createObjectURL(file));
      }
      form.setValue('avatar', file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    // We will do somthing with the data here
    console.log('Profile data:', data);
  };

  return {
    form,
    avatarPreview,
    handleAvatarChange,
    onSubmit,
  };
};
