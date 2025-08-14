import { SkeletonOrLoading } from "@/components";
import dynamic from "next/dynamic";
import { hasDemoSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Protected } from "@/components/Protected";

const AppProviders = dynamic(() => import("./AppProviders").then((mod) => mod.default), {
  loading: () => <SkeletonOrLoading />,
});

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  if (!(await hasDemoSession())) redirect("/");
  return (
    <Protected>
      <AppProviders>{children}</AppProviders>
    </Protected>
  );
}
