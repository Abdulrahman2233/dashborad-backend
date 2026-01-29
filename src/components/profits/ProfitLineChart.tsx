import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";

const generateData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString("ar-EG", { month: "short", day: "numeric" }),
      طلاب: Math.floor(Math.random() * 15000) + 5000,
      عائلات: Math.floor(Math.random() * 20000) + 8000,
      مصيفين: Math.floor(Math.random() * 25000) + 10000,
      "حجز يومي": Math.floor(Math.random() * 10000) + 3000,
      استوديو: Math.floor(Math.random() * 12000) + 4000,
    });
  }
  
  return data;
};

const clientTypes = [
  { key: "طلاب", color: "#0ea5e9", label: "طلاب" },
  { key: "عائلات", color: "#22c55e", label: "عائلات" },
  { key: "مصيفين", color: "#f59e0b", label: "مصيفين" },
  { key: "حجز يومي", color: "#ec4899", label: "حجز يومي" },
  { key: "استوديو", color: "#8b5cf6", label: "استوديو" },
];

const timeFilters = [
  { label: "7 أيام", value: 7 },
  { label: "30 يوم", value: 30 },
  { label: "3 شهور", value: 90 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  const totalProfit = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
  const totalTransactions = payload.length * Math.floor(Math.random() * 5 + 3);

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xl">
      <p className="font-bold text-foreground mb-3 border-b border-border pb-2">{label}</p>
      <div className="space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-semibold text-foreground">
              {new Intl.NumberFormat("ar-EG").format(entry.value)} ج.م
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-3 pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">عدد الصفقات:</span>
          <span className="font-bold text-primary">{totalTransactions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">إجمالي الربح:</span>
          <span className="font-bold text-green-600">
            {new Intl.NumberFormat("ar-EG").format(totalProfit)} ج.م
          </span>
        </div>
      </div>
    </div>
  );
};

export function ProfitLineChart() {
  const [activeFilter, setActiveFilter] = useState(30);
  const data = generateData(activeFilter);

  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg lg:text-xl font-bold text-foreground flex items-center gap-2">
            <span>📈</span>
            الصفقات حسب نوع العميل
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            مقارنة الأداء حسب أنواع العملاء المختلفة
          </p>
        </div>
        
        <div className="flex gap-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              {clientTypes.map((type) => (
                <linearGradient
                  key={type.key}
                  id={`gradient-${type.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={type.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={type.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
            {clientTypes.map((type) => (
              <Line
                key={type.key}
                type="monotone"
                dataKey={type.key}
                stroke={type.color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
