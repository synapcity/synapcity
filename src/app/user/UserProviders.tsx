import { SidebarProvider } from "@/components/atoms/ui/sidebar";

export default function UserProviders({ children }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}