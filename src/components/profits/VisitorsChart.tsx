import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const visitorsData = {
  "7days": [
    { name: "السبت", visitors: 1250 },
    { name: "الأحد", visitors: 1180 },
    { name: "الاثنين", visitors: 1420 },
    { name: "الثلاثاء", visitors: 1350 },
    { name: "الأربعاء", visitors: 1580 },
    { name: "الخميس", visitors: 1490 },
    { name: "الجمعة", visitors: 980 },
  ],
  "30days": [
    { name: "1", visitors: 1200 },
    { name: "3", visitors: 1350 },
    { name: "5", visitors: 1180 },
    { name: "7", visitors: 1420 },
    { name: "9", visitors: 1550 },
    { name: "11", visitors: 1380 },
    { name: "13", visitors: 1620 },
    { name: "15", visitors: 1490 },
    { name: "17", visitors: 1350 },
    { name: "19", visitors: 1280 },
    { name: "21", visitors: 1150 },
    { name: "23", visitors: 1320 },
    { name: "25", visitors: 1450 },
    { name: "27", visitors: 1380 },
    { name: "29", visitors: 1520 },
    { name: "30", visitors: 1250 },
  ],
  "3months": [
    { name: "نوفمبر", visitors: 35000 },
    { name: "ديسمبر", visitors: 42000 },
    { name: "يناير", visitors: 38500 },
  ],
};

type TimeRange = "7days" | "30days" | "3months";

export function VisitorsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  
  const data = visitorsData[timeRange];
  const totalVisitors = data.reduce((sum, d) => sum + d.visitors, 0);
  
  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center">
            <Users className="h-6 w-6 text-rose-500" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-foreground">
              👥 إحصائيات زوار الموقع
            </h3>
            <p className="text-sm text-muted-foreground">
              إجمالي: {new Intl.NumberFormat("ar-EG").format(totalVisitors)} زائر
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {[
            { key: "7days", label: "7 أيام" },
            { key: "30days", label: "30 يوم" },
            { key: "3months", label: "3 شهور" },
          ].map((range) => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.key as TimeRange)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />
                <stop offset="50%" stopColor="#fb923c" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#fdba74" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
              opacity={0.3}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              width={50}
              tickFormatter={(value) => 
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
                padding: '12px 16px',
              }}
              labelStyle={{ 
                color: 'hsl(var(--foreground))', 
                fontWeight: 600, 
                marginBottom: 8 
              }}
              formatter={(value: number) => [
                `${new Intl.NumberFormat("ar-EG").format(value)} زائر`,
                "الزوار"
              ]}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#f97316"
              strokeWidth={3}
              fill="url(#visitorsGradient)"
              dot={false}
              activeDot={{ 
                r: 8, 
                strokeWidth: 3, 
                stroke: '#fff',
                fill: '#f97316'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
