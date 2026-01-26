import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: LucideIcon;
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <div className="card-glow group relative overflow-hidden rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs lg:text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl lg:text-3xl font-bold">{value}</p>
          
          {change && (
            <div className={cn(
              "inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
              change.trend === "up" 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            )}>
              <span>{change.trend === "up" ? "+" : "-"}{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
        </div>
      </div>
    </div>
  );
}
