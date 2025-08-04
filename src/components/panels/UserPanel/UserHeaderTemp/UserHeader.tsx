"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { useComponentUIState } from "@/stores";
import { GreetingBlock } from "./GreetingBlock";
import { TimeBlock } from "./TimeBlock";
import { UserActions } from "./UserActions";
import { useUISidebar } from "@/components/atoms";

export const UserPanelHeader = () => {
  const [time, setTime] = useState(new Date());
  const { isVisible = true } = useComponentUIState("userPanel");
  const { open } = useUISidebar();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] backdrop-blur bg-(--background) text-(--foreground) shadow-sm transition-shadow px-4 py-2 @container",
        open ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="flex items-center justify-between gap-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 px-2"
        >
          <GreetingBlock />
          <TimeBlock time={time} />
        </motion.div>

        <UserActions />
      </div>
    </header>
  );
};
