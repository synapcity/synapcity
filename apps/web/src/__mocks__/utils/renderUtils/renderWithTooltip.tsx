import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";

export function renderWithTooltip(ui: ReactNode) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}
