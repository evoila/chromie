import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

import { cn } from "@/lib/utils";

interface ContentProps extends DropdownMenu.DropdownMenuContentProps {}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenu.Content
      className={cn(
        "flex w-48 flex-col gap-1.5 rounded-lg border bg-background p-1.5",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Content.displayName = "DropdownMenuContent";

interface ItemProps extends DropdownMenu.DropdownMenuItemProps {}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenu.Item
      className={cn(
        "cursor-pointer rounded-lg p-1.5 outline-none hover:bg-muted",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Item.displayName = "DropdownMenuItem";

export * from "@radix-ui/react-dropdown-menu";
