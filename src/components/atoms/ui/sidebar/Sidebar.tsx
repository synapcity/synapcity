/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/utils/index";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/atoms/ui/sheet";
import { useSidebar } from "./SidebarProvider";

const SIDEBAR_WIDTH_MOBILE = 320;
const SIDEBAR_WIDTH_DEFAULT = 320;
const SIDEBAR_WIDTH_MIN = 200;
const SIDEBAR_WIDTH_MAX = 480;
const SIDEBAR_WIDTH_LS_KEY = "sidebarWidth";

function getStoredSidebarWidth() {
  if (typeof window === "undefined") return SIDEBAR_WIDTH_DEFAULT;
  const w = parseInt(localStorage.getItem(SIDEBAR_WIDTH_LS_KEY) || "", 10);
  if (isNaN(w)) return SIDEBAR_WIDTH_DEFAULT;
  return Math.min(Math.max(w, SIDEBAR_WIDTH_MIN), SIDEBAR_WIDTH_MAX);
}
function setStoredSidebarWidth(w: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SIDEBAR_WIDTH_LS_KEY, String(w));
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  auto = false,
  resizable = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset" | "container";
  collapsible?: "offcanvas" | "icon" | "none";
  auto?: boolean;
  resizable?: boolean;
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const isFloatingOrInset = variant === "inset" || variant === "floating";

  // width state (persisted)
  const [sidebarWidth, setSidebarWidth] = React.useState<number>(
    typeof window !== "undefined" ? getStoredSidebarWidth() : SIDEBAR_WIDTH_DEFAULT
  );
  const resizing = React.useRef(false);

  React.useEffect(() => {
    if (!resizable || isMobile) return;
    document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}px`);
    setStoredSidebarWidth(sidebarWidth);
  }, [sidebarWidth, resizable, isMobile]);

  React.useEffect(() => {
    if (!resizable || isMobile) return;
    function handleMouseMove(e: MouseEvent) {
      if (!resizing.current) return;
      let newWidth =
        side === "right" ? window.innerWidth - e.clientX : e.clientX;
      newWidth = Math.max(SIDEBAR_WIDTH_MIN, Math.min(SIDEBAR_WIDTH_MAX, newWidth));
      setSidebarWidth(newWidth);
    }
    function handleMouseUp() {
      resizing.current = false;
      document.body.style.cursor = "";
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizable, isMobile, side]);

  function handleResizerMouseDown(e: React.MouseEvent) {
    resizing.current = true;
    document.body.style.cursor = "col-resize";
    e.preventDefault();
  }

  const isExpanded = state === "expanded";
  const showResizer = resizable && isExpanded && !isMobile;

  // ---- none (always visible) ----
  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "text-[var(--foreground)] flex h-full w-[var(--sidebar-width)] flex-col",
          className
        )}
        {...props}
      >
        {children}
        {showResizer && (
          <div
            onMouseDown={handleResizerMouseDown}
            className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-transparent hover:bg-muted/50"
            data-resizer
          />
        )}
      </div>
    );
  }

  // ---- mobile (drawer) ----
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="text-[var(--sidebar-foreground)] w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          style={{ "--sidebar-width": `${SIDEBAR_WIDTH_MOBILE}px` } as React.CSSProperties}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  // ---- container / inset ----
  if (variant === "container" || variant === "inset") {
    return (
      <div
        className={cn("relative h-full flex flex-col max-h-full group z-10", className)}
        style={{
          width: isExpanded ? (resizable ? sidebarWidth : undefined) : undefined,
          minWidth: resizable && isExpanded ? SIDEBAR_WIDTH_MIN : undefined,
          maxWidth: resizable && isExpanded ? SIDEBAR_WIDTH_MAX : undefined,
        }}
        data-state={state}
        data-collapsible={isExpanded ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        data-slot="sidebar"
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-[var(--sidebar-background)] flex flex-col h-full w-full"
        >
          {children}
        </div>
        {showResizer && (
          <div
            onMouseDown={handleResizerMouseDown}
            className={cn(
              "absolute top-0 h-full w-2 cursor-col-resize z-30 select-none transition-colors duration-150",
              side === "left" ? "right-0" : "left-0",
              "bg-transparent hover:bg-muted/50 active:bg-muted/70 group-hover:bg-muted/40"
            )}
            style={{ [side === "right" ? "left" : "right"]: 0 } as any}
            data-resizer
          />
        )}
      </div>
    );
  }

  // ---- default sidebar / floating etc ----
  return (
    <div
      className="group peer text-[var(--sidebar-foreground)] hidden md:block h-full"
      data-state={state}
      data-collapsible={isExpanded ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          (isFloatingOrInset && !auto)
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          !auto && "fixed inset-y-0",
          "max-h-full h-full flex-1 overflow-hidden z-10 hidden transition-[left,right,width] duration-200 ease-linear md:flex border-none",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          (isFloatingOrInset && !auto)
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          !auto && "h-svh",
          className
        )}
        style={
          resizable && isExpanded
            ? {
              width: sidebarWidth,
              minWidth: SIDEBAR_WIDTH_MIN,
              maxWidth: SIDEBAR_WIDTH_MAX,
            }
            : undefined
        }
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-[var(--sidebar-background)] group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-row group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
        {showResizer && (
          <div
            onMouseDown={handleResizerMouseDown}
            className={cn(
              "absolute top-0 h-full w-2 cursor-col-resize z-30 select-none transition-colors duration-150",
              side === "left" ? "right-0" : "left-0",
              "bg-transparent hover:bg-muted/50 active:bg-muted/70 group-hover:bg-muted/40"
            )}
            style={{ [side === "right" ? "left" : "right"]: 0 } as any}
            data-resizer
          />
        )}
      </div>
    </div>
  );
}
