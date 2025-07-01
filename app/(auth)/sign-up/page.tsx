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
import useSignUp from "@/hooks/useSignUp";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import useLocation from "@/hooks/useLocation";
import LoadingButton from "@/components/loading-button";

type SignUpFormData = {
  business_name: string;
  full_name: string;
  email: string;
  password: string;
  country: string;
  state: string;
  currency: string;
  business_type: string;
};

const SignUp = () => {
  const { signUpSchema, onSubmit } = useSignUp();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const {
    countries,
    states,
    countryCurrencies,
    setCountryCode,
    countriesLoading,
    statesLoading,
  } = useLocation();

  const submit = async (data:SignUpFormData) => {
    if (loading) return;
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screenbg-gray-100 ">
      {/* Top Section */}
      <div className="flex py-20 md:py-30 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <Image
          width={60}
          height={58}
          src="/icon/logo-2.png"
          alt="logo"
          className="w-10 h-10"
        />
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
            onSubmit={signUpSchema.handleSubmit(submit)}
            className="space-y-5 md:space-y-6"
          >
            {/* organization */}
            <FormField
              control={signUpSchema.control}
              name="business_name"
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
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Fullname
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
                        type={showPassword ? "text" : "password"}
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
                    <FormLabel className="text-xs md:text-sm font-semibold">
                      Country
                    </FormLabel>
                    <FormControl>
                      {countriesLoading ? (
                        <div className="w-full py-2 text-center text-xs">
                          Loading…
                        </div>
                      ) : (
                        <select
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setCountryCode(e.target.value); // informs the hook
                          }}
                          className="w-full border rounded-md px-3 py-2 text-xs"
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* State/Province Dropdown */}
              <FormField
                control={signUpSchema.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xs md:text-sm font-semibold">
                      State / Province
                    </FormLabel>
                    <FormControl>
                      {statesLoading ? (
                        <div className="w-full py-2 text-center text-xs">
                          Loading…
                        </div>
                      ) : (
                        <select
                          {...field}
                          disabled={!states.length}
                          className="w-full border rounded-md px-3 py-2 text-xs"
                        >
                          <option value="">Select State</option>
                          {states.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      )}
                    </FormControl>
                    <FormMessage className="text-xs" />
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
                  <FormLabel className="text-xs md:text-sm font-semibold">
                    Currency
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={!countryCurrencies.length}
                      className="w-full border rounded-md px-3 py-2 text-xs"
                    >
                      <option value="">Select Currency</option>
                      {countryCurrencies.map((cur) => (
                        <option key={cur} value={cur}>
                          {cur}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Business Type */}
            <FormField
              control={signUpSchema.control}
              name="business_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold tracking-wide">
                    Business Type
                  </FormLabel>
                  <FormControl>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-xs"
                      {...field}
                    >
                      <option value="">Select Business Type</option>
                      <option value="Nonprofit">Nonprofit</option>
                      <option value="Limited partnership">
                        Limited partnership
                      </option>
                      <option value="Joint Venture">Joint venture</option>
                      <option value="General partnership">
                        General partnership
                      </option>
                      <option value="Other">Other</option>
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
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                  />
                </div>
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>

            {/* Submit */}
            <LoadingButton
              loading={loading}
              type="submit"
              disabled={loading || !agreedToTerms}
              className=" bg-[#06005B] hover:bg-blue-900 w-full py-3"
            >
              Sign Up
            </LoadingButton>
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
            <Image
              width={60}
              height={58}
              src={"/google.png"}
              alt="google-icon"
              className="w-10 h-10 cursor-pointer"
            />
            <Image
              width={60}
              height={58}
              src={"/apple.png"}
              alt="apple-icon"
              className="w-10 h-10 cursor-pointer"
            />
            <Image
              width={60}
              height={58}
              src={"/microsoft.png"}
              alt="microsoft-icon"
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
