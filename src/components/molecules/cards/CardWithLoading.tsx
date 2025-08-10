// "use client";

// import { FC, ReactNode } from "react";
// import { Spinner } from "@/components/atoms";
// import { cn } from "@/utils";

// interface CardWithLoadingProps {
//   isLoading: boolean;
//   onClick?: (e: React.MouseEvent) => void;
//   className?: string;
//   children: ReactNode;
//   ariaLabel?: string;
// }

// export const CardWithLoading: FC<CardWithLoadingProps> = ({
//   isLoading,
//   onClick,
//   className = "",
//   children,
//   ariaLabel,
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full text-left p-0 border-none bg-transparent ${className}`}
//       aria-label={ariaLabel}
//       disabled={isLoading}
//       type="button"
//     >
//       <article className="relative cursor-pointer group break-inside-avoid bg-(--accent-100) hover:bg(--primary-100) group-hover:ring-(--accent) ring-offset-2 ring-transparent rounded-2xl p-5 mb-4 shadow-md hover:shadow-lg transition">
//         {isLoading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl z-10">
//             <Spinner className="animate-spin" />
//           </div>
//         )}
//         <div className={cn("flex flex-col gap-3", { "opacity-60": isLoading })}>{children}</div>
//       </article>
//     </button>
//   );
// };

"use client";

import { FC, ReactNode, useMemo } from "react";
import { Spinner } from "@/components/atoms";
import { cn } from "@/utils";
import { format } from "date-fns";
import { Clock, RefreshCcw } from "lucide-react";

interface CardWithLoadingProps {
  isLoading: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export const CardWithLoading: FC<CardWithLoadingProps> = ({
  isLoading,
  onClick,
  className = "",
  children,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn("w-full text-left p-0 border-none bg-transparent", className)}
      aria-label={ariaLabel}
      disabled={isLoading}
      type="button"
    >
      <article className="relative cursor-pointer group break-inside-avoid bg-[var(--accent-100)] hover:bg-[var(--primary-100)] group-hover:ring-[var(--accent)] ring-offset-2 ring-transparent rounded-2xl p-5 shadow-md hover:shadow-lg transition flex-1">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl z-10">
            <Spinner className="animate-spin" />
          </div>
        )}
        <div
          className={cn("flex flex-col gap-3", {
            "opacity-60": isLoading,
          })}
        >
          {children}
        </div>
      </article>
    </button>
  );
};

interface MetaProps {
  createdAt?: string;
  updatedAt?: string;
}

export function StackedMeta({ createdAt, updatedAt }: MetaProps) {
  const exactCreated = useMemo(() => {
    if (!createdAt) return null;
    const d = new Date(createdAt);
    return isNaN(d.getTime()) ? null : format(d, "MMM d, yyyy, h:mm a");
  }, [createdAt]);

  const exactUpdated = useMemo(() => {
    if (!updatedAt) return null;
    const d = new Date(updatedAt);
    return isNaN(d.getTime()) ? null : format(d, "MMM d, yyyy, h:mm a");
  }, [updatedAt]);

  return (
    <div className="flex flex-col gap-4 text-gray-500 text-xs">
      {exactCreated && (
        <div className="group flex-1 flex gap-2 items-center">
          <Clock className="flex-shrink-0" />
          <span className="group-hover:hidden block">Created</span>
          <span className="hidden group-hover:block whitespace-nowrap">{exactCreated}</span>
        </div>
      )}
      {exactUpdated && (
        <div className="group flex-1 flex gap-2 items-center">
          <RefreshCcw className="flex-shrink-0" />
          <span className="group-hover:hidden block">Updated</span>
          <span className="hidden group-hover:block whitespace-nowrap">{exactUpdated}</span>
        </div>
      )}
    </div>
  );
}
