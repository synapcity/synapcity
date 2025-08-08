"use client";

import React from "react";
import { cn } from "@/utils";
import { useSidebar } from "./SidebarProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/atoms/ui/sheet";
import { useSidebarModuleStore, SIDEBAR_DIMENSIONS, SIDEBAR_STATES, SidebarSettings } from "@/components/atoms/ui/sidebar/useSidebarModuleStore";
import { useShallow } from "zustand/shallow";

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  auto = false,
  resizable = false,
  className,
  children,
  hover = false,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset" | "container" | "icon";
  collapsible?: "offcanvas" | "icon" | "none";
  auto?: boolean;
  resizable?: boolean;
  hover?: boolean;
}) {
  const {
    sidebarId,
    isMobile,
    sidebarState,
    setSidebarState,
    openMobile,
    setOpenMobile,
  } = useSidebar();


  const settings = useSidebarModuleStore(useShallow((s) => s.getSettings(sidebarId)));
  const updateSettings = useSidebarModuleStore((s) => s.updateSettings);


  const [width, setWidth] = React.useState(
    (settings as SidebarSettings)?.width ?? (variant === "icon" ? SIDEBAR_DIMENSIONS.ICON_WIDTH : SIDEBAR_DIMENSIONS.DEFAULT)
  );
  const resizing = React.useRef(false);


  React.useEffect(() => {
    if (!resizable || isMobile) return;
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
    updateSettings(sidebarId, { width });
  }, [width, resizable, isMobile, sidebarId, updateSettings]);


  React.useEffect(() => {
    if (!resizable || isMobile) return;
    const onMove = (e: MouseEvent) => {
      if (!resizing.current) return;
      let w = side === "right" ? window.innerWidth - e.clientX : e.clientX;
      w = Math.max(SIDEBAR_DIMENSIONS.MIN, Math.min(SIDEBAR_DIMENSIONS.MAX, w));
      setWidth(w);
    };
    const onUp = () => {
      if (resizing.current) {
        resizing.current = false;
        document.body.style.cursor = "";
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizable, isMobile, side]);

  const handleMouseDown = (e: React.MouseEvent) => {
    resizing.current = true;
    document.body.style.cursor = "col-resize";
    e.preventDefault();
  };


  const isExpanded = sidebarState === SIDEBAR_STATES.EXPANDED;
  const isIcon = sidebarState === SIDEBAR_STATES.ICON && collapsible === "icon";
  const isOffcanvas =
    sidebarState === SIDEBAR_STATES.OFFCANVAS &&
    collapsible === "offcanvas";


  const onEnter = () => {
    if (auto && isIcon) setSidebarState(SIDEBAR_STATES.EXPANDED);
  };
  const onLeave = () => {
    if (auto && isExpanded && collapsible === "icon")
      setSidebarState(SIDEBAR_STATES.ICON);
  };


  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-slot="sidebar"
          data-mobile
          className="w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Mobile sidebar</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }


  const containerWidth = variant === "icon" ? SIDEBAR_DIMENSIONS.ICON_WIDTH : isExpanded
    ? width
    : isIcon
      ? SIDEBAR_DIMENSIONS.ICON
      : isOffcanvas
        ? width
        : width;


  const offcanvasStyles: React.CSSProperties = isOffcanvas
    ? {
      position: "absolute",
      top: 0,
      bottom: 0,
      [side]: 0,
      transform:
        side === "left"
          ? `translateX(-${width}px)`
          : `translateX(${width}px)`,
      transition: "transform 0.2s ease",
    }
    : {};

  return (
    <div
      onMouseEnter={hover ? (() => onEnter()) : undefined}
      onMouseLeave={hover ? (() => onLeave()) : undefined}
      className={cn(
        "relative flex h-full flex-col overflow-hidden group z-10",
        variant === "floating" && "p-2",
        className
      )}
      style={{
        width: containerWidth,
        transition: isOffcanvas ? undefined : "width 0.2s ease",
        ...offcanvasStyles,
      }}
      data-state={sidebarState}
      data-collapsible={collapsible}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      {...props}
    >
      {resizable && isExpanded ? (
        <div
          data-slot="sidebar-inner"
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute top-0 h-full w-2 z-30 select-none cursor-col-resize",
            side === "left" ? "right-0" : "left-0",
            "bg-transparent hover:bg-muted/50 active:bg-muted/70"
          )}
        >
          {children}
        </div>
      ) : (
        <div
          data-slot="sidebar-inner"
          className={cn(
            "bg-(--sidebar-background) text-(--sidebar-foreground) min-h-0 flex flex-col flex-1",
            variant === "floating" &&
            "rounded-md border border-(--sidebar-border) shadow-sm"
          )}
        >
          {children}
        </div>
      )}

    </div>
  );
}
