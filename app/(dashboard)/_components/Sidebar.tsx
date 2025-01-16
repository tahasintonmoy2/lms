"use client";

import { Icon } from "@/app/(dashboard)/_components/icon";
import { PremiumCard } from "@/components/premium-card";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1080px)");

  return (
    <div className={cn("h-full bg-blue-600", isDesktop ? "block" : "hidden")}>
      <div className="h-full border-r flex flex-col bg-white overflow-y-auto shadow-sm">
        <div className="p-6 flex items-center">
          <Icon />
          <p className="px-2 text-blue-600 text-xl font-semibold">Next Stack</p>
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <PremiumCard />
        </div>
      </div>
    </div>
  );
};
