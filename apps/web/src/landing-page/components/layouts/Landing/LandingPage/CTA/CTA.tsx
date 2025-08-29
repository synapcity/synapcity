"use client";

import * as React from "react";
import clsx from "clsx";
import { Button } from "@/landing-page/components/ui";
import dynamic from "next/dynamic";

const MotionSection = dynamic(() =>
  import("@/landing-page/components/ui/Motion/Motion").then((mod) => mod.MotionSection)
);
export const CTA = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("clicked!");
  };

  return (
    <MotionSection
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={clsx("section-container")}
      key="cta"
    >
      <div className="transform transition-all duration-300 gap-8 flex flex-col justify-center items-center bg-black max-w-4xl mx-auto py-16 px-6 md:px-12 text-center">
        <h2 className="font-semibold text-2xl md:text-3xl text-neutral-100 mb-4">
          Get Started with Synapcity
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 mb-6">
          Organize your ideas, tasks, and notes in one place. Start your journey with Synapcity
          today.
        </p>
        <Button
          onClick={handleClick}
          className="bg-gradient-to-br from-fuchsia-500 via-blue-500 to-indigo-600 px-6 py-3 text-white text-lg font-medium bg-fuchsia-600 rounded-md hover:bg-fuchsia-700 transition duration-300"
        >
          Join Waiting List
        </Button>
      </div>
    </MotionSection>
  );
};
