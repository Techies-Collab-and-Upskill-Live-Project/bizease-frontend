'use client';

import Image from 'next/image';
import CustomLogo from '../CustomLogo';
import Link from 'next/link';
import { CustomLogoProp } from '@/types';
import DeleteUserAccount from '../DeleteUserAccount';
import { useState } from 'react';
import { logout } from '@/lib/services/auth';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

const TopAvatar = ({ type }: CustomLogoProp) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="mobile-top justify-end max-lg:justify-between px-3 md:px-6 w-full z-50 relative">
      <div className="hidden max-lg:flex gap-2">
        <CustomLogo type={type} />
      </div>
      <div className="flex gap-2 md:gap-4 items-center">
        <Link href={'/'}>
          <Image
            src={'/icon/notification.png'}
            width={18}
            height={18}
            alt="notification"
          />
        </Link>

        {/* Avatar with dropdown for max-lg only */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="max-lg:flex hidden"
          >
            <Image
              src={'/icon/generic-avatar.svg'}
              width={20}
              height={20}
              alt="avatar"
            />
          </button>

          {/* Always show avatar link on desktop */}
          <Link href={'/dashboard'} className="hidden max-lg:hidden lg:block">
            <Image
              src={'/icon/generic-avatar.svg'}
              width={20}
              height={20}
              alt="avatar"
            />
          </Link>

          {dropdownOpen && (
            <div className="absolute -right-2 top-7.5 mt-2 w-45 bg-gray-100 py-8 px-2 shadow-lg rounded-lg max-lg:block hidden">
              <button
                onClick={handleAllLogout}
                className="block w-full text-center text-darkblue px-4 py-2 rounded-2xl font-semibold bg-darkblue/10  hover:text-gray-100 hover:bg-lightblue "
              >
                Log Out
              </button>
              <div className="flex-center p-2 ">
                <DeleteUserAccount />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopAvatar;
