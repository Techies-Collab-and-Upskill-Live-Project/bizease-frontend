"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import useLogin from "@/hooks/useLogin";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const LogIn = () => {
  const { loginSchema, onSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Top Section */}
      <div className="flex py-20 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <img src="/icon/logo-2.png" alt="logo" className="w-10 h-10" />
        <p className="text-2xl font-bold">Bizease</p>
      </div>

      {/* Floating Form */}
      <div className="absolute top-38 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md bg-white rounded-lg shadow-2xl z-10 p-6">
        {/* Welcome Header */}
        <div className="text-center mb-6 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Welcome back!</h2>
          <p className="text-xs font-semibold text-gray-500 tracking-wide">
            Log in to get back to managing your business.
          </p>
        </div>

        <Form {...loginSchema}>
          <form
            onSubmit={loginSchema.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email */}
            <FormField
              control={loginSchema.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wide">
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
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none w-4 h-4" />
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
                  <FormLabel className="text-xs font-semibold tracking-wide">
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Remember Me*/}
            <label className="flex items-center gap-2 text-xs">
              <div className="p-[1.5px] rounded-sm bg-gradient-to-b from-blue-800 to-blue-600">
                <Checkbox
                  id="remember"
                  className="bg-white w-4 h-4 border-none flex items-center justify-center"
                />
              </div>
              Remember me
            </label>

            {/* Submit */}
            <Button type="submit" className="w-full bg-[#06005B] text-xs font-semibold tracking-wide">
              Sign In
            </Button>

            {/* Forgot Password */}
            <div className="w-full flex justify-center items-center">
              <a href="#" className=" text-[13px] underline ">
                Forgot your password?
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
