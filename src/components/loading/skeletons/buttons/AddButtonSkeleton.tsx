import { UISkeleton } from "@/components/atoms"

export function AddButtonSkeleton() {
  return (
    <div
      data-testid="add-button-skeleton"
      className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
    >
      <UISkeleton as="button" className="h-5 w-5 rounded-full" />
    </div>
  )
}
