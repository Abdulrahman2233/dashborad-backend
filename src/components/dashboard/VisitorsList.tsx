import { Smartphone, Monitor, Globe, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Visitor {
  id: string;
  sessionId: string;
  country: string;
  province: string;
  city: string;
  deviceType: "mobile" | "desktop";
  deviceName: string;
  os: string;
  lastVisit: string;
  visitTime: string;
}

const visitorsData: Visitor[] = [
  { id: "1", sessionId: "VST-2024-001", country: "السعودية", province: "الرياض", city: "الرياض", deviceType: "mobile", deviceName: "iPhone 15 Pro", os: "iOS 17", lastVisit: "2024-01-16", visitTime: "14:30" },
  { id: "2", sessionId: "VST-2024-002", country: "السعودية", province: "مكة", city: "جدة", deviceType: "desktop", deviceName: "MacBook Pro", os: "macOS Sonoma", lastVisit: "2024-01-16", visitTime: "13:45" },
  { id: "3", sessionId: "VST-2024-003", country: "الإمارات", province: "دبي", city: "دبي", deviceType: "mobile", deviceName: "Samsung S24", os: "Android 14", lastVisit: "2024-01-16", visitTime: "12:20" },
  { id: "4", sessionId: "VST-2024-004", country: "السعودية", province: "الشرقية", city: "الدمام", deviceType: "desktop", deviceName: "Windows PC", os: "Windows 11", lastVisit: "2024-01-16", visitTime: "11:55" },
  { id: "5", sessionId: "VST-2024-005", country: "الكويت", province: "العاصمة", city: "الكويت", deviceType: "mobile", deviceName: "iPhone 14", os: "iOS 16", lastVisit: "2024-01-15", visitTime: "22:10" },
  { id: "6", sessionId: "VST-2024-006", country: "السعودية", province: "القصيم", city: "بريدة", deviceType: "mobile", deviceName: "Huawei P60", os: "HarmonyOS", lastVisit: "2024-01-15", visitTime: "19:30" },
  { id: "7", sessionId: "VST-2024-007", country: "مصر", province: "القاهرة", city: "القاهرة", deviceType: "desktop", deviceName: "Dell Laptop", os: "Windows 10", lastVisit: "2024-01-15", visitTime: "18:00" },
  { id: "8", sessionId: "VST-2024-008", country: "السعودية", province: "عسير", city: "أبها", deviceType: "mobile", deviceName: "Xiaomi 14", os: "Android 14", lastVisit: "2024-01-15", visitTime: "16:45" },
];

export function VisitorsList() {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="mb-4 lg:mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">👥 الحسابات التي زارت الموقع</h3>
          <p className="text-sm text-muted-foreground">تحليل بيانات الزوار</p>
        </div>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {visitorsData.length} زائر
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">الجلسة</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">الموقع الجغرافي</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">الجهاز</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">النظام</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">آخر زيارة</th>
            </tr>
          </thead>
          <tbody>
            {visitorsData.map((visitor) => (
              <tr key={visitor.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">{visitor.sessionId}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{visitor.country} - {visitor.province} - {visitor.city}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {visitor.deviceType === "mobile" ? (
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Monitor className="h-4 w-4 text-purple-600" />
                    )}
                    <span className="text-sm">{visitor.deviceName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    visitor.os.includes("iOS") || visitor.os.includes("mac") ? "bg-gray-100 text-gray-700" :
                    visitor.os.includes("Android") ? "bg-green-100 text-green-700" :
                    visitor.os.includes("Windows") ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {visitor.os}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{visitor.lastVisit} - {visitor.visitTime}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {visitorsData.map((visitor) => (
          <div key={visitor.id} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">{visitor.sessionId}</span>
              {visitor.deviceType === "mobile" ? (
                <Smartphone className="h-4 w-4 text-blue-600" />
              ) : (
                <Monitor className="h-4 w-4 text-purple-600" />
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{visitor.country} - {visitor.province} - {visitor.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{visitor.deviceName}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  visitor.os.includes("iOS") || visitor.os.includes("mac") ? "bg-gray-100 text-gray-700" :
                  visitor.os.includes("Android") ? "bg-green-100 text-green-700" :
                  "bg-blue-100 text-blue-700"
                )}>
                  {visitor.os}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{visitor.lastVisit} - {visitor.visitTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
