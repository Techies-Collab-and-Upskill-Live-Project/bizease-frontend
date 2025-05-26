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
    <section className="mobile-nav bg-darkblue">
      <nav className="flex justify-between items-center w-full gap-4">
        {navItems.map(({ name, route, id, iconPath }) => (
          <Link
            key={id}
            href={route}
            className={cn(
              'mobile-link text-[8px] rounded-md',
              isActive(route)
                ? 'bg-gradient  text-surface-100'
                : 'text-surface-100 hover:bg-gradient',
            )}
          >
            <Image
              src={iconPath}
              alt={`${name}-icon`}
              width={24}
              height={24}
              className="mx-auto"
            />
            {name}
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default MobileNav;
