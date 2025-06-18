'use client';

import { useProfile } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../spinner';
import { useState } from 'react';

export default function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    avatarPreview,
    handleAvatarChange,
    onSubmit,
  } = useProfile();

  return isSubmitting ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-6 space-y-5 max-w-md mx-auto"
    >
      {/* Avatar */}
      <div className="flex flex-col gap-2  items-center justify-center space-y-3 ">
        <Avatar className="w-30 h-30  ">
          <AvatarImage src={avatarPreview || ''} alt="Avatar" />
          <AvatarFallback className="font-bold text-gray-600 text-lg">
            EA
          </AvatarFallback>
        </Avatar>
        <div>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden "
          />
          <Label
            htmlFor="avatar"
            className="text-xs tracking-wide font-semibold cursor-pointer hover:underline"
          >
            Change Picture
          </Label>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-2 ">
        <Label
          htmlFor="fullName"
          className="text-xs text-gray-600 font-semibold"
        >
          Full Name
        </Label>
        <Input
          id="fullName"
          {...register('fullName')}
          className="text-xs tracking-wide md:py-6 shadow-sm"
          placeholder="Jessica Reeves"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2 ">
        <Label htmlFor="email" className="text-xs text-gray-600 font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="jessyreeves@gmail.com"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2 ">
        <Label htmlFor="phone" className="text-xs text-gray-600 font-semibold">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+234 906 4473 435"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2 relative">
        <Label
          htmlFor="password"
          className="text-xs text-gray-500 font-semibold"
        >
          Password
        </Label>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          className="pr-10 text-xs text-gray-500 tracking-wide md:py-6 shadow-sm"
          placeholder="Password"
        />
        <Button
          type="button"
          onClick={() => setShowPassword((prev: boolean) => !prev)}
          className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
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
