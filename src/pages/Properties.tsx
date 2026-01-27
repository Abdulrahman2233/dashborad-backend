import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { TopProperties } from "@/components/dashboard/TopProperties";
import { StatCard } from "@/components/dashboard/StatCard";
import { PropertyStatusList } from "@/components/dashboard/PropertyStatusList";
import { RegionalAnalysisCards } from "@/components/dashboard/RegionalAnalysisCards";
import { Building2, Eye, Clock, TrendingUp, CheckCircle, XCircle } from "lucide-react";

const roomData = [
  { name: "غرفة", value: 120, color: "hsl(199, 89%, 48%)" },
  { name: "غرفتين", value: 280, color: "hsl(187, 85%, 43%)" },
  { name: "3 غرف", value: 350, color: "hsl(160, 84%, 39%)" },
  { name: "4+ غرف", value: 200, color: "hsl(38, 92%, 50%)" },
];

const Properties = () => {
  return (
    <DashboardLayout title="تحليل العقارات">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
        <StatCard title="إجمالي العقارات" value="1,234" change={{ value: 12, trend: "up" }} icon={Building2} />
        <StatCard title="العقارات الموافق عليها" value="856" change={{ value: 8, trend: "up" }} icon={CheckCircle} />
        <StatCard title="العقارات المرفوضة" value="124" change={{ value: 3, trend: "down" }} icon={XCircle} />
        <StatCard title="العقارات المعلّقة" value="254" change={{ value: 15, trend: "up" }} icon={Clock} />
        <StatCard title="إجمالي المشاهدات" value="45,678" change={{ value: 18, trend: "up" }} icon={Eye} />
        <StatCard title="نسبة النمو" value="24%" change={{ value: 8, trend: "up" }} icon={TrendingUp} />
      </div>

      {/* Property Status Lists */}
      <PropertyStatusList />

      {/* Regional Analysis Cards */}
      <RegionalAnalysisCards />

      {/* Charts & Top Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <DonutChart title="🛏️ توزيع الغرف" subtitle="حسب عدد الغرف" data={roomData} centerValue="950" centerLabel="عقار" />
        <TopProperties />
      </div>
    </DashboardLayout>
  );
};

export default Properties;
