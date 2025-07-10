import { cn } from "@/utils";
import clsx from "clsx";

interface SpinnerProps {
  className?: string;
  size?: number;
  withMargin?: boolean;
  label?: string;
}

export const Spinner = ({
  className,
  size = 4,
  withMargin = false,
  label = "Loading",
}: SpinnerProps) => {
  const sizeClass = `h-${size} w-${size}`;

  return (
    <div
      role="status"
      data-testid="spinner"
      aria-live="polite"
      aria-busy="true"
      className="inline-flex items-center"
    >
      <svg
        className={cn(
          clsx("animate-spin", sizeClass, { "mr-2": withMargin }),
          className
        )}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};
