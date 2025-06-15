'use client';

import React from 'react';
import { Button } from '../ui/button';
import { user } from '@/constants';
import AddButton from '../shared/AddButton';
import AddOrderModal from '../modals/AddOrderModal';

const UsernameAndButtons = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="flex text-center justify-between">
      <div className="mb-3">
        <h1 className="text-xl font-bold">Welcome</h1>
        <div className="text-sm text-left font-semibold mb-2">{user.name}</div>
      </div>

      <div className="flex items-center gap-2 max-md:hidden">
        <>
          <Button
            onClick={() => setShowModal(true)}
            className=" text-darkblue focus-pointer border border-lightblue "
          >
            Add New Order
          </Button>

          {showModal && <AddOrderModal onClose={() => setShowModal(false)} />}
        </>
        <AddButton />
      </div>
    </div>
  );
};

export default UsernameAndButtons;
