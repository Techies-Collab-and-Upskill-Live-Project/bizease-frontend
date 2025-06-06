import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessSchema, BusinessFormValues } from "@/lib/validations/settings";
import { useState } from "react";

export const useBusiness = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessEmail: "",
      businessPhone: "",
      businessType: "",
      currency: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      form.setValue("avatar", file);
    }
  };

  const onSubmit = (data: BusinessFormValues) => {
    // Handle business form submission logic here
    console.log("Business form data:", data);
  };

  return {
    form,
    handleAvatarChange,
    avatarPreview,
    onSubmit,
  };
};
