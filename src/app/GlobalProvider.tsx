import { MetadataProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import {} from "@/utils/supressConsole";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider scope="global">
      <MetadataProvider scope="global">{children}</MetadataProvider>
    </ThemeProvider>
  );
}
