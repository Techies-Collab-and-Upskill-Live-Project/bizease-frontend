import { Button } from '@/components/ui/button';
import { aboutBiz } from '@/constants';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <section className="min-w-full min-h-screen mb-10">
      <div className="flex justify-start bg-darkblue w-full py-4 px-8">
        <Link href={'/'} className="p-1 hover:bg-lightblue rounded-full w-fit">
          <ChevronLeft className=" h-6 w-6 text-surface-200" />
        </Link>
      </div>

      <div className="px-10 my-8">
        <h1 className="font-bold text-darkblue text-2xl">{aboutBiz.title}</h1>
        <p className="mt-5 text-sm text-surface-500">{aboutBiz.subTitle}</p>

        <p className="mt-5 text-sm text-surface-500">{aboutBiz.sub}</p>

        <h2 className="mt-5 text-xl font-semibold text-darkblue">
          {aboutBiz.missionHead}
        </h2>
        <p className="mt-2 text-sm text-surface-500">{aboutBiz.missionSub}</p>
        <p className="mt-2 text-sm text-surface-500">{aboutBiz.missionSub2}</p>
        <h2 className="mt-5 text-xl font-semibold text-darkblue">
          {aboutBiz.amazingHead}
        </h2>

        <p className="mt-1 text-sm text-surface-500">{aboutBiz.amazingSub}</p>

        <ul className="mt-4 list-disc list-inside text-sm space-y-2 text-surface-500">
          {aboutBiz.amazingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-5 text-xl font-semibold text-darkblue">
          {aboutBiz.builtForH}
        </h2>

        <p className="mt-1 text-sm text-surface-500">{aboutBiz.builtsub}</p>

        <h4 className="mt-5 text-sm font-semibold text-darkblue">
          {aboutBiz.ready}
        </h4>
        <footer className="my-4 flex items-center gap-2 text-sm text-surface-500">
          <Link href={'/sign-up'}>
            <Button className="font-normal text-[12px] bg-darkblue text-surface-200 hover:bg-lightblue cursor-pointer">
              Try BizEase Today
            </Button>
          </Link>
          - and take the hassle out of hustle
        </footer>
      </div>
    </section>
  );
};

export default AboutPage;
