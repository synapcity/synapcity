export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant =
  | "primary"
  | "outline"
  | "link"
  | "ghost"
  | "destructive"
  | "disabled"
  | "loading"
  | "inverse";

export const baseButtonStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 aria-invalid:ring-destructive/30 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 data-[state=loading]:cursor-wait data-[state=loading]:opacity-60 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 hover:cursor-pointer";

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-(--foreground) text-[var(--background)] hover:bg-(--background) hover:text-(--foreground) focus-visible:ring-[var(--primary)] border border-transparent",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-(--foreground) hover:text-(--background)",
  inverse:
    "text-(--background) bg-(--transparent) hover:bg-(--accent) focus-visible:ring-(--primary) border border-transparent",
  ghost: "bg-transparent hover:bg-(--background) text-(--foreground)",
  link: "text-[var(--primary)] underline-offset-4 hover:underline shadow-none",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
  disabled: "bg-muted text-muted-foreground pointer-events-none opacity-50",
  loading: "opacity-50 pointer-events-none text-muted-foreground",
};

export const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs",
  sm: "h-7 px-3 text-sm",
  md: "h-8 px-4 text-sm",
  lg: "h-9 px-5 text-base",
  xl: "h-10 px-6 text-base",
};

export const iconSizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 px-2",
  sm: "h-7 px-3",
  md: "h-8 px-4",
  lg: "h-9 px-5",
  xl: "h-10 px-6",
};
