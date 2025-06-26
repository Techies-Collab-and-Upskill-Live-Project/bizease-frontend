"use client";

import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarUser = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) {
    return (
      <div className="p-4 mt-8">
        <p className="text-sm text-gray-400">Loading user...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-4 mt-8">
        <p className="text-sm text-red-500">Failed to load user</p>
      </div>
    );
  }

  const { full_name, business_type } = user;
  const initials = full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-start gap-4 bg-gradient p-4 rounded w-[180px] mt-8">
      <div className="bg-surface-100 rounded-full flex justify-center items-center w-10 h-10">
        <p className="font-bold text-darkblue">{initials}</p>
      </div>

      <div className="flex flex-col space-y-1 w-fit">
        <p className="text-surface-100 font-medium text-[14px]">{full_name}</p>
        <p className="text-surface-200 text-[10px]">{business_type}</p>
      </div>
    </div>
  );
};

export default SidebarUser;
