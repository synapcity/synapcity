"use client"

import { CardComponent as Card } from "@/landing-page/components/ui/CardComponent/CardComponent";
import { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string
  description: string
}

export const FeatureCard = ({ feature }: {
  feature: Feature;
}) => {
  return (
    <Card collapsible icon={feature.icon} title={feature.title} >
      <p
        className="
            text-sm 
              line-clamp-2 icon
               group-hover:line-clamp-none lg:line-clamp-none
              transition-all duration-300
             "
      >
        {feature.description}
      </p>
    </Card>
  )
}
