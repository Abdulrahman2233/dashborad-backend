import { TrendingUp, TrendingDown, DollarSign, Calendar, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  performance: "excellent" | "good" | "warning" | "poor";
  subtitle: string;
}

const getPerformanceColor = (performance: StatCard["performance"]) => {
  switch (performance) {
    case "excellent":
      return "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30";
    case "good":
      return "from-green-500/20 to-green-600/10 border-green-500/30";
    case "warning":
      return "from-orange-500/20 to-orange-600/10 border-orange-500/30";
    case "poor":
      return "from-red-500/20 to-red-600/10 border-red-500/30";
  }
};

const getPerformanceIconBg = (performance: StatCard["performance"]) => {
  switch (performance) {
    case "excellent":
      return "bg-emerald-500";
    case "good":
      return "bg-green-500";
    case "warning":
      return "bg-orange-500";
    case "poor":
      return "bg-red-500";
  }
};

const getPerformanceTextColor = (performance: StatCard["performance"]) => {
  switch (performance) {
    case "excellent":
      return "text-emerald-600 dark:text-emerald-400";
    case "good":
      return "text-green-600 dark:text-green-400";
    case "warning":
      return "text-orange-600 dark:text-orange-400";
    case "poor":
      return "text-red-600 dark:text-red-400";
  }
};

export function ProfitStatsCards() {
  const stats: StatCard[] = [
    {
      title: "إجمالي أرباح الموقع",
      value: 1250000,
      icon: <DollarSign className="h-5 w-5" />,
      performance: "excellent",
      subtitle: "جميع الصفقات منذ بداية الموقع",
    },
    {
      title: "أرباح الشهر",
      value: 85000,
      icon: <Calendar className="h-5 w-5" />,
      trend: 12.5,
      performance: "good",
      subtitle: "من أول الشهر حتى اليوم",
    },
    {
      title: "أرباح الأسبوع",
      value: 23500,
      icon: <CalendarDays className="h-5 w-5" />,
      trend: -5.2,
      performance: "warning",
      subtitle: "آخر 7 أيام",
    },
    {
      title: "أرباح اليوم",
      value: 4200,
      icon: <Clock className="h-5 w-5" />,
      performance: "good",
      subtitle: "الصفقات المكتملة اليوم",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 lg:p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            getPerformanceColor(stat.performance)
          )}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-16 -translate-y-16" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg",
                  getPerformanceIconBg(stat.performance)
                )}
              >
                {stat.icon}
              </div>
              
              {stat.trend !== undefined && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full",
                    stat.trend >= 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {stat.trend >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  <span>{Math.abs(stat.trend)}%</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p
                className={cn(
                  "text-2xl lg:text-3xl font-bold",
                  getPerformanceTextColor(stat.performance)
                )}
              >
                {formatCurrency(stat.value)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{stat.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
