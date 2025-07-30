'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useInventory } from '@/hooks/useInventory';

const AddFailurePage = () => {
  const params = useParams();
  const id = Number(params.id);
  const { inventory } = useInventory();

  const product = inventory.find((item) => item.id === id);
  console.log('Product:', product);

  return (
    <section className="flex-center h-screen w-full bg-surface-100 px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
        <Image
          width={60}
          height={60}
          alt="Failure Icon"
          src="/icon/failure.svg"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something Went Wrong
          </h1>
          <p className="text-sm text-red-500 mt-2">
            {product
              ? `Failed to add "${product.product_name}". Please try again.`
              : 'Product could not be added. Please try again.'}
          </p>
        </div>
        <Link href="/inventory" className="w-full">
          <Button
            variant="outline"
            className="w-full text-sm border-red-500 text-red-500 hover:bg-red-50"
          >
            Back to Inventory
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AddFailurePage;
