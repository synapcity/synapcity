"use client"

import dynamic from "next/dynamic";
import { cn } from "@/utils";
import { useRef } from "react";

const TopNavMenu = dynamic(() =>
  import("@/components/menus/navigation/TopNavMenu/TopNavMenu").then(mod => mod.TopNavMenu),
  { ssr: false }
);

const UserPanelContainer = dynamic(() =>
  import("@/components/panels/userPanel/UserPanelContainer/UserPanelContainer").then((mod) => mod.UserPanelContainer), {
  ssr: false,
  loading: () => <div>Loading...</div>
}
)
export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  return (
    <UserPanelContainer>
      <header
        ref={headerRef}
        style={{ "--header-height": "4.5rem" } as React.CSSProperties}
        className={cn(
          "w-full h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70",
          "border-b border-border",
          "shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-shadow z-50 sticky top-0"
        )}
      >
        <TopNavMenu />
      </header>
    </UserPanelContainer>
  );
};
