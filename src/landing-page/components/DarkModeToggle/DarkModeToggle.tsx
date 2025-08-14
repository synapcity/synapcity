"use client";

import { Button } from "@/components/atoms/buttons/Button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useThemeStore } from "@/stores/ui";

export const DarkModeToggle = () => {
  const toggleDarkMode = useThemeStore((s) => s.toggleGlobalMode);
  return (
    <Button
      id="dark-mode-toggle"
      variant="ghost"
      onClick={() => toggleDarkMode()}
      className="rounded-full h-[3rem] w-[3rem] bg-foreground text-accent-300 hover:text-foreground border-foreground hover:bg-accent-500 dark:hover:bg-accent-500 dark:hover:text-foreground hover:border hover:cursor-pointer"
      size="sm"
    >
      <MoonIcon
        aria-label="Toggle dark"
        className="size-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <SunIcon
        aria-label="Toggle light"
        className="size-full absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
