"use client";

import dynamic from "next/dynamic";

const ScrollWrapper = dynamic(() => import("./ScrollWrapper").then((mod) => mod.ScrollWrapper), {
  ssr: false,
});
const Hero = dynamic(() => import("./Hero").then((mod) => mod.Hero), {
  ssr: true,
});
const CTA = dynamic(() => import("./CTA").then((mod) => mod.CTA), {
  ssr: false,
});
const Widgets = dynamic(() => import("./Widgets").then((mod) => mod.Widgets), { ssr: false });
const About = dynamic(() => import("./About").then((mod) => mod.About), {
  ssr: false,
});
const Features = dynamic(() => import("./Features").then((mod) => mod.Features), { ssr: false });
const HowItWorks = dynamic(() => import("./HowItWorks").then((mod) => mod.HowItWorks), {
  ssr: false,
});

export const LandingPage = () => {
  return (
    <div className="min-h-full size-full">
      <ScrollWrapper>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Widgets />
        <CTA />
      </ScrollWrapper>
    </div>
  );
};
