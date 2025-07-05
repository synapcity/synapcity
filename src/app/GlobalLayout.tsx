import { DarkModeToggle } from "@/components/atoms/DarkModeToggle";
import GlobalProviders from "./GlobalProviders";

export default function GlobalLayout({ children }: { children: React.ReactNode; }) {
  return (
    <GlobalProviders>
      {children}
      <DarkModeToggle className="absolute top-4 right-4" />
    </GlobalProviders>
  )
}