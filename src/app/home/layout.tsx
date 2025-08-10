import { SkeletonOrLoading } from "@/components";
import dynamic from "next/dynamic";

const AppProviders = dynamic(() => import("./AppProviders").then((mod) => mod.default), {
  loading: () => <SkeletonOrLoading />,
});

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
