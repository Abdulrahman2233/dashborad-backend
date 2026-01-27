import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Property {
  id: string;
  name: string;
  owner: string;
  ownerType: "مالك" | "وسيط" | "مكتب";
  region: string;
  addedDate: string;
}

const approvedProperties: Property[] = [
  { id: "1", name: "فيلا حي النرجس", owner: "أحمد محمد", ownerType: "مالك", region: "الرياض", addedDate: "2024-01-15" },
  { id: "2", name: "شقة حي الملقا", owner: "مكتب الأمل", ownerType: "مكتب", region: "الرياض", addedDate: "2024-01-14" },
  { id: "3", name: "فيلا حي الروضة", owner: "سعيد العمري", ownerType: "وسيط", region: "جدة", addedDate: "2024-01-13" },
];

const rejectedProperties: Property[] = [
  { id: "4", name: "شقة غير مكتملة", owner: "محمد أحمد", ownerType: "مالك", region: "الدمام", addedDate: "2024-01-12" },
  { id: "5", name: "عقار بدون صور", owner: "مكتب النور", ownerType: "مكتب", region: "مكة", addedDate: "2024-01-11" },
];

const pendingProperties: Property[] = [
  { id: "6", name: "فيلا قيد المراجعة", owner: "خالد سالم", ownerType: "مالك", region: "الرياض", addedDate: "2024-01-16" },
  { id: "7", name: "شقة جديدة", owner: "وسيط العقار", ownerType: "وسيط", region: "جدة", addedDate: "2024-01-16" },
  { id: "8", name: "مبنى تجاري", owner: "شركة البناء", ownerType: "مكتب", region: "الدمام", addedDate: "2024-01-15" },
];

function PropertyTable({ properties, status }: { properties: Property[]; status: "approved" | "rejected" | "pending" }) {
  const statusColors = {
    approved: "text-emerald-600 bg-emerald-100",
    rejected: "text-red-600 bg-red-100",
    pending: "text-amber-600 bg-amber-100",
  };

  const ownerTypeColors = {
    "مالك": "bg-blue-100 text-blue-700",
    "وسيط": "bg-purple-100 text-purple-700",
    "مكتب": "bg-cyan-100 text-cyan-700",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">اسم العقار</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">المالك / الوسيط</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">النوع</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden lg:table-cell">المنطقة</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden lg:table-cell">تاريخ الإضافة</th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
              <td className="py-3 px-4">
                <span className="font-medium text-sm">{property.name}</span>
              </td>
              <td className="py-3 px-4 text-sm">{property.owner}</td>
              <td className="py-3 px-4 hidden md:table-cell">
                <span className={cn("text-xs px-2 py-1 rounded-full font-medium", ownerTypeColors[property.ownerType])}>
                  {property.ownerType}
                </span>
              </td>
              <td className="py-3 px-4 text-sm hidden lg:table-cell">{property.region}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{property.addedDate}</td>
              <td className="py-3 px-4 text-center">
                <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">عرض</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PropertyStatusList() {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">📋 قوائم حالة العقارات</h3>
      
      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span className="hidden sm:inline">موافق عليها</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{approvedProperties.length}</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="hidden sm:inline">مرفوضة</span>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">{rejectedProperties.length}</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="hidden sm:inline">معلّقة</span>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{pendingProperties.length}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="approved">
          <PropertyTable properties={approvedProperties} status="approved" />
        </TabsContent>
        <TabsContent value="rejected">
          <PropertyTable properties={rejectedProperties} status="rejected" />
        </TabsContent>
        <TabsContent value="pending">
          <PropertyTable properties={pendingProperties} status="pending" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
