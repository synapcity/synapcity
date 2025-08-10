"use client";

import { SidebarInset } from "@/components/atoms/ui/sidebar";
import { UserPanelHeader } from "./ActivePanelRenderer/UserHeader/UserHeader";
import { UserPanelSidebar } from "./UserPanelSidebar/UserPanelSidebar";
import { UserPanelIconSidebar } from "./UserPanelIconSidebar/UserPanelIconSidebar";
import { ActivePanelRenderer } from "./ActivePanelRenderer/ActivePanelRenderer";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { ModalRenderer } from "@/components/modals";
import dynamic from "next/dynamic";
// import { IconSidebar } from "@/components/menus/sidebar";

const UserPanelContainer = dynamic(() =>
  import("../UserPanelContainer").then((mod) => mod.UserContainer)
);

export const UserPanel = () => {
  return (
    <UserPanelContainer>
      <div className="size-full flex-1 flex border-t-[3px] border-t-accent-200">
        <UserPanelIconSidebar />
        <UserPanelSidebar />
        <SidebarInset>
          <motion.div
            layout
            transition={{ type: "spring", duration: 0.3 }}
            className="flex-1 flex flex-col overflow-y-auto flex-1 relative"
          >
            <UserPanelHeader />
            <Suspense fallback={<div>Loading...</div>}>
              <ActivePanelRenderer />
            </Suspense>
            <ModalRenderer scope="userPanelMain" />
          </motion.div>
        </SidebarInset>
      </div>
    </UserPanelContainer>
  );
};
