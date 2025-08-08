import { TechType } from "@/landing-page/types";
import { IconRenderer } from "@/landing-page/components";

type TechIconProps = {
  tech: TechType;
};

export function TechIcon({ tech }: TechIconProps) {
  return (
    <div className="flex justify-center items-center min-w-[150px] text-neutral-300 hover:cursor-pointer">
      <IconRenderer icon={tech.icon} name={tech.name} />
    </div>
  );
}
