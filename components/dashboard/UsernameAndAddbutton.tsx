"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import AddButton from "../shared/AddButton";
import AddOrderModal from "../modals/AddOrderModal";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const UsernameAndButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, loading, error } = useCurrentUser();

  return (
    <div className="flex text-center justify-between">
      <div className="mb-3 text-left">
        <h1 className="text-xl font-bold">Welcome</h1>
        <div className="text-sm text-left text-surface-500 font-semibold mb-2">
          {loading ? "Loading..." : user?.full_name || `${error}`}
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
