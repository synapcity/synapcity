"use client";

import { LinkButton } from "../buttons/LinkButton/LinkButton";

export const Logo = () => (
  <LinkButton
    href="/"
    variant="ghost"
    size="xl"
    className="flex items-center gap-2 mr-8 px-2 text-(--background)"
    isIconOnly
    isLoading={false}
    isActive={false}
    icon="boxes"
    tooltip="Synapcity"
  >Synapcity</LinkButton>

)