import React from "react";
import Icon from "./Icon";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full">
      <div className="h-full border-r flex flex-col bg-white overflow-y-auto shadow-sm">
        <div className="p-6 flex items-center">
          <Icon />
          <p className="px-2 text-blue-600 text-xl font-semibold">Lambdasted</p>
        </div>
        <div className="flex flex-col w-full">
            <SidebarRoutes/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
