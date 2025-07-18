"use client";

import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

});

export const userSignUpSchema = z.object({
  business_name: z.string().min(2, { message: "Organization name is required" }),
  full_name: z.string().min(2, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  country: z.string().nonempty({ message: "Country is required" }),
  state: z.string().nonempty({ message: "State/Province is required" }),
  currency: z.string().nonempty({ message: "Currency is required" }),
  business_type: z.string().nonempty({message:"Business type is required"})
 
});
