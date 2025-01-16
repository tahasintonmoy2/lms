"use client";
import { PremiumCard } from "@/components/premium-card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Icon } from "./icon";
import { SidebarRoutes } from "./sidebar-routes";

const MobileSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-70 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <div
            className={cn("h-full bg-blue-600", isDesktop ? "hidden" : "block")}
          >
            <div className="h-full border-r flex flex-col bg-white overflow-y-auto shadow-sm">
              <div className="p-6 flex items-center">
                <Icon />
                <p className="px-2 text-blue-600 text-xl font-semibold">
                  Next Stack
                </p>
              </div>
              <div className="flex flex-col w-full">
                <SidebarRoutes />
              </div>
              <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <PremiumCard />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
