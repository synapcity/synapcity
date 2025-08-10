import { cn } from "@/utils/index";
import { testId } from "@/utils/testId/testId";
import { JSX } from "react";
type SkeletonProps = React.HTMLAttributes<HTMLElement> & {
  as?: JSX.ElementType;
};

function Skeleton({ className, as: Component = "div", ...props }: SkeletonProps) {
  return (
    <Component
      data-slot="skeleton"
      className={cn("bg-accent/40 animate-pulse rounded-md", className)}
      {...testId("note-card-skeleton")}
      {...props}
    />
  );
}

export { Skeleton };
