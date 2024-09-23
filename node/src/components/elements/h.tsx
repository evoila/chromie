import React from "react";

import { cn } from "@/lib/utils";

interface HProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export const H1: React.FC<HProps> = ({ className, ...props }) => {
  return (
    <h1 className={cn("text-5xl font-semibold", className)} {...props}></h1>
  );
};

export const H2: React.FC<HProps> = ({ className, ...props }) => {
  return (
    <h1 className={cn("text-3xl font-semibold", className)} {...props}></h1>
  );
};

export const H3: React.FC<HProps> = ({ className, ...props }) => {
  return (
    <h1 className={cn("text-xl font-semibold", className)} {...props}></h1>
  );
};

export const H4: React.FC<HProps> = ({ className, ...props }) => {
  return (
    <h1 className={cn("text-base font-semibold", className)} {...props}></h1>
  );
};
