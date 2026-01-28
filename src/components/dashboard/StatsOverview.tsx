import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  title: string;
  value: string | number;
  change?: { value: number; trend: "up" | "down" };
  icon: LucideIcon;
  color: string;
}

interface StatsOverviewProps {
  stats: StatItem[];
}

const colorVariants: Record<string, { bg: string; icon: string; gradient: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    icon: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-500",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-pink-500",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    icon: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-amber-500",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    icon: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500 to-teal-500",
  },
};

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const colors = colorVariants[stat.color] || colorVariants.blue;
        return (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-card p-5 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Decorative gradient orb */}
            <div className={cn(
              "absolute -top-12 -left-12 h-24 w-24 rounded-full opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-150",
              `bg-gradient-to-br ${colors.gradient}`
            )} />
            
            <div className="relative flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-bold tracking-tight">{stat.value}</p>
                
                {stat.change && (
                  <div className={cn(
                    "inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1",
                    stat.change.trend === "up" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}>
                    {stat.change.trend === "up" ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    <span>{Math.abs(stat.change.value)}%</span>
                  </div>
                )}
              </div>
              
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                colors.bg
              )}>
                <stat.icon className={cn("h-6 w-6", colors.icon)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
