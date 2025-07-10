import { ThemeProvider } from "@/providers/ThemeProvider";

export default function GlobalProvider({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider scope="global">
      {children}
    </ThemeProvider>
  )
}