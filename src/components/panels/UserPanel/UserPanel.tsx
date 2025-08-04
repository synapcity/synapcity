"use client";

import { SidebarInset, SidebarProvider } from "@/components/atoms/ui/sidebar";
import { UserPanelHeader } from "./ActivePanelRenderer/UserHeader/UserHeader";
import { SidebarWrapper } from "@/components/menus/sidebar/UserPanelSidebar/SidebarWrapper";
import { UserPanelSidebar } from "./UserPanelSidebar/UserPanelSidebar";
import { UserPanelIconSidebar } from "./UserPanelIconSidebar/UserPanelIconSidebar";
import { ActivePanelRenderer } from "./ActivePanelRenderer/ActivePanelRenderer";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { ModalRenderer } from "@/components/modals";

export const UserPanel = () => {
  return (
    <SidebarProvider
      sidebarId="user-panel-sidebar"
      style={{ "--sidebar-width": "350px" } as React.CSSProperties}
    >
      <div className="size-full flex-1 flex border-t-[3px] border-t-accent-200">
        <SidebarWrapper
          iconSidebarContent={<UserPanelIconSidebar />}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <UserPanelSidebar />
          </Suspense>
        </SidebarWrapper>
        <SidebarInset>
          <motion.div
            layout
            transition={{ type: "spring", duration: 0.3 }}
            className="flex-1 flex flex-col overflow-y-auto h-full relative"
          >
            <UserPanelHeader />
            <Suspense fallback={<div>Loading...</div>}>
              <ActivePanelRenderer />
            </Suspense>
            <ModalRenderer scope="userPanelMain" />
          </motion.div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}