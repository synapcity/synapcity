import { ThemeProvider } from "@/providers/ThemeProvider";

export default function GlobalProviders({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider scope="global">
      {children}
    </ThemeProvider>
  )
}