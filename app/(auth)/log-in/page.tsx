"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import useLogin from "@/hooks/useLogin";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";

const LogIn = () => {
  const { loginSchema, onSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Top Section */}
      <div className="flex py-15 md:py-30 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <Image
          width={60} // any appropriate size in pixels
          height={58}
          src="/icon/logo-2.png"
          alt="logo"
          className="w-10 h-10"
        />
        <p className="text-2xl font-bold">Bizease</p>
      </div>

      {/* Floating Form */}
      <div className="absolute top-30 md:top-55 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md bg-white rounded-lg shadow-2xl z-10 p-6">
        {/* Welcome Header */}
        <div className="text-center mb-6 flex flex-col gap-2 ">
          <h2 className="text-2xl font-semibold">Welcome back!</h2>
          <p className="text-xs font-semibold text-gray-500 tracking-wide">
            Log in to get back to managing your business.
          </p>
        </div>

        <Form {...loginSchema}>
          <form
            onSubmit={loginSchema.handleSubmit(async (data) => {
              setLoading(true);
              await onSubmit(data);
              setLoading(false);
            })}
            className="space-y-4 md:space-y-6"
          >
            {/* Email */}
            <FormField
              control={loginSchema.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="username@gmail.com"
                        className="pr-10 text-xs "
                        {...field}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none w-4 h-4" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={loginSchema.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        className=" pr-10 text-sm"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/4 transform -translate-y-1/2focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="cursor-pointer" />
                        ) : (
                          <Eye size={18} className="cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Remember Me*/}
            <label className="flex items-center gap-2 text-xs md:text-sm">
              <div className="p-[1.5px] rounded-sm bg-gradient-to-b from-blue-800 to-blue-600">
                <Checkbox
                  id="remember"
                  className="bg-white w-4 h-4 border-none flex items-center justify-center"
                />
              </div>
              Remember me
            </label>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#06005B] hover:bg-blue-900 cursor-pointer md:py-6 text-xs md:text-sm font-semibold tracking-wide"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Forgot Password */}
            <div className="w-full flex justify-center items-center">
              <a href="/forgot-password" className=" text-[13px] underline ">
                Forgot your password?
              </a>
            </div>
          </form>
        </Form>
      </div>

      {/* Login Alternatives */}
      <div className="absolute top-134 md:top-164 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md z-10 p-6">
        <div className=" justify-center  flex flex-col gap-3 items-center ">
          <p className="text-gray-500 text-sm tracking-wide">-or login with-</p>
          <div className="flex gap-6 items-center justify-center">
            <Image
              width={60} // any appropriate size in pixels
              height={58}
              src={"/google.png"}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
            <Image
              width={60} // any appropriate size in pixels
              height={58}
              src={"/apple.png"}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
            <Image
              width={60} // any appropriate size in pixels
              height={58}
              src={"/microsoft.png"}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <a href="/sign-up" className=" text-[13px] underline ">
            Do not have account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
