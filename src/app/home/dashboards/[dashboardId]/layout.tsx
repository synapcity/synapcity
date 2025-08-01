import { DashboardShowProviders } from "./DashboardShowProviders";

export default function DashboardShowLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShowProviders>
      {children}
    </DashboardShowProviders>
  );
}
