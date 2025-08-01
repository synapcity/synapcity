"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/ui/button";

export const ReturnButton = ({
  returnItems,
  returnRoute
}: {
  returnItems: string;
  returnRoute: string;
}) => {
  return (
    <Button variant="secondary" className="mt-2" asChild>
      <Link href={returnRoute}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Return to {returnItems}
      </Link>
    </Button>
  )
}