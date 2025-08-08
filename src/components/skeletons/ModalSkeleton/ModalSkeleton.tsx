export function ModalSkeleton() {
  return (
    <div className="bg-background p-6 rounded-xl shadow-xl w-[90vw] max-w-md mx-auto animate-pulse">
      <div className="h-6 w-3/4 bg-muted rounded mb-4" />
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-5/6 bg-muted rounded mb-6" />
      <div className="flex justify-end">
        <div className="h-9 w-20 bg-muted rounded" />
      </div>
    </div>
  );
}
