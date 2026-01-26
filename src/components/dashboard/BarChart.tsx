import { Bar, BarChart as RechartsBar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  subtitle?: string;
}

export function BarChart({ data, title, subtitle }: BarChartProps) {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-xs lg:text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="h-48 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data} layout="vertical">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis 
              type="category"
              dataKey="name"
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#1e293b',
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
