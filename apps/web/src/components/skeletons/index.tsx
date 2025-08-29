import { Skeleton } from "./Skeleton";

export * from "./FullPageLoading/FullPageLoading";
export * from "./GridSkeleton/GridSkeleton";
export * from "./DashboardTopBarSkeleton/DashboardTopBarSkeleton";
export * from "./WidgetSkeleton/WidgetSkeleton";
export * from "./WidgetGridSkeleton/WidgetGridSkeleton";
export * from "./BreakpointToggleSkeleton/BreakpointToggleSkeleton";
export * from "./WidgetAreaSkeleton/WidgetAreaSkeleton";
export * from "./EditorSkeleton/EditorSkeleton";
export * from "./ToolbarSkeleton/ToolbarSkeleton";
export * from "./MainEditorContentSkeleton/MainEditorContentSkeleton";
export * from "./MainEditorContentHeaderSkeleton/MainEditorContentHeaderSkeleton";
export * from "./Skeleton/Skeleton";
export * from "./IconButtonSkeleton/IconButtonSkeleton";
export * from "./ModalSkeleton/ModalSkeleton";

export function ButtonSkeleton({ width = "w-10" }: { width?: string }) {
  return <Skeleton className={`h-8 ${width} rounded-md`} />;
}

export function InputSkeleton({ width = "w-32" }: { width?: string }) {
  return <Skeleton className={`h-6 ${width} rounded-md`} />;
}
