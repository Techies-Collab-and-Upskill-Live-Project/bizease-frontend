"use client";

import TopAvatar from "@/components/navigations/TopAvatar";
import { Options } from "@/components/settings/m-options";
import Logout from "@/components/settings/logout";
import ProfileSettings from "@/components/settings/personal-content";
import { useState } from "react";
import BusinessSettings from "@/components/settings/business-content";
import { PreferenceSettings } from "@/components/settings/preference-content";
import LargeOptionsTab from "@/components/settings/l-options";

const PersonalSettings = () => {
  const [settingType, setSettingType] = useState<
    "Personal Information" | "Business Information" | "Preferences"
  >("Personal Information");
  return (
    <div className="w-full  relative ">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 ">
        <TopAvatar type="Settings" />
      </div>

      {/* Mobile Controls */}
      <div className="p-6 flex lg:flex-col items-center justify-between max-md:p-10  ">
        <Logout />
        <Options settingType={settingType} setSettingType={setSettingType} />
        <LargeOptionsTab
          settingType={settingType}
          setSettingType={setSettingType}
        />
      </div>

      {/*  Content */}
      <div className=" ">
        {settingType === "Personal Information" && <ProfileSettings />}
        {settingType === "Business Information" && <BusinessSettings />}
        {settingType === "Preferences" && <PreferenceSettings />}
      </div>
    </div>
  );
};

export default PersonalSettings;
