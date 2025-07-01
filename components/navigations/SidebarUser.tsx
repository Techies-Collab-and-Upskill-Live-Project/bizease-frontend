'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SidebarUser = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex items-center justify-start gap-4 bg-gradient p-4 rounded w-[180px] my-8">
        <p className="text-sm text-gray-400">Loading user...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-start gap-4 bg-gradient p-4 rounded w-[180px] my-8">
        <p className="text-sm text-red-500">Failed to load user</p>
      </div>
    );
  }

  const { full_name, business_type } = user;
  const initials = full_name
    ?.trim()
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-start gap-4 bg-gradient p-4 rounded w-[180px] mt-8">
      <div className="bg-surface-100 rounded-full flex justify-center items-center w-10 h-10 shrink-0">
        <p className="font-bold text-darkblue">{initials}</p>
      </div>

      <div className="flex flex-col space-y-1 overflow-hidden w-full">
        <Tooltip content={full_name}>
          <p className="text-surface-100 font-medium text-[14px] truncate whitespace-nowrap overflow-hidden text-ellipsis cursor-default">
            {full_name}
          </p>
        </Tooltip>

        <Tooltip content={business_type}>
          <p className="text-surface-200 text-[10px] truncate whitespace-nowrap overflow-hidden text-ellipsis cursor-default">
            {business_type}
          </p>
        </Tooltip>
      </div>
    </div>
  );
};

export default SidebarUser;
