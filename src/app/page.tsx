"use client";

import dynamic from "next/dynamic";

const GlobalPage = dynamic(
  () =>
    import("@/components/pages/GlobalPage/GlobalPage").then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function Global() {
  return <GlobalPage />;
}