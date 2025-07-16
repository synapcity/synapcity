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

export const Header = () => {
  const isLocked = useUIStore((s) =>
    s.components.userPanel.isLocked ?? false
  );
  const isOpen = useUIStore((s) =>
    s.components.userPanel.isVisible ?? false
  );
  const setCompState = useUIStore((s) => s.setCompState)

  useEffect(() => {
    if (!isLocked || !isOpen) {
      setCompState("heading", "isCollapsed", false);
    }
  }, [isLocked, isOpen, setCompState]);


  return (
    <IdleControlled
      id="heading"
      delay={5000}
      hoverOverlay
      enabled={isLocked && isOpen}
      shouldEnable={() => isLocked ?? false}
      elementEvents={["mouseover", "mouseenter"]}
    >
      <div className="w-full">
        <header
          style={{ "--header-height": "3.5rem" } as React.CSSProperties}
          className={cn(
            "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70",
            "border-b border-border shadow-sm sticky top-0 flex items-center px-4 z-[9999]"
          )}
        >
          <TopNavMenu />
        </header>
      </div>
    </IdleControlled>
  );
};
