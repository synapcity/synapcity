"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";
import dynamic from "next/dynamic";

const UserPanel = dynamic(() => import("../UserPanel").then(mod => mod.UserPanel), {
  ssr: false,
  loading: () => <div>Loading...</div>
})
export const UserPanelShell = () => {
  const isOpen = useUIStore((s) =>
    s.components?.userPanel?.isVisible ?? false
  );
  const isLocked = useUIStore((s) =>
    s.components.userPanel.isLocked ?? false
  );
  const setComponentUIState = useUIStore((s) => s.setComponent);

  const clickAwayRef = useRef(null);

  useClickAway(clickAwayRef, () => {
    if (!isOpen || isLocked) return;
    if (!isLocked) setComponentUIState("userPanel", { isVisible: false });
  });

  return isOpen ? (
    <AnimatePresence>
      <motion.div
        key="userPanel"
        ref={clickAwayRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative z-20 flex flex-col bg-background/60 backdrop-blur-md border-t border-border shadow-inner max-h-full",
          "flex-1 h-full"
        )}
      >
        <UserPanel />
      </motion.div>
    </AnimatePresence>
  ) : null
}