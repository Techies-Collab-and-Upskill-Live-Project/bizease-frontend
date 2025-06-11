'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import useSignUp from '@/hooks/useSignUp';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const SignUp = () => {
  const { signUpSchema, onSubmit } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screenbg-gray-100 ">
      {/* Top Section */}
      <div className="flex py-20 md:py-30 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <img src="/icon/logo-2.png" alt="logo" className="w-10 h-10" />
        <p className="text-2xl font-bold">Bizease</p>
      </div>

      {/* Floating Form */}
      <div className="absolute top-35 md:top-55 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md bg-white rounded-lg shadow-2xl z-10 p-6">
        {/* Welcome Header */}
        <div className="text-center mb-6 flex flex-col gap-2 md:py-4">
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <p className="text-xs font-semibold text-gray-500 tracking-wide">
            Create Your Free Account in Seconds.
          </p>
        </div>

        <Form {...signUpSchema}>
          <form
            onSubmit={signUpSchema.handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-6"
          >
            {/* organization */}
            <FormField
              control={signUpSchema.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Business / Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Acme Corp"
                      className="text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* username */}
            <FormField
              control={signUpSchema.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="username"
                      className="text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={signUpSchema.control}
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
              control={signUpSchema.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="*********"
                        className=" pr-10 text-sm"
                        {...field}
                      />
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 focus:outline-none text-black"
                      >
                        {showPassword ? (
                          <EyeOff size={24} className="cursor-pointer" />
                        ) : (
                          <Eye size={24} className="cursor-pointer" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {/* Country Dropdown */}
              <FormField
                control={signUpSchema.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                      Country
                    </FormLabel>
                    <FormControl>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-xs"
                        {...field}
                      >
                        <option value="" className="text-gray-500">
                          Select Country
                        </option>
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="au">Australia</option>
                        {/* Add more countries as needed */}
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs tracking-wide" />
                  </FormItem>
                )}
              />

              {/* State/Province Dropdown */}
              <FormField
                control={signUpSchema.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                      State/Province
                    </FormLabel>
                    <FormControl>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-xs"
                        {...field}
                      >
                        <option value="" className="text-gray-500">
                          Select State
                        </option>
                        <option value="ca">California</option>
                        <option value="ny">New York</option>
                        <option value="tx">Texas</option>
                        {/* Dynamically populate based on country if needed */}
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs tracking-wide" />
                  </FormItem>
                )}
              />
            </div>

            {/* Currency */}
            <FormField
              control={signUpSchema.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Currency
                  </FormLabel>
                  <FormControl>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-xs"
                      {...field}
                    >
                      <option value="" className="text-gray-500">
                        Select Currency
                      </option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Remember Me*/}
            <div className="flex flex-col gap-2  text-xs md:text-sm">
              <label className="flex items-center gap-2">
                <div className="p-[1.5px] rounded-sm bg-gradient-to-b from-blue-800 to-blue-600">
                  <Checkbox
                    id="remember"
                    className="bg-white w-4 h-4 border-none flex items-center justify-center"
                  />
                </div>
                Remember me
              </label>
              <label className="flex items-center gap-2">
                <div className="p-[1.5px] rounded-sm bg-gradient-to-b from-blue-800 to-blue-600">
                  <Checkbox
                    id="terms"
                    className="bg-white w-4 h-4 border-none flex items-center justify-center"
                  />
                </div>
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#06005B] hover:bg-blue-900 cursor-pointer py-3 md:py-6 text-xs md:text-sm font-semibold tracking-wide"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>

      {/* Login Alternatives */}
      <div className="absolute top-240 md:top-284 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md z-10 p-6">
        <div className=" justify-center  flex flex-col gap-3 items-center ">
          <p className="text-gray-500 text-sm tracking-wide">
            -or Signup with-
          </p>
          <div className="flex gap-6 items-center justify-center">
            <img
              src={'/google.png'}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
            <img
              src={'/apple.png'}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
            <img
              src={'/microsoft.png'}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <a href="/log-in" className=" text-[13px] underline ">
            Have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
