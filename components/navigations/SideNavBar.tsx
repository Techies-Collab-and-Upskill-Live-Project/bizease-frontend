'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { navItems } from '@/constants';

import SidebarUser from './SidebarUser';
import CustomLogo from '../CustomLogo';

const SideNavbar = () => {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + '/');

  return (
    <section className="sidebar sticky hidden lg:block ">
      <nav className="flex flex-col  gap-2">
        <CustomLogo type="BizEase" />
        <SidebarUser />
        {navItems.map(({ name, route, id, iconPath }) => (
          <Link
            key={id}
            href={route}
            className={cn(
              'sidebar-link rounded-md',
              isActive(route)
                ? 'bg-gradient  text-surface-100'
                : 'text-surface-100 hover:bg-gradient',
            )}
          >
            <Image src={iconPath} alt={`${name}-icon`} width={24} height={24} />
            {name}
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default SideNavbar;
