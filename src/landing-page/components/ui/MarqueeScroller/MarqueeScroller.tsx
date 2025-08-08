"use client";

import { useEffect } from "react";
import { useAnimationControls, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";

type MarqueeScrollerProps = {
  children: React.ReactNode;
};

const MotionDiv = dynamic(() => import("@/landing-page/components").then((mod) => mod.MotionDiv))
export function MarqueeScroller({ children }: MarqueeScrollerProps) {
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        ease: "linear",
        duration: 20,
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <MotionDiv
      className="overflow-x-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <MotionDiv
        className="flex whitespace-nowrap gap-8"
        style={{ x }}
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: ["0%", "-50%"],
            transition: {
              ease: "linear",
              duration: 10,
              repeat: Infinity,
            },
          })
        }
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  );
}
