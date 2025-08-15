'use client';

import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + '/');

  return (
    <div className=" bg-darkblue rounded-t-sm  py-2 md:py-3 lg:hidden fixed bottom-0 left-0 w-full z-50">
      <nav className=" flex justify-around items-center w-full">
        {navItems.map(({ name, route, id, iconPath }) => (
          <Link
            key={id}
            href={route}
            className={cn(
              'text-center text-[9px] md:text-sm font-semibold rounded-md',
              isActive(route)
                ? 'bg-gradient-to-b from-lightblue to-darkblue  text-surface-100'
                : 'text-surface-100 hover:bg-gradient',
            )}
          >
            <div className="flex  flex-col gap-1 py-2 px-[14px] md:px-9 md:py-3">
              <Image
                src={iconPath}
                alt={`${name}-icon`}
                width={24}
                height={24}
                className="mx-auto"
              />
              <p>{name}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
