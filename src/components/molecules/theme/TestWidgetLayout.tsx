import { ThemeProvider } from "@/providers";

export default function TestWidgetLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider scope="widget" entityId="widget-1">
      {children}
    </ThemeProvider>
  )
}