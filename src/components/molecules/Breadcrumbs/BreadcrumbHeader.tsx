"use client";

import React, { useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { cn } from "@/utils";
import { CommandShortcut } from "@/components/atoms/ui/command";
import { Separator } from "@/components/atoms/ui/separator";
import { useDynamicBreadcrumbs } from "@/hooks/menus/useDynamicBreadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";

export function BreadcrumbHeader() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const items = useDynamicBreadcrumbs(segments);
  const toggleMain = useUIStore(useShallow(s => s.toggleCompState))

  const breadcrumbsComponent = useUIStore(
    useShallow((s) => s.components["breadcrumbs"])
  );
  const isSiteFocused = useUIStore((s) => s.isSiteFocus);
  const setCompState = useUIStore((s) => s.setCompState);
  const getCompState = useUIStore((s) => s.getCompState);
  const hasHydrated = useUIStore((s) => s.hasHydrated);

  const isBreadcrumbsVisible = getCompState("breadcrumbs", "isVisible") ?? true;
  const shouldHide = isSiteFocused && !isBreadcrumbsVisible;

  useEffect(() => {
    setCompState("breadcrumbs", "isVisible", !shouldHide);
  }, [shouldHide, setCompState]);

  const timeoutRef = useRef<number | null>(null);

  const showHeader = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setCompState("breadcrumbs", "isVisible", true);
  };

  const hideHeaderDelayed = () => {
    timeoutRef.current = window.setTimeout(() => {
      setCompState("breadcrumbs", "isVisible", false);
    }, 2000);
  };

  if (!hasHydrated || !breadcrumbsComponent) return null;

  return (
    <header
      className={cn("flex items-center gap-4 px-6 py-2 group transition-opacity duration-200 ease-linear drop-shadow-xl drop-shadow-(--primary) opacity-100", {
        "h-[40px]": breadcrumbsComponent?.isVisible ?? true,
        "absolute top-0 left-0 right-0 h-2 p-0 opacity-0 z-[100]": !breadcrumbsComponent?.isVisible,
      })}
      onMouseEnter={showHeader}
      onMouseLeave={hideHeaderDelayed}
    >
      <div
        className={cn(
          "flex flex-1 justify-start items-center duration-200 ease-linear transition-opacity transition-transform -translate-y-full opacity-0",
          {
            "-translate-y-full opacity-0": !breadcrumbsComponent?.isVisible,
            "translate-y-0 opacity-100": breadcrumbsComponent?.isVisible,
          }
        )}
      >
        <span className="relative group p-2 mr-2" onClick={() => toggleMain("mainSidebar", "isVisible")}>
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 opacity-100 group-hover:opacity-0">
            <Menu className="h-5 w-5" />
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 opacity-0 group-hover:opacity-100">
            <CommandShortcut side="top" content="Cmd+M">
              ⌘M
            </CommandShortcut>
          </span>
        </span>

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumbs items={items} />
      </div>
    </header>
  );
}