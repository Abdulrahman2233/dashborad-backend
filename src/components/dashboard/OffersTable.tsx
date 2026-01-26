import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Offer {
  id: string;
  name: string;
  discount: number;
  usage: number;
  status: "active" | "expired" | "scheduled";
  revenue: number;
}

const offers: Offer[] = [
  { id: "1", name: "عرض الصيف", discount: 15, usage: 245, status: "active", revenue: 125000 },
  { id: "2", name: "خصم العملاء الجدد", discount: 10, usage: 189, status: "active", revenue: 89000 },
  { id: "3", name: "عرض نهاية السنة", discount: 20, usage: 156, status: "expired", revenue: 156000 },
  { id: "4", name: "خصم VIP", discount: 25, usage: 78, status: "active", revenue: 234000 },
  { id: "5", name: "عرض رمضان", discount: 30, usage: 0, status: "scheduled", revenue: 0 },
];

const statusMap = {
  active: { label: "نشط", className: "bg-success/10 text-success border-success/20" },
  expired: { label: "منتهي", className: "bg-destructive/10 text-destructive border-destructive/20" },
  scheduled: { label: "مجدول", className: "bg-warning/10 text-warning border-warning/20" },
};

export function OffersTable() {
  return (
    <div className="card-glow rounded-xl bg-card border border-border/50 overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold">💳 الخصومات والعروض</h3>
        <p className="text-sm text-muted-foreground">أكثر الخصومات استخداماً</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">الاسم</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">الخصم</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">الاستخدام</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">الحالة</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">الإيرادات</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{offer.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {offer.discount}%
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{offer.usage} مرة</td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={cn("border", statusMap[offer.status].className)}>
                    {statusMap[offer.status].label}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-medium">
                  {offer.revenue.toLocaleString()} ر.س
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
