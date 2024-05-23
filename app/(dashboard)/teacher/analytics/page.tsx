import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, PieChart } from "lucide-react";
import { redirect } from "next/navigation";
import { Chart } from "./_components/chart";
import { DataCard } from "./_components/data-card";

const Analytics = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/auth/sign-in");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
          icon={CircleDollarSign}
        />
        <DataCard label="Total Sales" value={totalSales} icon={PieChart} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default Analytics;
