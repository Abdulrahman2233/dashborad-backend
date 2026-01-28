import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { TrendingUp, TrendingDown, Target, Users, Eye, DollarSign } from "lucide-react";

interface MetricData {
  name: string;
  value: number;
  target: number;
  color: string;
  icon: any;
}

const metrics: MetricData[] = [
  { name: "معدل التحويل", value: 78, target: 85, color: "#0ea5e9", icon: Target },
  { name: "المستخدمين النشطين", value: 92, target: 90, color: "#22c55e", icon: Users },
  { name: "المشاهدات", value: 65, target: 80, color: "#f59e0b", icon: Eye },
  { name: "الإيرادات", value: 88, target: 95, color: "#8b5cf6", icon: DollarSign },
];

function CircularProgress({ value, target, color, size = 100 }: { value: number; target: number; color: string; size?: number }) {
  const data = [{ value, fill: color }];
  const isAboveTarget = value >= target;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'hsl(var(--muted))' }}
            dataKey="value"
            cornerRadius={10}
            angleAxisId={0}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold">{value}%</span>
      </div>
    </div>
  );
}

export function PerformanceMetrics() {
  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">مؤشرات الأداء</h3>
          <p className="text-sm text-muted-foreground">مقارنة بالأهداف الشهرية</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const isAboveTarget = metric.value >= metric.target;
          return (
            <div 
              key={index}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <CircularProgress 
                value={metric.value} 
                target={metric.target} 
                color={metric.color}
                size={80}
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold">{metric.name}</p>
                <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${
                  isAboveTarget ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {isAboveTarget ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>الهدف: {metric.target}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
