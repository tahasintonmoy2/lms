import { PremiumCard } from "@/components/premium-card";
import { Icon } from "./icon";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full">
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
