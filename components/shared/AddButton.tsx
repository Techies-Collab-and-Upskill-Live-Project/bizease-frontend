'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AddButtonProps {
  label?: string;
  className?: string;
}

const AddButton = ({
  label = 'Add New Product',
  className,
}: AddButtonProps) => {
  return (
    <Link href="/inventory/add-product">
      <Button
        className={cn(
          'bg-darkblue hover:bg-lightblue font-normal text-surface-100 cursor-pointer',
          className,
        )}
      >
        {label}
      </Button>
    </Link>
  );
};

export default AddButton;
