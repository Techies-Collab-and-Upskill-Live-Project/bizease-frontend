"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSignUpSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const router = useRouter();
  const signUpSchema = useForm<z.infer<typeof userSignUpSchema>>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      business_name: "",
      country: "",
      state: "",
      currency: "",
      business_type: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignUpSchema>) => {
    try {
      console.log("SIGNUP REQUEST TO:", `${process.env.NEXT_PUBLIC_BASE_URL}accounts/signup`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}accounts/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Signup failed:", error.detail || response.statusText);
        return;
      }

      const result = await response.json();
      
      console.log("Signup successful:", result);
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Unexpected error during signup:", error);
    }
  };

  return { signUpSchema, onSubmit };
}
