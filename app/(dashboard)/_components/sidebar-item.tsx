"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: LucideIcon | IconType;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);


  return (
    <a
        href={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-600 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-400/25",
        isActive &&
          "text-blue-500 bg-blue-300/25 hover:bg-blue-300/25 hover:text-blue-500"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-blue-500")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-500 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </a>
  );
};

export default SidebarItem;
