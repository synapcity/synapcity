"use client";

import { Container, SectionContainer, SectionHeading } from "@/landing-page/components";
import { LucideIcon, Pencil, FolderKanban, Compass, Eye } from "lucide-react";
import { HowItWorksStep } from "./HowItWorksStep/HowItWorksStep";

type TimelineStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: TimelineStep[] = [
  {
    title: "Capture Instantly",
    description:
      "Use the collapsible header panel to quickly jot down ideas, notes, or todos without disrupting your flow.",
    icon: Pencil,
  },
  {
    title: "Organize with PARA",
    description:
      "Sort your content into Projects, Areas, Resources, and Archives—modeled after Second Brain philosophy.",
    icon: FolderKanban,
  },
  {
    title: "Navigate Seamlessly",
    description:
      "Switch between dashboards effortlessly with intuitive side panels and a responsive layout.",
    icon: Compass,
  },
  {
    title: "Stay Focused",
    description:
      "Surface only what you need—no distractions, just deep work in a space built for clarity.",
    icon: Eye,
  },
];

export const HowItWorks = () => {
  return (
    <SectionContainer key="how-it-works" className="relative h-full p-4" center>
      <Container center>
        <SectionHeading
          size="lg"
          className="mb-10 text-left w-screen max-w-screen md:w-auto overflow-hidden px-4"
          left
        >
          How It Works
        </SectionHeading>
        <div className="overflow-x-auto w-[100vw] md:w-auto md:overflow-hidden overscroll-contain p-8">
          <ol className="items-center flex gap-8 md:gap-4">
            {steps.map((step, index) => {
              const isAbove = index % 2 === 0;
              return (
                <HowItWorksStep key={index} step={step} delay={index * 0.2} isAbove={isAbove} />
              );
            })}
          </ol>
        </div>
      </Container>
    </SectionContainer>
  );
};
