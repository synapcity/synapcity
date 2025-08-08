"use client"

import { SectionContainer, SectionHeading, HStack } from "@/landing-page/components";
import { BuiltWith } from "../BuiltWith";
import { fadeInUp } from "@/landing-page/lib/variants";

export const Hero = () => {
  return (
    <SectionContainer
      backgroundContent={<div className="black-gradient -z-10" />}
      flexProps={{
        direction: "column",
        justify: "between",
        align: "start",
        gap: "8",
        padding: "0"
      }}
      className="section-container"
      left
    >
      <BuiltWith className="absolute top-0" />
      <SectionHeading
        size="xl"
        display
        motion={fadeInUp}
        left
      >
        Your Ideas. Your Space. Effortlessly Organized.
      </SectionHeading>
      <SectionHeading
        animated={false}
        size="sm"
        className="flex flex-col items-start gap-6 font-normal mt-0 mb-16"
        left
      >
        <span>
          Synapcity is a customizable dashboard where you control what matters most.
        </span>
        <span>
          Build your perfect digital workspace -- no clutter, no limits.
        </span>
      </SectionHeading>

      <HStack justify={"center"} gap={"8"} center>
        <button className="px-2 py-3 rounded-md border shadow-sm hover:text-gray-800 hover:bg-white hover:shadow-white hover:shadow-md">
          Launch Demo
        </button>
        <button className=" px-2 py-3 rounded-md border shadow-sm hover:text-gray-800 hover:bg-white hover:shadow-white hover:shadow-md">
          Learn More
        </button>
      </HStack>
    </SectionContainer>
  );
};
