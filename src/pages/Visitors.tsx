import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { VisitorsList } from "@/components/dashboard/VisitorsList";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { Users, Globe, Smartphone, Monitor } from "lucide-react";

const visitorsChartData = [
  { name: "السبت", value: 320 },
  { name: "الأحد", value: 280 },
  { name: "الاثنين", value: 450 },
  { name: "الثلاثاء", value: 380 },
  { name: "الأربعاء", value: 520 },
  { name: "الخميس", value: 410 },
  { name: "الجمعة", value: 290 },
];

const Visitors = () => {
  return (
    <DashboardLayout title="زوار الموقع">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="إجمالي الزوار" value="2,650" change={{ value: 18, trend: "up" }} icon={Users} />
        <StatCard title="الزوار اليوم" value="156" change={{ value: 12, trend: "up" }} icon={Globe} />
        <StatCard title="من الهاتف" value="68%" change={{ value: 5, trend: "up" }} icon={Smartphone} />
        <StatCard title="من الكمبيوتر" value="32%" change={{ value: 3, trend: "down" }} icon={Monitor} />
      </div>

      {/* Visitors Chart */}
      <AreaChart title="📈 الزوار خلال الأسبوع" subtitle="عدد الزوار اليومي" data={visitorsChartData} />

      {/* Visitors List */}
      <VisitorsList />
    </DashboardLayout>
  );
};

export default Visitors;
