"use client"

import { ThemeProvider } from "@/providers";
import { useThemeStore } from "@/stores";
import { cn } from "@/utils";

export default function TestWidgetLayout({ children }: { children: React.ReactNode }) {
  const getPreferences = useThemeStore(state => state.getPreferences)
  const mode = getPreferences("widget", "widget-1")
  return (
    <ThemeProvider scope="widget" entityId="widget-1" className={cn(mode)} data-theme={mode}>
      {children}
    </ThemeProvider>
  )
}