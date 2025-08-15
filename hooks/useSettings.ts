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
import { updateUserInfo } from '@/lib/services/user';
import { toast } from 'sonner';
import { UserData } from '@/types';

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
    if (!currentUser) {
      return;
    }

    // 1 Map form keys to backend keys
    const keyMap: Record<string, string> = {
      fullName: 'full_name',
      password: 'password', // include if backend accepts password update here
      businessName: 'business_name', // example mapping
      businessPhone: 'business_phone', // example mapping
      businessAddress: 'business_address', // example mapping
    };

    const normalizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [keyMap[key] || key, value]),
    );

    // 2 Filter only allowed backend keys
    const filteredData = Object.fromEntries(
      Object.entries(normalizedData).filter(([key]) =>
        validUserDataKeys.includes(key as ValidUserDataKey),
      ),
    );

    // 3 Merge old data with new — new values overwrite old ones
    const mergedData: UserData = {
      ...currentUser,
      ...filteredData,
    };

    try {
      const response = await updateUserInfo(mergedData);
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
