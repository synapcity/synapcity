"use client";

import clsx from "clsx";
import { TechType } from "@/landing-page/types";
import dynamic from "next/dynamic";
import { TechIcon, Tooltip, TooltipContent, TooltipTrigger } from "@/landing-page/components/ui";

const MarqueeScroller = dynamic(
  () => import("@/landing-page/components").then((mod) => mod.MarqueeScroller),
  { ssr: true }
);
const Framer = dynamic(() => import("react-icons/si").then((mod) => mod.SiFramer), { ssr: true });
const Nextjs = dynamic(() => import("react-icons/si").then((mod) => mod.SiNextdotjs), {
  ssr: true,
});
const TypeScript = dynamic(() => import("react-icons/si").then((mod) => mod.SiTypescript), {
  ssr: true,
});
const TailwindCSS = dynamic(() => import("react-icons/si").then((mod) => mod.SiTailwindcss), {
  ssr: true,
});
const PostgreSQL = dynamic(() => import("react-icons/si").then((mod) => mod.SiPostgresql), {
  ssr: true,
});
const Prisma = dynamic(() => import("react-icons/si").then((mod) => mod.SiPrisma), { ssr: true });
const Supabase = dynamic(() => import("react-icons/si").then((mod) => mod.SiSupabase), {
  ssr: true,
});
const Shadcnui = dynamic(() => import("react-icons/si").then((mod) => mod.SiShadcnui), {
  ssr: true,
});
const Vercel = dynamic(() => import("react-icons/si").then((mod) => mod.SiVercel), { ssr: true });
const Jest = dynamic(() => import("react-icons/si").then((mod) => mod.SiJest), { ssr: true });
const Cypress = dynamic(() => import("react-icons/si").then((mod) => mod.SiCypress), { ssr: true });

const techStack: TechType[] = [
  { icon: Framer, name: "Framer" },
  { icon: Nextjs, name: "Next.js" },
  { icon: TypeScript, name: "TypeScript" },
  { icon: TailwindCSS, name: "TailwindCSS" },
  { icon: PostgreSQL, name: "PostgreSQL" },
  { icon: Prisma, name: "Prisma" },
  { icon: Supabase, name: "Supabase" },
  { icon: Shadcnui, name: "Shadcnui" },
  { icon: Vercel, name: "Vercel" },
  { icon: Jest, name: "Jest" },
  { icon: Cypress, name: "Cypress" },
];
export function BuiltWith({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        "backdrop-blur-sm text-center flex items-center justify-center absolute top-0 left-0 right-0 group px-6",
        className
      )}
      key="built-with"
    >
      <span className="text-sm text-muted font-bold text-neutral-100 m-0 opacity-20 group-hover:opacity-100 transition-all duration-300 mb-4 pt-4">
        Built With
      </span>
      <MarqueeScroller>
        {[...techStack, ...techStack].map((tech, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <TechIcon key={index} tech={tech} />
            </TooltipTrigger>
            <TooltipContent>{tech.name}</TooltipContent>
          </Tooltip>
        ))}
      </MarqueeScroller>
    </div>
  );
}
