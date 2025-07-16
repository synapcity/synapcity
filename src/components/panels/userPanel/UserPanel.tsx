"use client";

import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { UserPanelHeader } from "./UserPanelHeader/UserPanelHeader";
import { SidebarWrapper } from "@/components/menus/sidebar/SidebarWrapper";
import { UserPanelSidebar } from "./UserPanelSidebar/UserPanelSidebar";
import { UserPanelIconSidebar } from "./UserPanelIconSidebar/UserPanelIconSidebar";
import { ActivePanelRenderer } from "./ActivePanelRenderer/ActivePanelRenderer";
import { motion } from "framer-motion";
import { Suspense } from "react";

export const UserPanel = () => {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "350px" } as React.CSSProperties}
    >
      <div className="w-full max-h-full flex flex-col border-t-[3px] border-t-accent-200">
        <div className="flex-1 flex h-full">
          <SidebarWrapper
            iconSidebarContent={<UserPanelIconSidebar />}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <UserPanelSidebar />
            </Suspense>
          </SidebarWrapper>
          <motion.div
            layout
            transition={{ type: "spring", duration: 0.3 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <UserPanelHeader />
            <Suspense fallback={<div>Loading...</div>}>
              <ActivePanelRenderer />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </SidebarProvider>
  )
}