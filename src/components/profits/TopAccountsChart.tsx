import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const accountsData = [
  { name: "ملاك", transactions: 245, profit: 520000, color: "#0ea5e9" },
  { name: "وسطاء", transactions: 189, profit: 380000, color: "#22c55e" },
  { name: "مكاتب عقارات", transactions: 156, profit: 290000, color: "#f59e0b" },
];

const sortedData = [...accountsData].sort((a, b) => b.profit - a.profit);

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xl">
      <p className="font-bold text-foreground mb-2">{data.name}</p>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">عدد الصفقات:</span>
          <span className="font-semibold text-primary">{data.transactions}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">إجمالي الربح:</span>
          <span className="font-semibold text-green-600">
            {new Intl.NumberFormat("ar-EG").format(data.profit)} ج.م
          </span>
        </div>
      </div>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function TopAccountsChart() {
  const [chartType, setChartType] = useState<"bar" | "donut">("bar");

  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg lg:text-xl font-bold text-foreground flex items-center gap-2">
            <span>🏆</span>
            أفضل الحسابات مبيعًا
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            ترتيب تنازلي حسب إجمالي الأرباح
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
            className="text-xs"
          >
            أعمدة
          </Button>
          <Button
            variant={chartType === "donut" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("donut")}
            className="text-xs"
          >
            دائري
          </Button>
        </div>
      </div>

      <div className="h-72">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={true}
                vertical={false}
                opacity={0.5}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="profit" radius={[0, 8, 8, 0]} maxBarSize={45}>
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={index === 0 ? 1 : 0.7}
                    stroke={index === 0 ? entry.color : "none"}
                    strokeWidth={index === 0 ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={50}
                dataKey="profit"
                stroke="hsl(var(--card))"
                strokeWidth={3}
              >
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={index === 0 ? 1 : 0.8}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border">
        {sortedData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            {index === 0 && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                الأعلى
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
