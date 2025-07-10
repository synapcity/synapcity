import React from "react";

export const ResizablePanelGroup = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="resizable-panel-group">{children}</div>
);

export const ResizablePanel = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  defaultSize?: number;
  collapsible?: boolean;
  minSize?: number;
  maxSize?: number;
}) => (
  <div data-testid="resizable-panel" {...rest}>
    {children}
  </div>
);

export const ResizableHandle = () => <div data-testid="resizable-handle" />;
