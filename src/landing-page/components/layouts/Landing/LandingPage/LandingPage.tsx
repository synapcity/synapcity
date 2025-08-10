"use client";

import { useThemeStore, useUIStore } from "@/stores/ui";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { ScrollRef } from "@/landing-page/components/ui/containers/ScrollContainer/Scroll";
import { useShallow } from "zustand/shallow";

const ScrollContainer = dynamic(
  () =>
    import("@/landing-page/components/ui/containers/ScrollContainer/Scroll").then(
      (mod) => mod.Scroll
    ),
  { ssr: false }
);
const Hero = dynamic(() => import("./Hero").then((mod) => mod.Hero), {
  ssr: true,
});
const CTA = dynamic(() => import("./CTA").then((mod) => mod.CTA), {
  ssr: true,
});
const Widgets = dynamic(
  () => import("./Widgets").then((mod) => mod.Widgets),
  { ssr: false }
);
const About = dynamic(() => import("./About").then((mod) => mod.About), {
  ssr: true,
});
const Features = dynamic(
  () => import("./Features").then((mod) => mod.Features),
  { ssr: true }
);
const HowItWorks = dynamic(
  () => import("./HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true }
);

export const LandingPage = () => {
  const scrollRef = useRef<ScrollRef>(null);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const theme = useThemeStore(useShallow(s => s.globalPreferences.mode))
  const setTheme = useThemeStore(s => s.setGlobalPreferences)

  // Set scrollElement to the DOM node once available
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
      setTheme({ mode: "dark" })
    }
  }, [setTheme, theme])
  return (
    <div className="min-h-full size-full">
      <ScrollContainer
        ref={scrollRef}
        direction="vertical"
        dragScroll
        showProgressBar
        snap
        onReachEnd={() => console.log("You reached the end!")}
        className="flex-col"
      >
        <div ref={heroRef}>
          <Hero />
        </div>
        <About />
        <Features />
        <HowItWorks />
        <Widgets />
        <CTA />
      </ScrollContainer>
    </div>
  );
};
