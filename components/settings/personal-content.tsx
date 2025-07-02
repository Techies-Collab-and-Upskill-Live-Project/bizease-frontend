"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../spinner";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSettings } from "@/hooks/useSettings";
import type { FieldErrors } from "react-hook-form";
import type { ProfileFormValues } from "@/lib/validations/settings";

export default function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);

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
  } = useSettings("profile");
  const profileErrors = errors as FieldErrors<ProfileFormValues>;

  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (user && !loading) {
      reset({
        fullName: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        type: "profile",
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
      <input type="hidden" {...register("type")} value="profile" />

      {/* Avatar */}
      <div className="flex flex-col gap-2 items-center justify-center space-y-3">
        <Avatar className="w-30 h-30">
          <AvatarImage src={avatarPreview || ""} alt="Avatar" />
          <AvatarFallback className="font-bold text-gray-600 text-lg">
            {user?.full_name
              ? user.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "U"}
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
            Change Picture
          </Label>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="fullName"
          className="text-xs text-gray-600 font-semibold"
        >
          Full Name
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="text-xs tracking-wide md:py-6 shadow-sm"
          placeholder="Jessica Reeves"
        />
        {profileErrors.fullName && (
          <p className="text-sm text-red-500">
            {profileErrors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-xs text-gray-600 font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="jessyreeves@gmail.com"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {profileErrors.email && (
          <p className="text-sm text-red-500">{profileErrors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-xs text-gray-600 font-semibold">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="+234 906 4473 435"
          className="text-xs tracking-wide md:py-6 shadow-sm"
        />
        {profileErrors.phone && (
          <p className="text-sm text-red-500">{profileErrors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2 relative">
        <Label
          htmlFor="password"
          className="text-xs text-gray-600 font-semibold"
        >
          Password
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="pr-10 text-xs text-gray-600 tracking-wide md:py-6 shadow-sm"
          placeholder="Password"
        />
        <Button
          type="button"
          onClick={() => setShowPassword((prev: boolean) => !prev)}
          className="absolute right-3 top-6 md:top-8 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
        {profileErrors.password && (
          <p className="text-sm text-red-500">
            {profileErrors.password.message}
          </p>
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
