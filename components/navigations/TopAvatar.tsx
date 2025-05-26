import Image from 'next/image';
import CustomLogo from '../CustomLogo';
import Link from 'next/link';

const TopAvatar = ({ type }: CustomLogoProp) => {
  return (
    <div className="mobile-top md:justify-end w-full">
      <div className="hidden max-md:flex">
        <CustomLogo type={type} />
      </div>
      <div className="flex gap-2">
        <Link href={'/'}>
          <Image
            src={'/icon/notification.png'}
            width={24}
            height={24}
            alt="notification"
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/icon/generic-avatar.svg'}
            width={26}
            height={26}
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopAvatar;
