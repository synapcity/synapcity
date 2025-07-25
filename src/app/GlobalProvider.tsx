import { MetadataProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function GlobalProvider({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider scope="global">
      <MetadataProvider scope="global">
        {children}
      </MetadataProvider>
    </ThemeProvider>
  )
}