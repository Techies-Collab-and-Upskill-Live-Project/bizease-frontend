'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { inventoryItems } from '@/constants';

const AddSuccessPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const product = inventoryItems.find((item) => item.id === id);

  return (
    <section className="flex-center h-screen w-full bg-surface-100 px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
        <Image
          width={60}
          height={60}
          alt="Success Icon"
          src="/icon/success.svg"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-darkblue">Product Updated!</h1>
          <p className="text-sm text-darkblue mt-2">
            {product
              ? `Product "${product.name}" was updated successfully.`
              : 'Product was updated successfully.'}
          </p>
        </div>
        <Link href="/inventory" className="w-full">
          <Button className="w-full bg-darkblue text-white hover:bg-lightblue text-sm">
            Back to Inventory
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AddSuccessPage;
