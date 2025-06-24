import Image from 'next/image';
import CustomLogo from '../CustomLogo';
import Link from 'next/link';
import { CustomLogoProp } from '@/types';

const TopAvatar = ({ type }: CustomLogoProp) => {
  return (
    <div className="mobile-top justify-end max-lg:justify-between px-3 md:px-6 w-full z-50">
      <div className="hidden max-lg:flex gap-2">
        <CustomLogo type={type} />
      </div>
      <div className="flex gap-2 md:gap-4 items-center ">
        <Link href={'/'}>
          <Image
            src={'/icon/notification.png'}
            width={18}
            height={18}
            alt="notification"
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/icon/generic-avatar.svg'}
            width={20}
            height={20}
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopAvatar;
