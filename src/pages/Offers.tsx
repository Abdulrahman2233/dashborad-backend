import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { Percent, DollarSign, TrendingUp, Clock } from "lucide-react";

const salesImpactData = [
  { name: "يناير", value: 80000, value2: 95000 },
  { name: "فبراير", value: 85000, value2: 110000 },
  { name: "مارس", value: 90000, value2: 125000 },
  { name: "أبريل", value: 95000, value2: 140000 },
  { name: "مايو", value: 88000, value2: 135000 },
  { name: "يونيو", value: 100000, value2: 155000 },
];

const Offers = () => {
  return (
    <DashboardLayout title="العروض والخصومات">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="العروض النشطة" value="8" change={{ value: 2, trend: "up" }} icon={Percent} />
        <StatCard title="إجمالي المبيعات" value="٦٠٤ ألف" change={{ value: 35, trend: "up" }} icon={DollarSign} />
        <StatCard title="نسبة التحويل" value="24%" change={{ value: 8, trend: "up" }} icon={TrendingUp} />
        <StatCard title="متوسط الاستخدام" value="167" icon={Clock} />
      </div>

      {/* Sales Impact Chart */}
      <AreaChart 
        title="📈 تأثير الخصومات على المبيعات" 
        subtitle="مقارنة المبيعات بدون خصومات (الأزرق) ومع الخصومات (الأخضر)" 
        data={salesImpactData} 
      />

      {/* Offers Table */}
      <OffersTable />
    </DashboardLayout>
  );
};

export default Offers;
