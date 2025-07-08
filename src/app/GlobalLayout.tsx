import GlobalProviders from "./GlobalProviders"

export default function GlobalLayout({ children }: { children: React.ReactNode; }) {
  return (
    <GlobalProviders>
      {children}
    </GlobalProviders>
  )
}