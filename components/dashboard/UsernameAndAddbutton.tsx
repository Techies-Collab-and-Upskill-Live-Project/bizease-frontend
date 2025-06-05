'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import React from 'react';
import { Button } from '../ui/button';
import { user } from '@/constants';

const UsernameAndButtons = () => {
  return (
    <div className="flex text-center justify-between">
      <div className="mb-3">
        <h1 className="text-xl font-bold">Welcome</h1>
        <div className="text-sm text-left font-semibold mb-2">{user.name}</div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={'ghost'}
          onClick={() => {}}
          className=" font-normal text-darkblue border border-lightblue"
        >
          Add New Order
        </Button>

        <Button
          variant={'ghost'}
          onClick={() => {}}
          className=" font-normal text-darkblue border border-lightblue"
        >
          Add New Product
        </Button>
      </div>
    </div>
  );
};

export default UsernameAndButtons;
