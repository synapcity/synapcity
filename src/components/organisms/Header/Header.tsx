"use client";

import dynamic from "next/dynamic";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";
import { IdleControlled } from "@/components/molecules";
import { useEffect } from "react";

const TopNavMenu = dynamic(() =>
  import("@/components/menus/navigation/TopNavMenu/TopNavMenu").then((mod) => mod.TopNavMenu),
  { ssr: false }
);

const UserPanelShell = dynamic(() =>
  import("@/components/panels/userPanel/UserPanelShell/UserPanelShell").then((mod) => mod.UserPanelShell), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const Header = () => {
  const panelState = useUIStore((s) => s.components["user-panel"] ?? {});
  const isLocked = panelState.isLocked ?? false;
  const isOpen = panelState.isVisible ?? false;
  const setCompState = useUIStore((s) => s.setCompState)

  useEffect(() => {
    if (!isLocked || !isOpen) {
      setCompState("main-header", "isCollapsed", false);
    }
  }, [isLocked, isOpen, setCompState]);


  return (
    <UserPanelShell>
      <IdleControlled
        id="main-header"
        delay={5000}
        hoverOverlay
        enabled={isLocked && isOpen}
        shouldEnable={() => panelState?.isLocked ?? false}
        elementEvents={["mouseover", "mouseenter"]}
      >
        <div className="w-full transition-all duration-300">
          <header
            style={{ "--header-height": "4.5rem" } as React.CSSProperties}
            className={cn(
              "w-full h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70",
              "border-b border-border",
              "shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-shadow z-50 sticky top-0"
            )}
          >
            <TopNavMenu />
          </header>
        </div>
      </IdleControlled>
    </UserPanelShell>
  );
};
