import { 
  Building2, 
  Users, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { AdvancedAreaChart } from "@/components/dashboard/AdvancedAreaChart";
import { AdvancedDonutChart } from "@/components/dashboard/AdvancedDonutChart";
import { LiveActivityWidget } from "@/components/dashboard/LiveActivityWidget";
import { QuickActionsPanel } from "@/components/dashboard/QuickActionsPanel";
import { AdvancedPerformanceMetrics } from "@/components/dashboard/AdvancedPerformanceMetrics";
import { InteractiveHeatmap } from "@/components/dashboard/InteractiveHeatmap";
import { TopProperties } from "@/components/dashboard/TopProperties";
import { RegionHeatmap } from "@/components/dashboard/RegionHeatmap";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { VisitorsChart } from "@/components/profits/VisitorsChart";

const stats = [
  { title: "إجمالي العقارات", value: "1,234", change: { value: 12, trend: "up" as const }, icon: Building2, color: "blue" },
  { title: "المستخدمين النشطين", value: "856", change: { value: 8, trend: "up" as const }, icon: Users, color: "green" },
  { title: "إجمالي الإيرادات", value: "٤٥٠ ألف", change: { value: 23, trend: "up" as const }, icon: DollarSign, color: "purple" },
  { title: "رسائل جديدة", value: "24", change: { value: 5, trend: "down" as const }, icon: MessageSquare, color: "orange" },
  { title: "نسبة الاعتماد", value: "94%", change: { value: 3, trend: "up" as const }, icon: CheckCircle2, color: "cyan" },
];

const revenueData = [
  { name: "يناير", value: 40000, value2: 24000 },
  { name: "فبراير", value: 30000, value2: 13980 },
  { name: "مارس", value: 45000, value2: 38000 },
  { name: "أبريل", value: 27800, value2: 39080 },
  { name: "مايو", value: 58900, value2: 48000 },
  { name: "يونيو", value: 63900, value2: 38000 },
  { name: "يوليو", value: 71000, value2: 52000 },
  { name: "أغسطس", value: 68000, value2: 58000 },
];

const propertyTypeData = [
  { name: "فيلا", value: 35, color: "#0ea5e9" },
  { name: "شقة", value: 45, color: "#14b8a6" },
  { name: "دوبلكس", value: 12, color: "#22c55e" },
  { name: "أخرى", value: 8, color: "#f59e0b" },
];


const viewsData = [
  { name: "السبت", value: 1200, value2: 980 },
  { name: "الأحد", value: 980, value2: 850 },
  { name: "الاثنين", value: 1500, value2: 1200 },
  { name: "الثلاثاء", value: 1300, value2: 1100 },
  { name: "الأربعاء", value: 1800, value2: 1400 },
  { name: "الخميس", value: 1450, value2: 1250 },
  { name: "الجمعة", value: 850, value2: 700 },
];

const Index = () => {
  return (
    <DashboardLayout title="لوحة التحكم">
      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Visitors Chart - Full Width */}
      <VisitorsChart />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdvancedAreaChart 
            title="📈 تحليل الإيرادات" 
            subtitle="مقارنة الأداء المالي للسنة الحالية والسابقة" 
            data={revenueData}
            trend={{ value: 23, trend: "up" }}
          />
        </div>
        <AdvancedDonutChart 
          title="🏢 توزيع أنواع العقارات" 
          subtitle="التصنيف حسب نوع العقار" 
          data={propertyTypeData} 
          centerValue="1,234" 
          centerLabel="عقار" 
        />
      </div>

      {/* Second Row - Heatmap & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InteractiveHeatmap />
        </div>
        <LiveActivityWidget />
      </div>

      {/* Third Row - Performance Metrics */}
      <AdvancedPerformanceMetrics />

      {/* Fourth Row - Views & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdvancedAreaChart 
            title="👁️ إحصائيات المشاهدات" 
            subtitle="مقارنة المشاهدات اليومية" 
            data={viewsData}
            series={[
              { key: "value", name: "هذا الأسبوع", color: "#8b5cf6" },
              { key: "value2", name: "الأسبوع السابق", color: "#ec4899" },
            ]}
          />
        </div>
        <QuickActionsPanel />
      </div>

      {/* Properties Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProperties />
        <RegionHeatmap />
      </div>

      {/* Offers Table */}
      <OffersTable />
    </DashboardLayout>
  );
};

export default Index;
