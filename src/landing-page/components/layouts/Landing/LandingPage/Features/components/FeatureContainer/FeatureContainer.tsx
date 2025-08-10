"use client"

import { type Feature } from "../FeatureCard"
import { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("@/landing-page/components").then((mod) => mod.MotionDiv), { ssr: true })
const FeatureCard = dynamic(() => import("@/landing-page/components/layouts/Landing/LandingPage/Features/components").then((mod) => mod.FeatureCard), { ssr: true })

const Camera = dynamic(() => import("lucide-react").then((mod) => mod.Camera)) as LucideIcon;
const ClipboardCheck = dynamic(() => import("lucide-react").then((mod) => mod.ClipboardCheck)) as LucideIcon;
const Network = dynamic(() => import("lucide-react").then((mod) => mod.Network)) as LucideIcon;
const BoxIcon = dynamic(() => import("lucide-react").then((mod) => mod.BoxIcon)) as LucideIcon;
const Laptop = dynamic(() => import("lucide-react").then((mod) => mod.Laptop)) as LucideIcon;
const Fence = dynamic(() => import("lucide-react").then((mod) => mod.Fence)) as LucideIcon;

const features: Feature[] = [
  {
    icon: BoxIcon,
    title: 'Clutter-Free, Purposeful Design',
    description: 'Built for deep focus with a minimalist interface that eliminates distractions. Want a personal touch? Customize individual dashboards with color settings that suit your mood or task.'
  },
  {
    icon: Camera,
    title: 'Seamless Idea Capture',
    description: 'Capture thoughts the moment they strike. Use the collapsible main header panel to jot things down instantly—no need to leave your workflow.'
  },
  {
    icon: Laptop,
    title: 'Optimized for Every Device',
    description: 'Stay in your flow—anywhere. Your dashboard layouts are responsive and customizable across breakpoints, so your workspace adapts as you move from desktop to mobile.'
  },
  {
    icon: ClipboardCheck,
    title: 'Intuitive Organization',
    description: 'Organize your life your way. Create dedicated areas with unique dashboards—perfect for your job hunt, fitness goals, creative work, or anything else you’re balancing.'
  },
  {
    icon: Network,
    title: 'Declutter Your Digital Life',
    description: 'Modern life is noisy. Synapcity helps you carve out clarity—bringing your work, habits, and goals into one calm, organized space that makes sense for how you operate.'
  },
  {
    icon: Fence,
    title: 'Stay Focused, Stay Aligned',
    description: 'Context-switching kills momentum. Synapcity helps you stay anchored in what matters by surfacing only the tools and content you need—no distractions, no detours.'
  }
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
}
export const FeatureContainer = ({ inView }: { inView?: boolean; }) => {
  return (
    <MotionDiv
      variants={container}
      animate={inView ? "visible" : "hidden"}
      exit="hidden"
      className="
          max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8
        "
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </MotionDiv>
  )
}
