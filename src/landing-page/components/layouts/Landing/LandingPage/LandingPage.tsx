"use client"

import { useUIStore } from "@/stores/ui";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const ScrollContainer = dynamic(() => import("@/landing-page/components/ui/containers/ScrollContainer/Scroll").then(mod => mod.Scroll), { ssr: false });
const Hero = dynamic(() => import("./Hero").then((mod) => mod.Hero), { ssr: true })
const CTA = dynamic(() => import("./CTA").then(mod => mod.CTA), { ssr: true });
const Widgets = dynamic(() => import("./Widgets").then(mod => mod.Widgets), { ssr: false });
const About = dynamic(() => import("./About").then(mod => mod.About), { ssr: true });
const Features = dynamic(() => import("./Features").then(mod => mod.Features), { ssr: true })
const HowItWorks = dynamic(() => import("./HowItWorks").then(mod => mod.HowItWorks), { ssr: true })

export const LandingPage = () => {
  const scrollRef = useRef(null);
  const [scrollElement, setScrollElement] = useState(null);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.6,
    root: scrollElement,
    triggerOnce: false,
  });

  const setShowHeader = useUIStore(state => state.setCompState)

  useEffect(() => {
    if (scrollRef.current) {
      setScrollElement(scrollRef.current);
    }
  }, []);

  useEffect(() => {
    setShowHeader("header", "isVisible", true);
  }, [heroInView, setShowHeader]);

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
