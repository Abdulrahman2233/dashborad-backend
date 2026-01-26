import { 
  Building2, 
  Users, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
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
  { name: "يوليو", value: 34900, value2: 43000 },
];

const propertyTypeData = [
  { name: "فيلا", value: 35, color: "hsl(199 89% 48%)" },
  { name: "شقة", value: 45, color: "hsl(187 85% 43%)" },
  { name: "دوبلكس", value: 12, color: "hsl(160 84% 39%)" },
  { name: "أخرى", value: 8, color: "hsl(38 92% 50%)" },
];

const regionData = [
  { name: "الرياض", value: 450 },
  { name: "جدة", value: 320 },
  { name: "الدمام", value: 180 },
  { name: "مكة", value: 150 },
  { name: "المدينة", value: 120 },
];

const dailyActivityData = [
  { name: "السبت", value: 120 },
  { name: "الأحد", value: 98 },
  { name: "الاثنين", value: 150 },
  { name: "الثلاثاء", value: 130 },
  { name: "الأربعاء", value: 180 },
  { name: "الخميس", value: 145 },
  { name: "الجمعة", value: 85 },
];

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard
              title="إجمالي العقارات"
              value="1,234"
              change={{ value: 12, trend: "up" }}
              icon={Building2}
            />
            <StatCard
              title="المستخدمين النشطين"
              value="856"
              change={{ value: 8, trend: "up" }}
              icon={Users}
            />
            <StatCard
              title="إجمالي الإيرادات"
              value="٤٥٠ ألف"
              change={{ value: 23, trend: "up" }}
              icon={DollarSign}
            />
            <StatCard
              title="رسائل جديدة"
              value="24"
              change={{ value: 5, trend: "down" }}
              icon={MessageSquare}
            />
            <StatCard
              title="نسبة الاعتماد"
              value="94%"
              change={{ value: 3, trend: "up" }}
              icon={CheckCircle2}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChart
              title="📈 تحليل الإيرادات"
              subtitle="مقارنة الإيرادات بالعام السابق"
              data={revenueData}
            />
            <DonutChart
              title="🏢 أنواع العقارات"
              subtitle="توزيع العقارات حسب النوع"
              data={propertyTypeData}
              centerValue="1,234"
              centerLabel="عقار"
            />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BarChart
              title="🏆 العقارات بحسب المناطق"
              subtitle="الأكثر طلباً"
              data={regionData}
            />
            <TopProperties />
            <RegionHeatmap />
          </div>

          {/* Offers Table */}
          <OffersTable />

          {/* Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <AreaChart
              title="🕐 الأنشطة اليومية"
              subtitle="رسم بياني للأنشطة خلال الأسبوع"
              data={dailyActivityData}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
