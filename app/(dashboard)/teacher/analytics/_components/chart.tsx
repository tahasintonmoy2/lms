"use client";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={150} height={40} data={data}>
          <XAxis
            dataKey="name"
            stroke="#87534"
            fontSize={18}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#87534"
            fontSize={18}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="total" fill="#2858ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
