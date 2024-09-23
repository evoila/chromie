import React from "react";

import { cn } from "@/lib/utils";

interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "size-full overflow-auto rounded-lg border border-border",
        className,
      )}
      {...props}
    />
  );
};
