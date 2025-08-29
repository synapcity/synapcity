import Link from "next/link";

export const TextCard = ({
  date,
  heading,
  subheading,
  description,
}: {
  date: string;
  heading: string;
  subheading: string;
  description: string;
}) => {
  return (
    <Link
      href="#"
      className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <div className="flex w-full items-center gap-2">
        <span>{heading}</span> <span className="ml-auto text-xs">{date}</span>
      </div>
      <span className="font-medium">{subheading}</span>
      <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">{description}</span>
    </Link>
  );
};
