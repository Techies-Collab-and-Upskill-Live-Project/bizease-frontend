'use client';

import React from 'react';
import { Button } from '../ui/button';
import AddButton from '../shared/InventoryAddButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

const UsernameAndButtons = () => {
  const { user, loading, error } = useCurrentUser();
  const router = useRouter();

  const handleAddOrder = () => {
    router.push('/orders/add-new-order');
  };

  const userDisplayName = loading
    ? 'Loading...'
    : error
    ? `${error}`
    : user?.full_name || 'User';

  return (
    <div className="flex justify-between items-start">
      <div className="mb-3 text-left">
        <h1 className="text-xl font-bold">Welcome</h1>
        <p className="text-sm text-surface-500 font-semibold mb-2">
          {userDisplayName}
        </p>
      </div>

      <div className="flex items-center gap-2 max-lg:hidden md:flex">
        <Button
          onClick={handleAddOrder}
          className="text-darkblue border border-lightblue cursor-pointer"
        >
          Add New Order
        </Button>
        <AddButton />
      </div>
    </div>
  );
};

export default UsernameAndButtons;
