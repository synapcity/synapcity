"use client";

import { useAnimation, useMotionValue, AnimationDefinition } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

type UseScrollerOptions = {
  animation?: AnimationDefinition;
  threshold?: number;
  getTotalWidth: () => number;
  onThresholdReach?: () => void;
};

export const useFramerScroller = ({
  animation,
  threshold = 0.75,
  getTotalWidth,
  onThresholdReach,
}: UseScrollerOptions) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);


  const start = useCallback(() => {
    console.log("start", animation)
    if (animation && isMounted.current) {
      controls.start(animation);
    }
  }, [controls, animation]);

  const stop = useCallback(() => {
    controls.stop();
  }, [controls]);

  const reset = useCallback(() => {
    controls.set({ x: 0 });
  }, [controls]);

  useEffect(() => {
    if (!onThresholdReach) return;

    const unsubscribe = x.on("change", (latestX) => {
      const totalWidth = getTotalWidth();
      if (Math.abs(latestX) > totalWidth * threshold) {
        onThresholdReach();
      }
    });

    return () => unsubscribe();
  }, [x, threshold, getTotalWidth, onThresholdReach]);

  return {
    x,
    controls,
    start,
    stop,
    reset,
  };
};
