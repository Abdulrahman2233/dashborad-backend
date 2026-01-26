import { Area, AreaChart as RechartsArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartProps {
  data: Array<{ name: string; value: number; value2?: number }>;
  title: string;
  subtitle?: string;
}

export function AreaChart({ data, title, subtitle }: AreaChartProps) {
  return (
    <div className="card-glow rounded-xl bg-card p-6 border border-border/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsArea data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187 85% 43%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187 85% 43%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(210 20% 60%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(210 20% 60%)', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(215 35% 12%)',
                border: '1px solid hsl(215 30% 22%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 98%)',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(199 89% 48%)"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
            {data[0]?.value2 !== undefined && (
              <Area
                type="monotone"
                dataKey="value2"
                stroke="hsl(187 85% 43%)"
                strokeWidth={2}
                fill="url(#colorValue2)"
              />
            )}
          </RechartsArea>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
