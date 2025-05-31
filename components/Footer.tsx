import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center my-5 max-md:hidden">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-semibold flex gap-2 text-gray-700">
          <span>&copy; </span>
          {new Date().getFullYear()}
          <span> BizEase</span>
        </p>
        <p className="flex font-medium text-gray-500 underline underline-offset-4 gap-3">
          <span>Feature</span>
          <span>About</span>
          <span>Pricing</span>
          <span>Contact</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
