import { cn } from "@/lib/utils";

interface Region {
  name: string;
  count: number;
  intensity: number;
}

const regions: Region[] = [
  { name: "الرياض", count: 450, intensity: 100 },
  { name: "جدة", count: 320, intensity: 71 },
  { name: "الدمام", count: 180, intensity: 40 },
  { name: "مكة", count: 150, intensity: 33 },
  { name: "المدينة", count: 120, intensity: 27 },
  { name: "الخبر", count: 95, intensity: 21 },
  { name: "الطائف", count: 75, intensity: 17 },
  { name: "تبوك", count: 45, intensity: 10 },
];

export function RegionHeatmap() {
  return (
    <div className="card-glow rounded-xl bg-card p-6 border border-border/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">📍 التوزيع الجغرافي للعقارات</h3>
        <p className="text-sm text-muted-foreground">حسب المنطقة</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {regions.map((region) => (
          <div
            key={region.name}
            className={cn(
              "relative overflow-hidden rounded-lg p-4 transition-transform hover:scale-105",
              "border border-border/50"
            )}
            style={{
              background: `linear-gradient(135deg, 
                hsl(199 89% 48% / ${region.intensity / 100 * 0.3}) 0%, 
                hsl(187 85% 43% / ${region.intensity / 100 * 0.2}) 100%)`
            }}
          >
            <div className="relative z-10">
              <p className="font-medium">{region.name}</p>
              <p className="text-2xl font-bold text-primary">{region.count}</p>
              <p className="text-xs text-muted-foreground">عقار</p>
            </div>
            
            {/* Glow effect */}
            <div 
              className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full blur-2xl"
              style={{
                backgroundColor: `hsl(199 89% 48% / ${region.intensity / 100 * 0.4})`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
