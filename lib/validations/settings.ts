import { z } from "zod";

export const profileSchema = z.object({
  type: z.literal("profile"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.instanceof(File).optional().or(z.any()),
});

export const businessSchema = z.object({
  type: z.literal("business"),
  avatar: z.instanceof(File).optional().or(z.any()),
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessEmail: z.string().email("Invalid business email address"),
  businessPhone: z
    .string()
    .min(10, "Business phone must be at least 10 digits"),
  businessType: z
    .string()
    .min(1, "Business type is required")
    .max(100, "Business type is too long"),
  currency: z
    .string()
    .min(1, "Currency is required")
    .refine((val) => /^[A-Z]{3}$/.test(val), {
      message: "Currency must be a valid 3-letter code (e.g. USD, EUR)",
    }),
});

export const preferenceSchema = z.object({
  type: z.literal("preference"),
  new_stocks: z.boolean(),
  low_stocks: z.boolean(),
  email_notifications: z.boolean(),
  message_notifications: z.boolean(),
  alert_threshold: z.coerce.number(),
  default_order_status: z.string().min(1, "Select a default status"),
  language: z.string(),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PreferenceSchema = z.infer<typeof preferenceSchema>;
