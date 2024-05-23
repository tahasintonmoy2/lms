"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface CourseSidebarItemPrps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemPrps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 font-[500] text-sm pl-6 transition-all hover:text-slate-600 hover:bg-slate-400/20",
        isActive &&
          "text-slate-700 bg-slate-400/20 hover:bg-slate-400/20 hover:text-slate-600",
        isCompleted && "text-green-500 hover:text-green-600",
        isCompleted && isActive && "bg-green-200"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon
          size={23}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-green-600"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-green-600"
        )}
      />
    </button>
  );
};
