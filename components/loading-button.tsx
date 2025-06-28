"use client";

import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
  spinnerClassName?: string;
}

export default function LoadingButton({
  loading,
  spinnerClassName = "w-5 h-5 border-2 border-white border-t-transparent",
  children,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || rest.disabled}
      {...rest}
      className={`relative flex items-center justify-center  cursor-pointer${
        rest.className || ""
      }`}
    >
      {loading ? (
        <div className={`${spinnerClassName} rounded-full animate-spin`} />
      ) : (
        children
      )}
    </Button>
  );
}
