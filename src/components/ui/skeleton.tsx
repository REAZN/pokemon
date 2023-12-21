"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("animate-pulse rounded-md bg-elements", className)} {...props} />;
};
