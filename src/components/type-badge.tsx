"use client";

import type { ReactNode } from "react";
import { cn, elementType } from "@/lib/utils";
import { SpeciesType } from "@/types/pokemon";

export const TypeBadge = ({
  type,
  children,
  className,
}: {
  type: SpeciesType;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("py-0.5 px-2.5 rounded-md w-fit", className)} style={{ backgroundColor: elementType[type] }}>
      <span className="brightness-[0.3] uppercase font-bold text-sm" style={{ color: elementType[type] }}>
        {children}
      </span>
    </div>
  );
};
