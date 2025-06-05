'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function Options() {
  const [selectedOption, setSelectedOption] = React.useState('Personal Info');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="py-1 text-sm font-semibold border-[#06005B] lg:hidden"
        >
          <span className="text-gray-700">{selectedOption} </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-34">
        <DropdownMenuRadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
        >
          <DropdownMenuRadioItem
            className="text-gray-700"
            value="Personal Info"
          >
            Personal Info
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="text-gray-700"
            value="Business Info"
          >
            Business Info
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-gray-700" value="Preferences">
            Preferences
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
