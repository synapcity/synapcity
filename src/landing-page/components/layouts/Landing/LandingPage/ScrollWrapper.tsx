"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, Children } from "react";
import { useInView } from "react-intersection-observer";
import { useThemeStore, useUIStore } from "@/stores/ui";
import type { ScrollRef } from "@/landing-page/components/ui/containers/ScrollContainer/Scroll";
import { useShallow } from "zustand/shallow";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

const ScrollContainer = dynamic(
  () =>
    import("@/landing-page/components/ui/containers/ScrollContainer/Scroll").then(
      (mod) => mod.Scroll
    ),
  { ssr: false }
);

export const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  const scrollRef = useRef<ScrollRef>(null);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  const theme = useThemeStore(useShallow((s) => s.globalPreferences.mode));
  const setTheme = useThemeStore((s) => s.setGlobalPreferences);

  useEffect(() => {
    if (scrollRef.current?.container instanceof Element) {
      setScrollElement(scrollRef.current.container);
    } else {
      setScrollElement(null);
    }
  }, [scrollRef.current?.container]);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.6,
    root: scrollElement,
    triggerOnce: false,
  });

  const setShowHeader = useUIStore((state) => state.setCompState);

  useEffect(() => {
    setShowHeader("header", "isVisible", true);
  }, [heroInView, setShowHeader]);

  useEffect(() => {
    if (theme !== "dark") {
      setTheme({ mode: "dark" });
    }
  }, [theme, setTheme]);

  const elements = Children.toArray(children);
  if (elements.length > 0) {
    elements[0] = (
      <div key="hero" ref={heroRef}>
        {elements[0]}
      </div>
    );
  }

  return (
    <ScrollContainer
      ref={scrollRef}
      direction="vertical"
      dragScroll
      showProgressBar
      snap
      onReachEnd={() => {}}
      className="flex-col"
    >
      {elements}
    </ScrollContainer>
  );
};
