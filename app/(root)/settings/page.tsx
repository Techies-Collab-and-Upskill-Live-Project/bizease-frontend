"use client";

import TopAvatar from "@/components/navigations/TopAvatar";
import { Options } from "@/components/settings/m-options";
import Logout from "@/components/settings/logout";
import ProfileSettings from "@/components/settings/personal-content";
import { useState } from "react";
import BusinessSettings from "@/components/settings/business-content";
import { PreferenceSettings } from "@/components/settings/preference-content";

const PersonalSettings = () => {
  const [settingType, setSettingType] = useState<
    "Personal Info" | "Business Info" | "Preferences"
  >("Personal Info");
  return (
    <div className="w-full  relative ">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 ">
        <TopAvatar type="Settings" />
      </div>

      {/* Controls */}
      <div className="p-6 flex items-center justify-between md:p-10">
        <Logout />
        <Options settingType={settingType} setSettingType={setSettingType} />
      </div>

      {/*  Content */}
      <div className=" ">
        {settingType === "Personal Info" && <ProfileSettings />}
        {settingType === "Business Info" && <BusinessSettings />}
        {settingType === "Preferences" && <PreferenceSettings />}
      </div>
    </div>
  );
};

export default PersonalSettings;
