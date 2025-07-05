import { ThemeScopeProvider } from "@/providers/ThemeScopeProvider";

export default function GlobalProviders({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeScopeProvider entityType="global">
      {children}
    </ThemeScopeProvider>
  )
}