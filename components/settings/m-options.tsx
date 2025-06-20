'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown } from 'lucide-react';

type SettingType =
  | 'Personal Information'
  | 'Business Information'
  | 'Preferences';

type OptionsProps = {
  settingType?: SettingType;
  setSettingType?: React.Dispatch<React.SetStateAction<SettingType>>;
};

export function Options({
  settingType = 'Personal Information',
  setSettingType,
}: OptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="py-1 text-xs font-semibold border-[#06005B] lg:hidden"
        >
          <span className="text-gray-700">{settingType}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuRadioGroup
          value={settingType}
          onValueChange={(value) => {
            if (
              value === 'Personal Information' ||
              value === 'Business Information' ||
              value === 'Preferences'
            ) {
              setSettingType?.(value);
            }
          }}
        >
          <DropdownMenuRadioItem value="Personal Information">
            Personal Info
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Business Information">
            Business Info
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Preferences">
            Preferences
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
