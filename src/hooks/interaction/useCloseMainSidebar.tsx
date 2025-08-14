"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores";
import { useShallow } from "zustand/shallow";

/** Match /home/dashboards/:id or /home/notes/:id (no trailing slash) */
const DETAIL_ROUTE_RE = /^\/home\/(dashboards|notes)\/[^/]+$/;

export function useCloseMainSidebar() {
  const pathname = usePathname();
  const enabled = DETAIL_ROUTE_RE.test(pathname ?? "");

  const { isOpen, setCompState } = useUIStore(
    useShallow((s) => ({
      isOpen: s.components?.["mainSidebar"]?.["isVisible"] ?? false,
      setCompState: s.setCompState,
    }))
  );

  useEffect(() => {
    if (
      pathname.endsWith("/dashboards") ||
      pathname.endsWith("/notes") ||
      pathname.endsWith("/home")
    ) {
      setCompState("mainSidebar", "isVisible", true);
    }
  }, [pathname, setCompState]);

  useEffect(() => {
    if (!enabled || !isOpen) return;

    const onPointerDown = (ev: PointerEvent) => {
      const el = ev.target as Element | null;
      if (!el) return;

      // Ignore clicks inside the sidebar container
      if (el.closest("#app-sidebar")) return;

      // Optional ignores: dialogs, sheets, or anything you don’t want to close from
      if (el.closest("[data-dialog-overlay],[data-sheet],.modal,[role='dialog']")) return;

      // Close the main sidebar
      setCompState("mainSidebar", "isVisible", false);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [enabled, isOpen, setCompState]);
}
