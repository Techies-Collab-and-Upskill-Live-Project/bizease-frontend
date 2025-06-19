import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex-center py-10 max-lg:hidden">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-lg font-semibold flex gap-2 text-gray-700">
          <span> &copy; </span>
          {new Date().getFullYear()}
          <span> BizEase</span>
        </p>
        <p className="flex font-medium text-gray-500 underline underline-offset-4 gap-3">
          <Link href={'/about'}>About</Link>
          <Link href={'/contact-us'}>Contact</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
