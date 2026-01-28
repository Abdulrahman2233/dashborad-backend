import { useState } from "react";
import { MapPin, Building2, TrendingUp, TrendingDown, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegionData {
  id: string;
  name: string;
  properties: number;
  growth: number;
  demand: "high" | "medium" | "low";
  views: number;
  users: number;
}

const regionsData: RegionData[] = [
  { id: "riyadh", name: "الرياض", properties: 450, growth: 15, demand: "high", views: 12500, users: 3200 },
  { id: "jeddah", name: "جدة", properties: 320, growth: 12, demand: "high", views: 8900, users: 2100 },
  { id: "dammam", name: "الدمام", properties: 180, growth: 8, demand: "medium", views: 4500, users: 890 },
  { id: "makkah", name: "مكة", properties: 150, growth: -3, demand: "medium", views: 3800, users: 720 },
  { id: "madinah", name: "المدينة", properties: 120, growth: 5, demand: "medium", views: 2900, users: 560 },
  { id: "taif", name: "الطائف", properties: 90, growth: 10, demand: "low", views: 1800, users: 340 },
  { id: "khobar", name: "الخبر", properties: 95, growth: 18, demand: "high", views: 2400, users: 480 },
  { id: "abha", name: "أبها", properties: 65, growth: 7, demand: "low", views: 1200, users: 220 },
];

const demandColors = {
  high: { bg: "bg-red-500", text: "text-red-600 dark:text-red-400", label: "مرتفع", intensity: 1 },
  medium: { bg: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", label: "متوسط", intensity: 0.6 },
  low: { bg: "bg-green-500", text: "text-green-600 dark:text-green-400", label: "منخفض", intensity: 0.3 },
};

export function InteractiveHeatmap() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
  const maxProperties = Math.max(...regionsData.map(r => r.properties));

  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg lg:text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            خريطة توزيع العقارات
          </h3>
          <p className="text-sm text-muted-foreground mt-1">التوزيع الجغرافي والطلب</p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(demandColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={cn("h-3 w-3 rounded-full", val.bg)} />
              <span className="text-xs text-muted-foreground">{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {regionsData.map((region) => {
          const intensity = region.properties / maxProperties;
          const isSelected = selectedRegion?.id === region.id;
          const isHovered = hoveredRegion === region.id;
          const demandStyle = demandColors[region.demand];
          
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(isSelected ? null : region)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={cn(
                "relative p-3 rounded-xl border-2 transition-all duration-300 text-center group",
                isSelected 
                  ? "border-primary bg-primary/10 scale-105 shadow-lg" 
                  : isHovered
                    ? "border-primary/50 bg-muted/50 scale-102"
                    : "border-transparent bg-muted/30 hover:bg-muted/50"
              )}
              style={{
                background: isSelected 
                  ? undefined 
                  : `linear-gradient(135deg, hsl(var(--muted) / ${0.3 + intensity * 0.4}), hsl(var(--primary) / ${intensity * 0.15}))`
              }}
            >
              {/* Demand indicator */}
              <div className={cn(
                "absolute top-2 left-2 h-2.5 w-2.5 rounded-full transition-transform",
                demandStyle.bg,
                (isHovered || isSelected) && "scale-125"
              )} />
              
              <MapPin className={cn(
                "h-5 w-5 mx-auto mb-1 transition-colors",
                isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )} />
              <p className="text-sm font-bold">{region.name}</p>
              <p className="text-lg font-bold text-primary">{region.properties}</p>
              <p className="text-xs text-muted-foreground">عقار</p>
              
              {/* Growth indicator */}
              <div className={cn(
                "flex items-center justify-center gap-0.5 mt-1 text-xs font-medium",
                region.growth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {region.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{Math.abs(region.growth)}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-cyan-500/5 border border-primary/20 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {selectedRegion.name}
            </h4>
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              demandColors[selectedRegion.demand].bg,
              "text-white"
            )}>
              طلب {demandColors[selectedRegion.demand].label}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-card">
              <Building2 className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <p className="text-xl font-bold">{selectedRegion.properties}</p>
              <p className="text-xs text-muted-foreground">عقار</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card">
              <Eye className="h-5 w-5 mx-auto text-purple-500 mb-1" />
              <p className="text-xl font-bold">{(selectedRegion.views / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">مشاهدة</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card">
              <Users className="h-5 w-5 mx-auto text-green-500 mb-1" />
              <p className="text-xl font-bold">{selectedRegion.users}</p>
              <p className="text-xs text-muted-foreground">مستخدم</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card">
              {selectedRegion.growth >= 0 ? (
                <TrendingUp className="h-5 w-5 mx-auto text-green-500 mb-1" />
              ) : (
                <TrendingDown className="h-5 w-5 mx-auto text-red-500 mb-1" />
              )}
              <p className={cn(
                "text-xl font-bold",
                selectedRegion.growth >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {selectedRegion.growth >= 0 ? "+" : ""}{selectedRegion.growth}%
              </p>
              <p className="text-xs text-muted-foreground">النمو</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
