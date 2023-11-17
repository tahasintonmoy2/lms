import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";

interface DataCardProps {
  value: number;
  label: string;
  icon: LucideIcon;
  shouldFormat?: boolean;
}

export const DataCard = ({ 
  value, 
  label, 
  icon: Icon,
  shouldFormat 
}: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
            {label}
        </CardTitle>
        <CardDescription>
            <IconBadge
              icon={Icon}
            />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
