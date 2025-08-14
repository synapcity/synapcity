"use client";

import dynamic from "next/dynamic";
import { cn } from "@/utils";
import { useUIStore, useUserStore } from "@/stores";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { HeaderWrapper } from "@/landing-page/components/Header/HeaderWrapper";

const TopNavMenu = dynamic(
  () => import("@/components/menus/navigation/TopNavMenu/TopNavMenu").then((mod) => mod.TopNavMenu),
  { ssr: false }
);

export const Header = () => {
  const userPanel = useUIStore((s) => s.components.userPanel);
  const header = useUIStore((s) => s.components.header);
  const isSiteFocused = useUIStore((s) => s.isSiteFocus);
  const setCompState = useUIStore((s) => s.setCompState);
  const getCompState = useUIStore((s) => s.getCompState);
  const isLoggedIn = useUserStore(useShallow((s) => !!s.user));

  const isLocked = userPanel ? getCompState("userPanel", "isLocked") : false;
  const isPanelOpen = userPanel ? getCompState("userPanel", "isVisible") : false;
  const isHeaderVisible = header ? getCompState("header", "isVisible") : true;

  const shouldHide = isSiteFocused || (isLocked && isPanelOpen);

  useEffect(() => {
    setCompState("header", "isVisible", !shouldHide);
  }, [shouldHide, setCompState]);

  const timeoutRef = useRef<number>(0);
  const showHeader = () => {
    window.clearTimeout(timeoutRef.current);
    setCompState("header", "isVisible", true);
  };
  const hideHeaderDelayed = () => {
    if (!shouldHide) return;
    timeoutRef.current = window.setTimeout(() => {
      setCompState("header", "isVisible", false);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <HeaderWrapper visible={isHeaderVisible!}>
        <TopNavMenu isLoggedIn={false} className={"text(--foreground)"} />
      </HeaderWrapper>
    );
  }

  return (
    <div className="w-full">
      <header
        style={{ "--header-height": "3.5rem" } as React.CSSProperties}
        className={cn(
          "sticky top-0 z-[50] backdrop-blur bg-(--surface-inverse) text-foreground transition-shadow @container",
          {
            "h-1 bg-black/50": !isHeaderVisible,
            "h-[var(--header-height)] drop-shadow-sm": isHeaderVisible,
          }
        )}
        onMouseEnter={showHeader}
        onMouseLeave={hideHeaderDelayed}
      >
        <TopNavMenu
          isLoggedIn={isLoggedIn}
          className={"text-(--background) active:text-(--foreground) hover:text-(--foreground)"}
          activeClassName={"hover:text-(--background)"}
        />
      </header>
    </div>
  );
};
