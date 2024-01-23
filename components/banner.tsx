import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const bannerVariant = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-400/60 border-yellow-30 text-primary",
        success: "bg-green-600 border-green-600 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconVariant = cva("", {
  variants: {
    variant: {
      warning: "text-yellow-600",
      success: "text-green-400",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

type BackgroundVariantsProps = VariantProps<typeof bannerVariant>;
type IconVariantsProps = VariantProps<typeof iconVariant>;

interface BannerProps extends BackgroundVariantsProps, IconVariantsProps {
  label: string;
  className?: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
};

const Banner = ({ 
  variant,
  label,
  className
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariant({ variant }), className)}>
      <Icon className={cn("h-8 w-8 lg:h-6 lg:w-6 mr-2", iconVariant({ variant }))} />
      {label}
    </div>
  );
};

export default Banner;
