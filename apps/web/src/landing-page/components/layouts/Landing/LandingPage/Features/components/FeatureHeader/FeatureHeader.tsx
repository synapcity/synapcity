"use client";

import dynamic from "next/dynamic";

const MotionP = dynamic(() => import("@/landing-page/components").then((mod) => mod.MotionP));

export const FeatureHeader = () => {
  const header = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="flex flex-col justify-start items-start text-left px-2">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 max-w-2xl pr-8 mr-8 text-left">
        What is Synapcity?
      </h2>
      <MotionP
        className="text-neutral-400 max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={header}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Start building your personal knowledge system today.
      </MotionP>
    </div>
  );
};
