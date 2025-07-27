"use client";

import dynamic from "next/dynamic";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";
import { useEffect } from "react";

const TopNavMenu = dynamic(() =>
  import("@/components/menus/navigation/TopNavMenu/TopNavMenu").then((mod) => mod.TopNavMenu),
  { ssr: false }
);

export const Header = () => {
  const isLocked = useUIStore((s) =>
    s.components.userPanel.isLocked ?? false
  );
  const isPanelOpen = useUIStore((s) =>
    s.components.userPanel.isVisible ?? false
  );
  const isHeaderVisible = useUIStore((s) =>
    s.components.header.isVisible ?? true
  )
  const setCompState = useUIStore((s) => s.setCompState)

  useEffect(() => {
    if (isHeaderVisible) return;
    if (!isLocked || !isPanelOpen) {
      setCompState("header", "isVisible", true);
    }
  }, [isLocked, isPanelOpen, setCompState, isHeaderVisible]);


  return (
    <div className="w-full">
      <header
        style={{ "--header-height": "3.5rem" } as React.CSSProperties}
        className={cn(
          "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70",
          "border-b border-border shadow-sm sticky top-0 flex items-center z-50 transition-[height] duration-500 ease-linear delay-500",
          {
            "h-4": isLocked && isPanelOpen && !isHeaderVisible
          }
        )}
        onMouseEnter={() => {
          if (!isHeaderVisible) {
            setCompState("heading", "isVisible", true)
          }
        }}
        onMouseLeave={() => {
          if (isLocked && isPanelOpen) {
            setTimeout(() => {
              setCompState("heading", "isVisible", false)
            }, 7500)
          }
        }}
      >
        <TopNavMenu />
      </header>
    </div>
  );
};
