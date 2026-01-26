import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BarChart } from "@/components/dashboard/BarChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { TopProperties } from "@/components/dashboard/TopProperties";
import { RegionHeatmap } from "@/components/dashboard/RegionHeatmap";
import { StatCard } from "@/components/dashboard/StatCard";
import { Building2, Eye, Clock, TrendingUp } from "lucide-react";

const regionData = [
  { name: "الرياض", value: 450 },
  { name: "جدة", value: 320 },
  { name: "الدمام", value: 180 },
  { name: "مكة", value: 150 },
  { name: "المدينة", value: 120 },
];

const roomData = [
  { name: "غرفة", value: 120, color: "#0ea5e9" },
  { name: "غرفتين", value: 280, color: "#14b8a6" },
  { name: "3 غرف", value: 350, color: "#22c55e" },
  { name: "4+ غرف", value: 200, color: "#f59e0b" },
];

const Properties = () => {
  return (
    <DashboardLayout title="تحليل العقارات">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="إجمالي العقارات" value="1,234" change={{ value: 12, trend: "up" }} icon={Building2} />
        <StatCard title="إجمالي المشاهدات" value="45,678" change={{ value: 18, trend: "up" }} icon={Eye} />
        <StatCard title="متوسط مدة البيع" value="23 يوم" change={{ value: 5, trend: "down" }} icon={Clock} />
        <StatCard title="نسبة النمو" value="24%" change={{ value: 8, trend: "up" }} icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <BarChart title="🏢 العقارات بحسب المناطق" subtitle="الأكثر طلباً" data={regionData} />
        <DonutChart title="🛏️ الغرف والأسعار" subtitle="توزيع حسب عدد الغرف" data={roomData} centerValue="950" centerLabel="عقار" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <TopProperties />
        <RegionHeatmap />
      </div>
    </DashboardLayout>
  );
};

export default Properties;
