import React from 'react'
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariant = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-300/70 border-yellow-30 text-primary",
                success: "bg-green-600 border-green-600 text-secondary"
            }
        },
        defaultVariants:{
            variant: "warning"
        }
    }
)

const iconVariant = cva(
    "",
    {
        variants: {
            variant: {
                warning: "text-yellow-600",
                success: "text-green-400"
            }
        },
        defaultVariants:{
            variant: "warning"
        }
    }
)

type BackgroundVariantsProps = VariantProps<typeof bannerVariant>;
type IconVariantsProps = VariantProps<typeof iconVariant>;

interface BannerProps extends BackgroundVariantsProps, IconVariantsProps {
    label: string
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircle
}

const Banner = ({
    variant,
    label,

}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariant({ variant }))}>
        <Icon className={cn(
            'h-5 w-5 mr-2',
            iconVariant({variant})
        )}/>
        {label}
    </div>
  )
}

export default Banner