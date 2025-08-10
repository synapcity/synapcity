"use client"

import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const FeatureHeader = dynamic(() => import("./components").then((mod) => mod.FeatureHeader), { ssr: true })
const FeatureContainer = dynamic(() => import("./components").then((mod) => mod.FeatureContainer), { ssr: true })

export const Features = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  return (
    <section ref={featuresRef} className="section-container" key="features">
      <div className="size-full max-w-7xl mx-auto flex flex-col justify-center items-start">
        <FeatureHeader />
        <FeatureContainer inView={featuresInView} />
      </div>
    </section>
  )
}
