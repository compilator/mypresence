import * as React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "workflow" | "wide";
}

const sizes = {
  narrow: "max-w-3xl",
  workflow: "max-w-5xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
