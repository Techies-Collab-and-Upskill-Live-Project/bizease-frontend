'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';

const MobileButtons = () => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="hidden max-md:flex max-w-fit flex-col items-end gap-3">
      {showButton && (
        <span className="flex flex-col gap-2">
          <Button
            onClick={() => {}}
            className=" font-normal bg-darkblue hover:bg-lightblue text-surface-200"
          >
            Add New Order
          </Button>
          <Button
            variant={'ghost'}
            onClick={() => {}}
            className=" font-normal bg-darkblue hover:bg-lightblue text-surface-200"
          >
            Add New Product
          </Button>
        </span>
      )}

      <Button
        onClick={() => setShowButton(!showButton)}
        className=" w-fit p-4 font-semibold bg-darkblue hover:bg-lightblue text-surface-200"
      >
        x
      </Button>
    </div>
  );
};

export default MobileButtons;
