"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import AddButton from "../shared/AddButton";
import AddOrderModal from "../modals/AddOrderModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const UsernameAndButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, loading, error } = useCurrentUser();
  const router = useRouter();

  // Optional: redirect if user fetch fails
  React.useEffect(() => {
    if (!loading && (error || !user)) {
      router.push("/log-in");
    }
  }, [loading, error, user, router]);

  return (
    <div className="flex text-center justify-between">
      <div className="mb-3">
        <h1 className="text-xl font-bold">Welcome</h1>
        <div className="text-sm text-left font-semibold mb-2">
          {loading ? "Loading..." : user?.full_name || ""}
        </div>
      </div>

      <div className="flex items-center gap-2 max-md:hidden">
        <>
          <Button
            onClick={() => setShowModal(true)}
            className="text-darkblue cursor-pointer border border-lightblue"
          >
            Add New Order
          </Button>

          {showModal && <AddOrderModal onClose={() => setShowModal(false)} />}
        </>
        <AddButton />
      </div>
    </div>
  );
};

export default UsernameAndButtons;
