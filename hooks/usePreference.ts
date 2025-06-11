import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PreferenceSchema, preferenceSchema } from "@/lib/validations/settings";

export const usePreference = () => {
  const form = useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      new_stocks: true,
      low_stocks: false,
      email_notifications: true,
      message_notifications: false,
      alert_threshold: "5 units",
      default_order_status: "pending",
      language: "en",
    },
  });

  const onSubmit = (data: PreferenceSchema) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
};
