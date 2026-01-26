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
  iconColor?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = "text-primary" }: StatCardProps) {
  return (
    <div className="card-glow group relative overflow-hidden rounded-xl bg-card p-6 border border-border/50">
      {/* Glow effect */}
      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          
          {change && (
            <div className={cn(
              "inline-flex items-center gap-1 text-sm font-medium rounded-full px-2.5 py-0.5",
              change.trend === "up" 
                ? "bg-success/10 text-success" 
                : "bg-destructive/10 text-destructive"
            )}>
              <span>{change.trend === "up" ? "+" : "-"}{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20",
          iconColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
