'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  businessSchema,
  preferenceSchema,
  profileSchema,
} from '@/lib/validations/settings';
import { z } from 'zod';
import { useCurrentUser } from './useCurrentUser';
import { updateUserInfo, UserData } from '@/lib/services/user';
import { toast } from 'sonner';

const combinedSchema = z.discriminatedUnion('type', [
  profileSchema,
  businessSchema,
  preferenceSchema,
]);

type CombinedFormValues = z.infer<typeof combinedSchema>;
type SettingType = 'profile' | 'business' | 'preference';

const validUserDataKeys = [
  'business_name',
  'full_name',
  'email',
  'business_type',
  'country',
  'currency',
  'state',
  'rcv_mail_for_new_orders',
  'rcv_mail_for_low_stocks',
  'phone',
  'business_phone',
  'business_address',
  'rcv_mail_notification',
  'rcv_msg_notification',
  'default_order_status',
  'language',
  'low_stock_threshold',
] as const;

type ValidUserDataKey = (typeof validUserDataKeys)[number];

export const useSettings = (type: SettingType) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { user: currentUser } = useCurrentUser();

  const form = useForm<CombinedFormValues>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      type,
    } as CombinedFormValues,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));

      if (type === 'profile' || type === 'business') {
        form.setValue('avatar', file as any);
      }
    }
  };

  const onSubmit = async (data: CombinedFormValues) => {
    console.log('submitting data,', data);
    if (!currentUser) {
      console.warn('Current user data not loaded yet.');
      return;
    }

    const mergedData: UserData = {
      ...currentUser,
      ...Object.fromEntries(
        Object.entries(data).filter(([key]) =>
          validUserDataKeys.includes(key as ValidUserDataKey),
        ),
      ),
    };

    try {
      const response = await updateUserInfo(mergedData);
      console.log(response);
      toast.info(response.detail);
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.info(
        error instanceof Error ? error.message : 'Failed to update user info',
      );
    }
  };

  return {
    form,
    avatarPreview,
    handleAvatarChange,
    onSubmit,
  };
};
