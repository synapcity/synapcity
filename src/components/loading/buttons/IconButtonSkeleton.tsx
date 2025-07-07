import { UISkeleton } from "@/components/atoms"

export function IconButtonSkeleton() {
  return (
    <UISkeleton
      as="button"
      className="h-8 w-8 aspect-square rounded-md p-0"
      data-testid="icon-button-skeleton"
    />
  )
}
