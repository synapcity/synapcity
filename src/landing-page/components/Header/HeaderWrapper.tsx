"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useUIStore } from "@/stores";

const MotionDiv = dynamic(() => import("../ui/Motion").then((mod) => mod.MotionDiv), {
  ssr: false,
});

export const HeaderWrapper = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setCompState = useUIStore((s) => s.setCompState);
  const setVisible = (visible?: boolean) => setCompState("header", "isVisible", visible);

  const handleHover = (hovering: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (hovering) {
      setIsHovered(true);
      setVisible(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setVisible(false);
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      <header
        className="fixed top-0 right-0 left-0 z-40 h-1/4"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {visible && (
          <MotionDiv
            key="header"
            animate={{ y: visible ? 0 : -40, opacity: visible ? 1 : 0 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              duration: 0.6,
              ease: "linear",
            }}
            className={clsx(
              "fixed top-0 left-0 right-0 z-50 shadow-sm flex justify-between items-center px-8 h-16 drop-shadow-2xl",
              {
                "bg-black/70 backdrop-blur-md": isHovered,
              }
            )}
          >
            {children}
          </MotionDiv>
        )}
      </header>
    </AnimatePresence>
  );
};
