
"use client"

import { useRef, PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { Collapsible, CollapsibleContent } from "@/components/atoms/ui/collapsible";
import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { UserPanelHeader } from "../UserPanelHeader/UserPanelHeader";
import { SidebarWrapper } from "@/components/menus/sidebar/SidebarWrapper";
import { UserPanelSidebar } from "../UserPanelSidebar/UserPanelSidebar";
import { UserPanelIconSidebar } from "../UserPanelIconSidebar/UserPanelIconSidebar";
import { cn } from "@/utils";
import { ActivePanelRenderer } from "../ActivePanelRenderer/ActivePanelRenderer";
import { useComponentUIState, useUIStore } from "@/stores";

export const UserPanelShell = ({ children }: PropsWithChildren) => {
  const isOpen = useUIStore((s) => s.components)["user-panel"].isVisible ?? false;
  const isLocked = useUIStore((s) => s.components)["user-panel"].isLocked ?? false;
  const setComponentUIState = useUIStore((s) => s.setComponent);
  const header = useComponentUIState("main-header")
  const isHeaderOpen = !header.isCollapsed

  const clickAwayRef = useRef(null);
  useClickAway(clickAwayRef, () => {
    if (!isLocked) setComponentUIState("user-panel", { isVisible: false });
  });

  return (
    <Collapsible open={isOpen} onOpenChange={(v) => setComponentUIState("user-panel", { isVisible: v })} ref={clickAwayRef} className="h-full max-h-full">
      {children}
      <AnimatePresence>
        {isOpen && (
          <CollapsibleContent
            forceMount
            className="overflow-hidden h-full"
          // style={{ height: panelHeight ? `${panelHeight}px` : undefined }}
          >
            <motion.div
              key="user-panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn("h-full relative z-20 border-t border-border bg-background/60 backdrop-blur-md shadow-[inset_0_-1px_4px_rgba(0,0,0,0.04)]", {
                "h-[calc(100%-6rem)]": isOpen && isHeaderOpen,
                "h-full": isOpen
              })}
            >
              <SidebarProvider style={{ "--sidebar-width": "350px" } as React.CSSProperties}>
                <div className="w-full  flex flex-col border-t-[3px] border-t-accent-200">
                  <UserPanelHeader />

                  <div className="flex-1 flex h-full">
                    <SidebarWrapper
                      iconSidebarContent={<UserPanelIconSidebar />}
                    >
                      <UserPanelSidebar />
                    </SidebarWrapper>
                    <ActivePanelRenderer />
                  </div>
                </div>
              </SidebarProvider>
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible >
  );
};
