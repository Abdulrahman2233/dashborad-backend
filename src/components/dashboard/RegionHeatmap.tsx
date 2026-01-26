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
];

export function RegionHeatmap() {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold">📍 التوزيع الجغرافي</h3>
        <p className="text-xs lg:text-sm text-muted-foreground">حسب المنطقة</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 lg:gap-3">
        {regions.map((region) => (
          <div
            key={region.name}
            className="relative overflow-hidden rounded-lg p-3 lg:p-4 transition-transform hover:scale-105 border border-border"
            style={{
              background: `linear-gradient(135deg, 
                rgba(14, 165, 233, ${region.intensity / 100 * 0.15}) 0%, 
                rgba(20, 184, 166, ${region.intensity / 100 * 0.1}) 100%)`
            }}
          >
            <p className="font-medium text-sm">{region.name}</p>
            <p className="text-xl lg:text-2xl font-bold text-primary">{region.count}</p>
            <p className="text-[10px] lg:text-xs text-muted-foreground">عقار</p>
          </div>
        ))}
      </div>
    </div>
  );
}
