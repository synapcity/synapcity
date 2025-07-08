import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/providers";
import { ThemeScope } from "@/theme";

export function renderWithTheme(scope: ThemeScope, ui: ReactNode, id?: string) {
  return render(<ThemeProvider scope={scope} entityId={id}>{ui}</ThemeProvider>);
}
