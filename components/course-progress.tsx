import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils";
import React from 'react'

interface CourseProgressProps {
    value: number;
    variant: "default" | "success";
    size?: "default" | "sm"
}

const colorByVariant = {
    default: "text-blue-500",
    success: "text-green-500"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

export const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
  return (
    <div>
      <Progress 
        className="h-2"
        value={value}
        variant={variant}
      />
      <p className={cn(
        "font-medium mt-2 text-blue-700",
        colorByVariant[variant || "default"],
        sizeByVariant[size || "default"],
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}