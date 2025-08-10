// "use client";

// import { cn } from "@/utils";
// import { PropsWithChildren } from "react";

// interface DashboardCardProps extends PropsWithChildren {
//   title?: string;
//   className?: string;
//   accented?: boolean;
// }

// export const DashboardCard = ({
//   title,
//   children,
//   className,
//   accented = false,
// }: DashboardCardProps) => {
//   return (
//     <div
//       className={cn(
//         "rounded-md p-4 text-sm transition-shadow",
//         accented
//           ? "bg-accent/5 border border-accent/20 text-foreground hover:shadow-md"
//           : "bg-muted/5 border border-border/30 text-muted-foreground hover:shadow-sm",
//         className
//       )}
//     >
//       {title && (
//         <h3 className="text-base font-semibold text-foreground mb-2">
//           {title}
//         </h3>
//       )}
//       {children}
//     </div>
//   );
// };
// components/UserPanel/DashboardCard.tsx
"use client";

import { cn } from "@/utils";
import { PropsWithChildren, ReactNode } from "react";

interface DashboardCardProps extends PropsWithChildren {
  title?: string;
  className?: string;
  accented?: boolean;
  variant?: "neutral" | "info" | "warning" | "accent";
  loading?: boolean;
  footer?: ReactNode;
}

const variantStyles = {
  neutral: "bg-muted/5 border border-border/30 text-muted-foreground hover:shadow-sm",
  info: "bg-blue-50 border border-blue-200 text-blue-800 hover:shadow-sm",
  warning: "bg-yellow-50 border border-yellow-200 text-yellow-800 hover:shadow-sm",
  accent: "bg-accent/5 border border-accent/20 text-foreground hover:shadow-md",
};

export const DashboardCard = ({
  title,
  children,
  className,
  accented,
  variant = accented ? "accent" : "neutral",
  loading = false,
  footer,
}: DashboardCardProps) => {
  return (
    <div
      className={cn("rounded-md p-4 text-sm transition-shadow", variantStyles[variant], className)}
    >
      {title && <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>}
      {loading ? <div className="animate-pulse text-muted-foreground">Loading...</div> : children}
      {footer && <div className="mt-4 pt-2 border-t border-border/20">{footer}</div>}
    </div>
  );
};
