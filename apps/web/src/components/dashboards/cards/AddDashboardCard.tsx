"use client";

import { PlusCircle } from "lucide-react";
import { CreateEntityCard } from "../../molecules/cards/CreateEntityCard";
import { useState } from "react";
import { CreateDashboardModal } from "../modals";

export const AddDashboardCard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <CreateEntityCard
        idleLabel="New Dashboard"
        creatingLabel="Creating…"
        icon={<PlusCircle className="w-8 h-8" />}
        create={async (_signal) => {
          setOpenModal(true);
          return null;
        }}
        getSuccessPath={() => "#"}
        ariaLabel="Create new dashboard"
        onFinish={() => {}}
      />
      {openModal && <CreateDashboardModal open={openModal} setOpen={setOpenModal} />}
    </>
  );
};
