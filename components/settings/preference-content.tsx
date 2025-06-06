"use client";

import { Label } from "@/components/ui/label";
import LoadingSpinner from "../spinner";
import { useBusiness } from "@/hooks/useBusiness";

export default function PreferenceSettings() {
  return (
    <form className="flex flex-col py-6 px-6 space-y-5 max-w-md mx-auto">
      {/* Business Name */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="businessName"
          className="text-xs text-gray-600 font-semibold"
        >
          Email Notifications
        </Label>
      </div>
    </form>
  );
}
