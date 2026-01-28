import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Eye, 
  DollarSign, 
  MessageSquare, 
  Clock, 
  Star, 
  ShieldCheck,
  Zap,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricData {
  name: string;
  value: number;
  target: number;
  color: string;
  icon: any;
  description: string;
}

const metrics: MetricData[] = [
  { name: "معدل التحويل", value: 78, target: 85, color: "#0ea5e9", icon: Target, description: "تحويل الزوار إلى عملاء" },
  { name: "المستخدمين النشطين", value: 92, target: 90, color: "#22c55e", icon: Users, description: "نشاط المستخدمين اليومي" },
  { name: "المشاهدات", value: 65, target: 80, color: "#f59e0b", icon: Eye, description: "مشاهدات العقارات" },
  { name: "الإيرادات", value: 88, target: 95, color: "#8b5cf6", icon: DollarSign, description: "الأداء المالي" },
  { name: "رضا العملاء", value: 94, target: 90, color: "#ec4899", icon: Heart, description: "تقييم العملاء" },
  { name: "سرعة الاستجابة", value: 72, target: 85, color: "#14b8a6", icon: Zap, description: "الرد على الاستفسارات" },
  { name: "معدل الإغلاق", value: 68, target: 75, color: "#f97316", icon: ShieldCheck, description: "إتمام الصفقات" },
  { name: "التقييمات", value: 96, target: 90, color: "#6366f1", icon: Star, description: "متوسط التقييمات" },
];

function CircularProgress({ value, target, color, size = 70 }: { value: number; target: number; color: string; size?: number }) {
  const data = [{ value, fill: color }];
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'hsl(var(--muted))' }}
            dataKey="value"
            cornerRadius={10}
            angleAxisId={0}
            fill={`url(#gradient-${color.replace('#', '')})`}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold">{value}%</span>
      </div>
    </div>
  );
}

export function AdvancedPerformanceMetrics() {
  const averagePerformance = Math.round(metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length);
  const aboveTargetCount = metrics.filter(m => m.value >= m.target).length;

  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg lg:text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📊</span>
            مؤشرات الأداء
          </h3>
          <p className="text-sm text-muted-foreground mt-1">تحليل شامل للأداء</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center px-4 py-2 rounded-xl bg-primary/10">
            <p className="text-2xl font-bold text-primary">{averagePerformance}%</p>
            <p className="text-xs text-muted-foreground">المتوسط العام</p>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{aboveTargetCount}/{metrics.length}</p>
            <p className="text-xs text-muted-foreground">فوق الهدف</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric, index) => {
          const isAboveTarget = metric.value >= metric.target;
          const Icon = metric.icon;
          
          return (
            <div 
              key={index}
              className="group flex flex-col items-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:scale-102 cursor-pointer"
            >
              <div className="relative">
                <CircularProgress 
                  value={metric.value} 
                  target={metric.target} 
                  color={metric.color}
                  size={70}
                />
                <div 
                  className="absolute -top-1 -right-1 p-1.5 rounded-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: metric.color }} />
                </div>
              </div>
              
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold">{metric.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 hidden group-hover:block animate-fade-in">
                  {metric.description}
                </p>
                <div className={cn(
                  "flex items-center justify-center gap-1 mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full",
                  isAboveTarget 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                )}>
                  {isAboveTarget ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{metric.target}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Bar */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-purple-500/5 border border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">تحسن عام مقارنة بالشهر السابق</span>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
            <TrendingUp className="h-4 w-4" />
            <span>+12.5%</span>
          </div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${averagePerformance}%` }}
          />
        </div>
      </div>
    </div>
  );
}
