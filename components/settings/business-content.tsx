'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LoadingSpinner from '../spinner';
import { useBusiness } from '@/hooks/useBusiness';

export default function BusinessSettings() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    avatarPreview,
    handleAvatarChange,
    onSubmit,
  } = useBusiness();

  return isSubmitting ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-6 space-y-5 max-w-md mx-auto "
    >
      {/* Avatar */}
      <div className="flex flex-col gap-2 items-center justify-center space-y-2">
        <Avatar className="w-30 h-30">
          <AvatarImage src={avatarPreview || ''} alt="Avatar" />
          <AvatarFallback className="font-bold text-gray-600 text-base">
            OG
          </AvatarFallback>
        </Avatar>
        <div>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Label
            htmlFor="avatar"
            className="text-xs tracking-wide font-semibold cursor-pointer hover:underline"
          >
            Business Logo
          </Label>
        </div>
      </div>

      {/* Business Name */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessName"
          className="text-xs text-gray-600 font-semibold"
        >
          Business Name
        </Label>
        <Input
          id="businessName"
          {...register('businessName')}
          className="text-xs tracking-wide md:py-6 shadow-sm"
          placeholder="Jessica Reeves"
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Business Email */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessEmail"
          className="text-xs text-gray-600 font-semibold"
        >
          Business Email
        </Label>
        <Input
          id="businessEmail"
          type="email"
          {...register('businessEmail')}
          placeholder="jessyreeves@gmail.com"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {errors.businessEmail && (
          <p className="text-sm text-red-500">{errors.businessEmail.message}</p>
        )}
      </div>

      {/* Business Phone */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessPhone"
          className="text-xs text-gray-600 font-semibold"
        >
          Business Phone
        </Label>
        <Input
          id="businessPhone"
          type="tel"
          {...register('businessPhone')}
          placeholder="+234 906 4473 435"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {errors.businessPhone && (
          <p className="text-sm text-red-500">{errors.businessPhone.message}</p>
        )}
      </div>

      {/* Business Address */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessAddress"
          className="text-xs text-gray-600 font-semibold"
        >
          Business Address
        </Label>
        <Input
          id="businessAddress"
          type="text"
          {...register('businessAddress')}
          className="text-xs tracking-wide md:py-6 shadow-sm"
          placeholder="Address"
        />
        {errors.businessAddress && (
          <p className="text-sm text-red-500">
            {errors.businessAddress.message}
          </p>
        )}
      </div>

      {/* Business Type */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessType"
          className="text-xs text-gray-600 font-semibold"
        >
          Business Type
        </Label>
        <select
          id="businessType"
          {...register('businessType')}
          className="border-2 border-gray-200 text-xs tracking-wide rounded-sm px-3 py-2 md:py-4 shadow-sm"
        >
          <option value="">Select a type</option>
          <option value="Retail">Retail</option>
          <option value="Tech">Tech</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Consulting">Consulting</option>
          <option value="Other">Other</option>
        </select>
        {errors.businessType && (
          <p className="text-sm text-red-500">{errors.businessType.message}</p>
        )}
      </div>

      {/* Currency */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="currency"
          className="text-xs text-gray-600 font-semibold"
        >
          Preferred Currency
        </Label>
        <select
          id="currency"
          {...register('currency')}
          className="border-2 border-gray-200 text-xs tracking-wide rounded-sm px-3 py-2 md:py-4 shadow-sm"
        >
          <option value="">Select currency</option>
          <option value="USD">USD – US Dollar</option>
          <option value="EUR">EUR – Euro</option>
          <option value="GBP">GBP – British Pound</option>
          <option value="NGN">NGN – Nigerian Naira</option>
          <option value="CAD">CAD – Canadian Dollar</option>
        </select>
        {errors.currency && (
          <p className="text-sm text-red-500">{errors.currency.message}</p>
        )}
      </div>

      {/* Save Changes */}
      <div className="flex justify-center w-full my-2">
        <Button
          type="submit"
          className="w-full rounded-sm py-5 md:py-6 cursor-pointer bg-[#06005B]"
          disabled={isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
