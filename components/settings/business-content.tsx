'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LoadingSpinner from "../spinner";
import { useEffect } from "react";
import LoadingButton from "../loading-button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSettings } from "@/hooks/useSettings";
import type { FieldErrors } from "react-hook-form";
import type { BusinessFormValues } from "@/lib/validations/settings";

export default function BusinessSettings() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    },
    avatarPreview,
    handleAvatarChange,
    onSubmit,
  } = useSettings("business");

  const businessErrors = errors as FieldErrors<BusinessFormValues>;

  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (user && !loading) {
      reset({
        businessName: user.business_name || "",
        businessEmail: user.email || "",
        businessPhone: user.business_phone || "",
        businessAddress: user.business_address || "",
        businessType: user.business_type || "",
        currency: user.currency || "",
        type: "business",
      });
    }
  }, [user, loading, reset]);

  return isSubmitting || loading ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("handleSubmit triggered");
        onSubmit(data);
      })}
      className="flex flex-col px-6 space-y-5 max-w-md mx-auto"
    >
      <input type="hidden" {...register("type")} value="business" />
      {/* Avatar */}
      <div className="flex flex-col gap-2 items-center justify-center space-y-2">
        <Avatar className="w-30 h-30">
          <AvatarImage src={avatarPreview || ''} alt="Avatar" />
          <AvatarFallback className="font-bold text-gray-600 text-base">
            {user?.business_name
              ? user.business_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              : 'OG'}
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
        {businessErrors.businessName && (
          <p className="text-sm text-red-500">
            {businessErrors.businessName.message}
          </p>
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
        {businessErrors.businessEmail && (
          <p className="text-sm text-red-500">
            {businessErrors.businessEmail.message}
          </p>
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
        {businessErrors.businessPhone && (
          <p className="text-sm text-red-500">
            {businessErrors.businessPhone.message}
          </p>
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
        {businessErrors.businessAddress && (
          <p className="text-sm text-red-500">
            {businessErrors.businessAddress.message}
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
          <option value="">Select Business Type</option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="Limited partnership">Limited partnership</option>
          <option value="Joint Venture">Joint venture</option>
          <option value="General partnership">General partnership</option>
          <option value="Other">Other</option>
        </select>
        {businessErrors.businessType && (
          <p className="text-sm text-red-500">
            {businessErrors.businessType.message}
          </p>
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
          <option value="USD">USD </option>
          <option value="EUR">EUR </option>
          <option value="GBP">GBP </option>
          <option value="NGN">NGN </option>
          <option value="CAD">CAD</option>
        </select>
        {businessErrors.currency && (
          <p className="text-sm text-red-500">
            {businessErrors.currency.message}
          </p>
        )}
      </div>

      {/* Save Changes */}
      <div className="flex justify-center w-full my-2">
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="rounded-sm bg-[#06005B] hover:bg-blue-900 w-full py-3 text-white"
        >
          Save Changes
        </LoadingButton>
      </div>
    </form>
  );
}
