"use client";

import { TopNavMenu } from "@/components";
import { useUIStore } from "@/stores/ui";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/shallow";

const Header = dynamic(
  () => import("../../Header/HeaderWrapper").then((mod) => mod.HeaderWrapper),
  {
    ssr: true,
  }
);

export const Background = ({ children }: { children: React.ReactNode }) => {
  const showHeader = useUIStore(useShallow((s) => s.components.header.isVisible ?? true));
  return (
    <div className="background bg-black text-white h-screen w-screen overflow-hidden relative">
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/blue-lights.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          filter: "blur(2px) saturate(0.5)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1 }}
      />
      <div
        className="fixed inset-0 z-10 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 h-screen">
        {children}
        {showHeader && (
          <Header visible={showHeader}>
            <TopNavMenu isLoggedIn={false} />
          </Header>
        )}
      </div>
    </div>
  );
};
