"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Options } from "@/components/settings/m-options";
import Logout from "@/components/settings/logout";
import TopAvatar from "@/components/navigations/TopAvatar";

const BusinessSettings = dynamic(
  () => import("@/components/settings/business-content"),
  { ssr: false }
);
const PreferenceSettings = dynamic(
  () => import("@/components/settings/preference-content"),
  { ssr: false }
);
const ProfileSettings = dynamic(
  () => import("@/components/settings/personal-content"),
  { ssr: false }
);

const tabs = [
  { key: "profile", label: "Personal Information" },
  { key: "business", label: "Business Information" },
  { key: "preferences", label: "Preferences" },
];

type TabKey = "profile" | "business" | "preferences";
type SettingsType =
  | "Personal Information"
  | "Business Information"
  | "Preferences";

const labelToKeyMap: Record<string, TabKey> = {
  "Personal Information": "profile",
  "Business Information": "business",
  Preferences: "preferences",
};

const keyToLabelMap: Record<TabKey, string> = {
  profile: "Personal Information",
  business: "Business Information",
  preferences: "Preferences",
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "business":
        return <BusinessSettings />;
      case "preferences":
        return <PreferenceSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-20 md:px-10 max-w-4xl mx-auto">
      <div className="w-full fixed top-0 left-0 z-50 ">
        <TopAvatar type="Settings" />
      </div>

      {/* Mobile Dropdown */}
      <div className="mb-6 lg:hidden flex items-center justify-between mx-auto">
        <Logout />
        <Options
          settingType={keyToLabelMap[activeTab] as SettingsType}
          setSettingType={(val) => {
            const key = labelToKeyMap[val as SettingsType];
            if (key) setActiveTab(key);
          }}
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:flex justify-between items-center mb-10 border-muted bg-gradient">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={cn(
              "rounded-none text-sm md:text-base mx-auto cursor-pointer text-surface-200 font-medium tracking-wide px-2 py-6 transition-all duration-200 border-b-[3px] border-transparent",
              {
                "border-surface-100": activeTab === tab.key,
              }
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;
