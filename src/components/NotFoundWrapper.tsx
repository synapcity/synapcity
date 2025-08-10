import { Ghost } from "lucide-react";
import dynamic from "next/dynamic";
import { ButtonSkeleton, SkeletonOrLoading } from "./loading";

const ReturnButton = dynamic(
  () => import("@/components/atoms/buttons/ReturnButton").then((mod) => mod.ReturnButton),
  {
    ssr: true,
    loading: (props) => (
      <SkeletonOrLoading isLoading={props.isLoading} skeleton={<ButtonSkeleton />} />
    ),
  }
);

export default function NotFoundWrapper({
  heading,
  description,
  children,
  returnItems,
  returnRoute,
}: {
  children?: React.ReactNode;
  heading?: string;
  description?: string;
  returnItems?: string;
  returnRoute?: string;
}) {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-lg shadow-md max-w-md w-full">
        {children || (
          <div className="flex flex-col items-center gap-2">
            <Ghost className="h-10 w-10 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">{heading || "Page not found"}</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              {description || "We couldn’t find the page you were looking for."}
            </p>
          </div>
        )}
        <ReturnButton returnItems={returnItems || "home"} returnRoute={returnRoute || "/"} />
      </div>
    </div>
  );
}
