"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Logout() {

  const route = useRouter();
  const handleLogout = () => {
    // Routing back to login page for now
    route.push("/login");
  };

  return (
    <Button
      variant={"outline"}
      className="font-semibold text-xs text-gray-700 border-[#06005B] cursor-pointer md:text-sm lg:hidden"
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
}
