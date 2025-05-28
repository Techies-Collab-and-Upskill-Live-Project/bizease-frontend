"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userAuthSchema } from "@/lib/validations/auth";

export default function useLogin() {
  const loginSchema = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof userAuthSchema>) => {
    // We will do something with the form values later..like maybe store them in a db
    console.log(values);
  };

  return { loginSchema, onSubmit };
}
