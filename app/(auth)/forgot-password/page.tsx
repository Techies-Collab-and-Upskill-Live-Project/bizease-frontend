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
import { Mail } from "lucide-react";
import useForgotPassoword from "@/hooks/useForgotPassword";
import LoadingSpinner from "@/components/spinner";

const SignUp = () => {
  const { resetSchema, onSubmit } = useForgotPassoword();

  return (
    <div className="min-h-screen bg-[#F5F5F5] ">
      {/* Top Section */}
      <div className="flex py-25 md:py-40 items-center justify-center gap-2 bg-gradient-to-b rounded-b-lg from-blue-800 to-blue-600 text-white">
        <img src="/icon/logo-2.png" alt="logo" className="w-10 h-10" />
        <p className="text-2xl font-bold">Bizease</p>
      </div>
      {/* Floating Form */}
      <div className="absolute top-70 md:top-100 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md bg-white rounded-lg shadow-2xl z-10 px-7 py-8">
        {/* Welcome Header */}
        <div className="text-center my-6  md:py-4">
          <h2 className="text-2xl font-semibold">Forgot Your Password</h2>
        </div>

        <Form {...resetSchema}>
          <form
            onSubmit={resetSchema.handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-6"
          >
            {/* Email */}
            <FormField
              control={resetSchema.control}
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
                      <Mail className="absolute right-3 top-1/4 transform -translate-y-1/2 focus:outline-none w-4 h-4" />
                      <p className="text-xs py-3 italic tracking-wide">
                        Enter your email to receive a reset link
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs tracking-wide" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#06005B] hover:bg-blue-900 cursor-pointer py-3 md:py-6 text-xs md:text-sm font-semibold tracking-wide"
            >
              Send Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
