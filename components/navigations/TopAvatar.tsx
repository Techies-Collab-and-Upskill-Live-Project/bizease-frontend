import Image from 'next/image';
import CustomLogo from '../CustomLogo';
import Link from 'next/link';

const TopAvatar = ({ type }: CustomLogoProp) => {
  return (
    <div className="mobile-top justify-end max-md:justify-between w-full">
      <div className="hidden max-md:flex gap-2">
        <CustomLogo type={type} />
      </div>
      <div className="flex gap-1 ">
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
