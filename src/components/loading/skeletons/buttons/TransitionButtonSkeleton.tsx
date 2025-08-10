import { UISkeleton } from "@/components/atoms";

export function TransitionButtonSkeleton() {
  return (
    <div className="flex items-center gap-2" data-testid="transition-button-skeleton">
      <UISkeleton as="span" className="h-5 w-5 rounded-full" />
      <UISkeleton as="span" className="h-4 w-20 rounded-md" />
    </div>
  );
}
