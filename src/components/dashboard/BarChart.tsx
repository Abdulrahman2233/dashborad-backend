import { Bar, BarChart as RechartsBar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  subtitle?: string;
}

export function BarChart({ data, title, subtitle }: BarChartProps) {
  return (
    <div className="card-glow rounded-xl bg-card p-6 border border-border/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data} layout="vertical">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(199 89% 48%)" />
                <stop offset="100%" stopColor="hsl(187 85% 43%)" />
              </linearGradient>
            </defs>
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(210 20% 60%)', fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="name"
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(210 20% 60%)', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(215 35% 12%)',
                border: '1px solid hsl(215 30% 22%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 98%)',
              }}
            />
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)" 
              radius={[0, 6, 6, 0]}
            />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
