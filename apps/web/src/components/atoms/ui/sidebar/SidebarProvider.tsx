"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";
import { cn } from "@/utils";
import {
  useSidebarModuleStore,
  SIDEBAR_STATES,
  SidebarState,
  SIDEBAR_DIMENSIONS,
} from "@/components/atoms/ui/sidebar/useSidebarModuleStore";
import { useShallow } from "zustand/shallow";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export type SidebarContextProps = {
  sidebarId: string;
  /** none | icon | offcanvas */
  collapsible: "none" | "icon" | "offcanvas";
  sidebarState: SidebarState | undefined;
  setSidebarState: (s: SidebarState) => void;
  /** desktop only open/closed */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** mobile drawer open */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

/**
 * Custom React hook that provides access to the SidebarContext.
 * Throws an error if used outside of a SidebarProvider.
 * @returns The SidebarContext object
 */
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}

export function SidebarProvider({
  sidebarId,
  collapsible = "icon",
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
}: React.ComponentProps<"div"> & {
  sidebarId: string;
  collapsible?: "none" | "icon" | "offcanvas";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const settings = useSidebarModuleStore(useShallow((s) => s.settingsById[sidebarId]));
  const updateSettings = useSidebarModuleStore((s) => s.updateSettings);

  const sidebarState = settings ? settings.collapsedState : SIDEBAR_STATES.EXPANDED;
  const setSidebarState = React.useCallback(
    (state: SidebarState) =>
      updateSettings(sidebarId, {
        collapsedState: state,
        width:
          state === "icon"
            ? SIDEBAR_DIMENSIONS.ICON
            : state === "offcanvas"
              ? SIDEBAR_DIMENSIONS.MIN
              : SIDEBAR_DIMENSIONS.DEFAULT,
      }),
    [sidebarId, updateSettings]
  );

  const setOpen = React.useCallback(
    (value: boolean | ((o: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(next);
      else _setOpen(next);
    },
    [open, setOpenProp]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((o) => !o);
    } else {
      if (sidebarState === SIDEBAR_STATES.EXPANDED) {
        if (collapsible === "icon") {
          setSidebarState(SIDEBAR_STATES.ICON);
          updateSettings(sidebarId, { width: SIDEBAR_DIMENSIONS.ICON });
        } else if (collapsible === "offcanvas") {
          setSidebarState(SIDEBAR_STATES.OFFCANVAS);
          updateSettings(sidebarId, { width: SIDEBAR_DIMENSIONS.MAX });
        }
      } else {
        setSidebarState(SIDEBAR_STATES.EXPANDED);
        updateSettings(sidebarId, { width: SIDEBAR_DIMENSIONS.MAX });
      }
    }
  }, [isMobile, sidebarState, collapsible, setSidebarState, sidebarId, updateSettings]);

  // Keyboard shortcut (Cmd/Ctrl+B)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const contextValue = React.useMemo(
    () => ({
      sidebarId,
      collapsible,
      sidebarState,
      setSidebarState,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [
      sidebarId,
      collapsible,
      sidebarState,
      setSidebarState,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    ]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{ position: "relative", ...style }}
          className={cn("group/sidebar-wrapper flex-1 flex overflow-hidden border-b", className)}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}
