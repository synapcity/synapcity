"use client";

import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const MotionSection = dynamic(
  () => import("@/landing-page/components/ui/Motion/Motion").then((mod) => mod.MotionSection),
  { ssr: true }
);
const Header = dynamic(() => import("./WidgetHeader").then((mod) => mod.WidgetHeader), {
  ssr: true,
});
const Gallery = dynamic(() => import("./WidgetGallery").then((mod) => mod.WidgetGallery), {
  ssr: false,
});

export const Widgets = () => {
  const { ref: widgetsRef, inView: widgetsInView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  return (
    <MotionSection
      id="widgets"
      ref={widgetsRef}
      animate={{ opacity: widgetsInView ? 1 : 0, y: widgetsInView ? 0 : 50 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="section-container flex-col overscroll-x-contain"
      key="widgets"
    >
      <Header />
      <Gallery />
    </MotionSection>
  );
};
