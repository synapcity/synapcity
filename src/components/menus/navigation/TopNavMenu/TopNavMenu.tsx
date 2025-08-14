"use client";

import { Logo } from "@/components/atoms/Logo";
import { useUIStore } from "@/stores";
import { cn } from "@/utils";
import { useShallow } from "zustand/shallow";
import { ActionsContainer } from "../ActionsContainer/ActionsContainer";
import { NavContainer } from "../NavContainer/NavContainer";
import { landingNavItems, mainNavItems } from "@/lib";

export function TopNavMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const isSiteFocused = useUIStore(useShallow((s) => s.isSiteFocus));
  const header = useUIStore(useShallow((s) => s.components.header));
  const getCompState = useUIStore((s) => s.getCompState);

  const isHeaderVisible = header ? getCompState("header", "isVisible") : true;
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between px-4 py-2 text-[var(--foreground)] transition-opacity duration-300",
        {
          "opacity-0 -translate-y-full": !isHeaderVisible,
          "opacity-100 translate-y-0": isHeaderVisible && !isSiteFocused,
        }
      )}
    >
      <Logo size={32} variant="mark" title="SynapCity" />
      <NavContainer links={isLoggedIn ? mainNavItems : landingNavItems} />
      <ActionsContainer />
    </div>
  );
}
