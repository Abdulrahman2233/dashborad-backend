import { 
  Building2, 
  Users, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { BarChart } from "@/components/dashboard/BarChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TopProperties } from "@/components/dashboard/TopProperties";
import { RegionHeatmap } from "@/components/dashboard/RegionHeatmap";
import { OffersTable } from "@/components/dashboard/OffersTable";

const revenueData = [
  { name: "يناير", value: 40000, value2: 24000 },
  { name: "فبراير", value: 30000, value2: 13980 },
  { name: "مارس", value: 20000, value2: 98000 },
  { name: "أبريل", value: 27800, value2: 39080 },
  { name: "مايو", value: 18900, value2: 48000 },
  { name: "يونيو", value: 23900, value2: 38000 },
];

const propertyTypeData = [
  { name: "فيلا", value: 35, color: "#0ea5e9" },
  { name: "شقة", value: 45, color: "#14b8a6" },
  { name: "دوبلكس", value: 12, color: "#22c55e" },
  { name: "أخرى", value: 8, color: "#f59e0b" },
];

const regionData = [
  { name: "الرياض", value: 450 },
  { name: "جدة", value: 320 },
  { name: "الدمام", value: 180 },
  { name: "مكة", value: 150 },
  { name: "المدينة", value: 120 },
];

const Index = () => {
  return (
    <DashboardLayout title="لوحة التحكم">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <StatCard title="إجمالي العقارات" value="1,234" change={{ value: 12, trend: "up" }} icon={Building2} />
        <StatCard title="المستخدمين النشطين" value="856" change={{ value: 8, trend: "up" }} icon={Users} />
        <StatCard title="إجمالي الإيرادات" value="٤٥٠ ألف" change={{ value: 23, trend: "up" }} icon={DollarSign} />
        <StatCard title="رسائل جديدة" value="24" change={{ value: 5, trend: "down" }} icon={MessageSquare} />
        <StatCard title="نسبة الاعتماد" value="94%" change={{ value: 3, trend: "up" }} icon={CheckCircle2} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <AreaChart title="📈 تحليل الإيرادات" subtitle="مقارنة بالعام السابق" data={revenueData} />
        <DonutChart title="🏢 أنواع العقارات" subtitle="توزيع حسب النوع" data={propertyTypeData} centerValue="1,234" centerLabel="عقار" />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <BarChart title="🏆 العقارات بحسب المناطق" subtitle="الأكثر طلباً" data={regionData} />
        <TopProperties />
        <RegionHeatmap />
      </div>

      {/* Offers Table */}
      <OffersTable />

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ActivityFeed />
        <AreaChart title="🕐 الأنشطة اليومية" subtitle="خلال الأسبوع" data={[
          { name: "السبت", value: 120 },
          { name: "الأحد", value: 98 },
          { name: "الاثنين", value: 150 },
          { name: "الثلاثاء", value: 130 },
          { name: "الأربعاء", value: 180 },
          { name: "الخميس", value: 145 },
          { name: "الجمعة", value: 85 },
        ]} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
