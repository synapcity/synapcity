"use client";

import dynamic from "next/dynamic";
import { SkeletonOrLoading } from "../../loading/SkeletonOrLoading/SkeletonOrLoading";

const LandingPage = dynamic(
  () =>
    import("@/landing-page/components/layouts/Landing/LandingPage/LandingPage").then(
      (mod) => mod.LandingPage
    ),
  { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> }
);
export default function GlobalPage() {
  return (
    <div className="flex flex-col items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20">
      <div className="sr-only">
        <h1>Synapcity</h1>
        <p>Capture, connect, and create with your digital thoughtspace.</p>
      </div>
      <LandingPage />
    </div>
  );
}
