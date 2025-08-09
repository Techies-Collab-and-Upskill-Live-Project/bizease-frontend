import { CustomLogoProp } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const CustomLogo = ({ type = 'BizEase' }: CustomLogoProp) => {
  return (
    <>
      <Link
        href={'/dashboard'}
        className="flex cursor-pointer items-center gap-2"
      >
        <Image
          src={'/icon/logo-2.png'}
          width={30}
          height={30}
          alt="BizEase Logo"
        />
        <h1 className="sidebar-logo">{type}</h1>
      </Link>
    </>
  );
};

export default CustomLogo;
