import TopAvatar from "@/components/navigations/TopAvatar";
import { Options } from "@/components/settings/m-options";
import Logout from "@/components/settings/logout";

const PersonalSettings = () => {
  return (
    <div className="w-full">
      <TopAvatar type={"Settings"} />

      {/* Settings controls */}
      <div className="p-6 flex items-center justify-between md:p-10">
        <Logout />
        <Options />
      </div>
    </div>
  );
};

export default PersonalSettings;
