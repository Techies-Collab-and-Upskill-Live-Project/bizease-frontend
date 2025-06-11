import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GerenerateResPage = () => {
  return (
    <section className="flex-center w-full h-screen">
      <div className="flex-center flex-col space-y-9 w-lg px-10">
        <Image
          width={60}
          height={60}
          alt="Success-Icon"
          src={'/icon/failure.svg'}
        />
        <div className="text-center">
          <p className="text-darkblue font-bold">Failed!</p>
          <p className="text-[12px] text-darkblue mt-2">
            Unable to generate report.
          </p>
        </div>
        <Link href={'/report-analytics'} className="w-full mt-4">
          <Button className="bg-darkblue hover:bg-lightblue w-full text-[12px]">
            Back to report
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GerenerateResPage;
