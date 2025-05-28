import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => (
  <header className="flex items-center justify-end h-16 px-6 py-8 bg-[#0A0A4A]">
    <div className="flex gap-2">
      <button className="mr-4 text-white text-xl">
        <Image
          src="/icon/message.svg"
          alt="notification icon"
          height={30}
          width={30}
          className="mr-3"
        />
      </button>
      <button className="text-white text-xl">
        <Image
          src="/icon/profile.svg"
          alt="notification icon"
          height={30}
          width={30}
          className="mr-3"
        />
      </button>
    </div>
  </header>
);

export default Navbar;
