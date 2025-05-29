"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSignUpSchema } from "@/lib/validations/auth";

export default function useSignUp() {
  const signUpSchema = useForm<z.infer<typeof userSignUpSchema>>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      organization: "",
      country: "",
      state: "",
      currency: "",
    },
  });

  const onSubmit = (values: z.infer<typeof userSignUpSchema>) => {
    // We will handle the form submission here, e.g., send data to a server or store it
    console.log(values);
  };

  return { signUpSchema, onSubmit };
}
