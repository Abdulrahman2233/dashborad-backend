import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { Users as UsersIcon, UserPlus, Trophy, MapPin } from "lucide-react";

const registrationData = [
  { name: "يناير", value: 120 },
  { name: "فبراير", value: 150 },
  { name: "مارس", value: 180 },
  { name: "أبريل", value: 220 },
  { name: "مايو", value: 190 },
  { name: "يونيو", value: 250 },
];

const locationData = [
  { name: "الرياض", value: 340, color: "#0ea5e9" },
  { name: "جدة", value: 220, color: "#14b8a6" },
  { name: "الدمام", value: 150, color: "#22c55e" },
  { name: "أخرى", value: 146, color: "#f59e0b" },
];

const topOwners = [
  { name: "محمد أحمد", properties: 45, avatar: "م" },
  { name: "سعود العتيبي", properties: 38, avatar: "س" },
  { name: "فهد الشمري", properties: 32, avatar: "ف" },
  { name: "خالد المطيري", properties: 28, avatar: "خ" },
];

const UsersPage = () => {
  return (
    <DashboardLayout title="تحليل المستخدمين">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="إجمالي المستخدمين" value="856" change={{ value: 12, trend: "up" }} icon={UsersIcon} />
        <StatCard title="مستخدمين جدد" value="124" change={{ value: 18, trend: "up" }} icon={UserPlus} />
        <StatCard title="أفضل المالكين" value="45" icon={Trophy} />
        <StatCard title="المناطق النشطة" value="12" icon={MapPin} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <AreaChart title="📅 التسجيلات الجديدة" subtitle="خلال الأشهر الماضية" data={registrationData} />
        <DonutChart title="🌍 التوزيع الجغرافي" subtitle="حسب المنطقة" data={locationData} centerValue="856" centerLabel="مستخدم" />
      </div>

      {/* Top Owners */}
      <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
        <h3 className="text-base lg:text-lg font-semibold mb-4">🏆 أفضل المالكين</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topOwners.map((owner, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {owner.avatar}
              </div>
              <div>
                <p className="font-medium">{owner.name}</p>
                <p className="text-sm text-muted-foreground">{owner.properties} عقار</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
