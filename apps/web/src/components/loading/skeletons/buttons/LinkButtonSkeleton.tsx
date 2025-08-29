import { UISkeleton } from "@/components/atoms";

export function LinkButtonSkeleton() {
  return (
    <UISkeleton
      as="a"
      className="h-8 w-24 rounded-md inline-block"
      data-testid="link-button-skeleton"
    />
  );
}
