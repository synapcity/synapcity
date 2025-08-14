"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useThemeStore, useUIStore } from "@/stores/ui";
import type { ScrollRef } from "@/landing-page/components/ui/containers/ScrollContainer/Scroll";
import { useShallow } from "zustand/shallow";
import { useChildIntersectionObserver } from "@/landing-page/hooks";
import { useLandingNavStore } from "@/stores";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  const theme = useThemeStore(useShallow((s) => s.globalPreferences.mode));
  const setTheme = useThemeStore((s) => s.setGlobalPreferences);
  const setCompState = useUIStore((s) => s.setCompState);
  const { setActiveSection, setScrollToSection } = useLandingNavStore();

  useEffect(() => {
    if (scrollRef.current?.container instanceof Element) {
      containerRef.current = scrollRef.current.container;
      setScrollElement(scrollRef.current.container);
      setScrollToSection((index) => scrollRef.current?.scrollToIndex(index));
    }
  }, [setScrollToSection]);

  const { currentIndex } = useChildIntersectionObserver(containerRef);

  useEffect(() => {
    setActiveSection(currentIndex);
  }, [currentIndex, setActiveSection]);

  useEffect(() => {
    if (theme !== "dark") {
      setTheme({ mode: "dark" });
    }
  }, [theme, setTheme]);

  useEffect(() => {
    const el = scrollElement;
    if (!el) return;
    const handleScroll = () => {
      setCompState("header", "isVisible", false);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollElement, setCompState]);

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
      {children}
    </ScrollContainer>
  );
};
