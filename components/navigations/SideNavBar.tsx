'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { navItems } from '@/constants';

import SidebarUser from './SidebarUser';
import CustomLogo from '../CustomLogo';
import { Button } from '../ui/button';

import { logout } from '@/lib/services/auth';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

const SideNavbar = () => {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + '/');

  const handleAllLogout = async (): Promise<void> => {
    try {
      await logout();

      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        throw new Error('Failed to clear cookies');
      }

      await signOut({ callbackUrl: '/log-in' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Logout failed: ${errorMsg}`);
    }
  };

  return (
    <section className="sidebar sticky hidden lg:block z-100">
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
      <Button
        onClick={handleAllLogout}
        className="flex items-center w-full gap-6 text-surface-300 font-semibold mt-20 hover:bg-gradient underline"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </section>
  );
};

export default SideNavbar;
