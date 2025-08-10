// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MailCard = (item: any) => (
  <a
    href="#"
    key={item.eitem}
    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
  >
    <div className="flex w-full items-center gap-2">
      <span>{item.name}</span>
      <span className="ml-auto text-xs">{item.date}</span>
    </div>
    <span className="font-medium">{item.subject}</span>
    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">{item.teaser}</span>
  </a>
);
