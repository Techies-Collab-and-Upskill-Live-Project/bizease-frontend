import { user } from '@/constants';
import React from 'react';

const SidebarUser = () => {
  const { id, businessPlan, name } = user;
  return (
    <div className="flex items-center justify-start gap-4 bg-gradient p-4 rounded w-[180px] mt-8">
      <div className="bg-surface-100 rounded-full flex justify-center items-center w-10 h-10">
        <p className="font-bold text-darkblue">JT</p>
      </div>

      <div className="flex flex-col space-y-1 w-fit">
        <p className="text-surface-100 font-medium text-[16px]">{name}</p>
        <p className="text-surface-200 text-[10px]">{businessPlan}</p>
      </div>
    </div>
  );
};

export default SidebarUser;
