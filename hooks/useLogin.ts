"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userLoginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/auth";
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
    await toast.promise(login(values), {
      loading: "Logging in...",
      success: () => {
        router.push("/dashboard");
        return "Logged in successfully!";
      },
      error: (err) => {
        return err?.response?.data.message;
      },
    });
  };

  return { loginSchema, onSubmit };
}
