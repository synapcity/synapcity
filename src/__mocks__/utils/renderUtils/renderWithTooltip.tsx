import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Tooltip } from "@/components";

export function renderWithTooltip(ui: ReactNode) {
  return render(<Tooltip>{ui}</Tooltip>);
}
