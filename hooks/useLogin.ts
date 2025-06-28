"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userLoginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {
  const router = useRouter();

  const loginSchema = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}accounts/login`,
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
        console.error("Login failed:", error.message || response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Login successful:", result);
      localStorage.setItem("token", result.data.access);

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Unexpected error during login:", error);
    }
  };

  return { loginSchema, onSubmit };
}
