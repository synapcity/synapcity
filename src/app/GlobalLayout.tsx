"use client"

import { useThemeStore } from "@/stores";
import GlobalProviders from "./GlobalProviders";
import { useEffect } from "react";

export default function GlobalLayout({ children }: { children: React.ReactNode; }) {
  const hasHydrated = useThemeStore(state => state.hasHydrated)
  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
  }, [hasHydrated])
  return (
    <GlobalProviders>
      {children}
    </GlobalProviders>
  )
}