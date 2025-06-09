import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PreferenceSchema, preferenceSchema } from "@/lib/validations/settings";
import { toast } from "sonner";

export const usePreference = () => {
  const form = useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      new_stocks: false,
      low_stocks: true,
      alert_threshold: "5 units"
    },
  });

  const onSubmit = (data: PreferenceSchema) => {};

  return {
    form,
    onSubmit,
  };
};
