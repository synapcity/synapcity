import { UISkeleton } from "@/components/atoms";

export function ButtonSkeleton() {
  return <UISkeleton as="button" className="h-8 w-24 rounded-md" data-testid="button-skeleton" />;
}
