"use client"

import { Button } from "@/components/atoms"
import { useThemePreferences } from "@/hooks"
import { useThemeStore } from "@/stores"
import { cn } from "@/utils"

export const DarkModeToggle = ({ className }: { className?: string; }) => {
  const { preferences } = useThemePreferences("global")
  const toggleDarkMode = useThemeStore((theme) => theme.toggleGlobalMode)
  const { mode } = preferences

  const isDarkMode = mode === "dark"
  return (
    <Button
      id="dark-mode-toggle"
      variant="ghost"
      onClick={() => toggleDarkMode()}
      className={cn("hover:border z-[100] transition-all duration-200 ease-in-out", className)}
      size="md"
      isIconOnly
      aria-label={isDarkMode ? "Dark Mode" : "Light Mode"}
      label={isDarkMode ? "Dark Mode" : "Light Mode"}
      icon={isDarkMode ? "SunIcon" : "MoonIcon"}
    >
      <span data-testid="theme-icon" className="sr-only">{isDarkMode ? "Light mode" : "Dark mode"}</span>
    </Button >
  )
}