import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface ActionHintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  asChild?: boolean;
  className?: string;
}

export const ActionHint = ({
  children,
  description,
  side = "right",
  sideOffset = 0,
  asChild,
  className,
}: ActionHintProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild={asChild}>
            {children}
          </TooltipTrigger>
          <TooltipContent
            side={side}
            sideOffset={sideOffset}
            className={cn(
              "dark:bg-[#0f111a] dark:border-[#181b2b] dark:text-white font-semibold",
              className
            )}
          >
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
