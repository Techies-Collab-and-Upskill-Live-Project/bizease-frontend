"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

interface LargeOptionsTabProps {
  settingType: "Personal Information" | "Business Information" | "Preferences";
  setSettingType: Dispatch<
    SetStateAction<
      "Personal Information" | "Business Information" | "Preferences"
    >
  >;
}

export default function LargeOptionsTab({
  settingType,
  setSettingType,
}: LargeOptionsTabProps) {
  return (
    <div className="hidden lg:block mb-4">
      <div className="flex justify-center gap-30 pt-2 px-8 text-white bg-gradient-to-b from-[#004Ec2] to-[#002D6F]">
        {["Personal Information", "Business Information", "Preferences"].map(
          (type) => (
            <button
              key={type}
              className={`p-4 text-left  ${
                settingType === type
                  ? "border-b-4 border-white"
                  : "border-b-4 border-transparent"
              }`}
              onClick={() =>
                setSettingType(
                  type as
                    | "Personal Information"
                    | "Business Information"
                    | "Preferences"
                )
              }
            >
              {type}
            </button>
          )
        )}
      </div>
    </div>
  );
}
