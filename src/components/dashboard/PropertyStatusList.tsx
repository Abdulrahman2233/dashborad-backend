import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyDetailsDialog } from "./PropertyDetailsDialog";

interface Property {
  id: string;
  name: string;
  owner: string;
  ownerType: "مالك" | "وسيط" | "مكتب";
  region: string;
  addedDate: string;
}

interface PropertyDetails {
  id: string;
  name: string;
  region: string;
  address: string;
  contactNumber: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage: number;
  rooms: number;
  beds: number;
  bathrooms: number;
  area: number;
  floor: number;
  type: string;
  furnished: boolean;
  featured: boolean;
  status: "approved" | "rejected" | "pending";
  latitude: number;
  longitude: number;
  description: string;
  addedDate: string;
  deletedDate?: string;
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

// Mock detailed property data
const propertyDetailsMap: Record<string, PropertyDetails> = {
  "1": {
    id: "1",
    name: "فيلا حي النرجس",
    region: "الرياض",
    address: "حي النرجس، شارع الأمير سلطان، بجوار مسجد الرحمة",
    contactNumber: "966501234567",
    currentPrice: 1500000,
    originalPrice: 1600000,
    discountPercentage: 6,
    rooms: 5,
    beds: 4,
    bathrooms: 3,
    area: 350,
    floor: 2,
    type: "عائلات",
    furnished: true,
    featured: true,
    status: "approved",
    latitude: 24.7136,
    longitude: 46.6753,
    description: "فيلا فاخرة في حي النرجس مع حديقة واسعة ومسبح خاص",
    addedDate: "2024-01-15 10:30:00",
  },
  "2": {
    id: "2",
    name: "شقة حي الملقا",
    region: "الرياض",
    address: "حي الملقا، طريق الملك فهد، برج الفيصلية",
    contactNumber: "966559876543",
    currentPrice: 450000,
    discountPercentage: 0,
    rooms: 3,
    beds: 2,
    bathrooms: 2,
    area: 180,
    floor: 8,
    type: "عائلات",
    furnished: false,
    featured: false,
    status: "approved",
    latitude: 24.7642,
    longitude: 46.6521,
    description: "شقة عصرية بإطلالة رائعة على المدينة",
    addedDate: "2024-01-14 14:20:00",
  },
  "3": {
    id: "3",
    name: "فيلا حي الروضة",
    region: "جدة",
    address: "حي الروضة، شارع التحلية، بالقرب من المركز التجاري",
    contactNumber: "966541234567",
    currentPrice: 2200000,
    originalPrice: 2500000,
    discountPercentage: 12,
    rooms: 6,
    beds: 5,
    bathrooms: 4,
    area: 500,
    floor: 3,
    type: "عائلات",
    furnished: true,
    featured: true,
    status: "approved",
    latitude: 21.5433,
    longitude: 39.1728,
    description: "فيلا راقية مع تشطيبات فاخرة ومسبح داخلي",
    addedDate: "2024-01-13 09:45:00",
  },
  "4": {
    id: "4",
    name: "شقة غير مكتملة",
    region: "الدمام",
    address: "الدمام، حي الفيصلية",
    contactNumber: "966531234567",
    currentPrice: 20001,
    discountPercentage: 0,
    rooms: 4,
    beds: 2,
    bathrooms: 1,
    area: 222,
    floor: 2,
    type: "عائلات",
    furnished: true,
    featured: false,
    status: "rejected",
    latitude: 31.178,
    longitude: 29.965,
    description: "2نتةلائ",
    addedDate: "2024-01-12 20:58:20",
    deletedDate: "2024-01-25 22:24:34",
  },
  "5": {
    id: "5",
    name: "عقار بدون صور",
    region: "مكة",
    address: "مكة المكرمة، العزيزية",
    contactNumber: "966521234567",
    currentPrice: 800000,
    discountPercentage: 0,
    rooms: 3,
    beds: 2,
    bathrooms: 2,
    area: 150,
    floor: 1,
    type: "عائلات",
    furnished: false,
    featured: false,
    status: "rejected",
    latitude: 21.4225,
    longitude: 39.8262,
    description: "عقار مرفوض بسبب عدم توفر صور كافية",
    addedDate: "2024-01-11 11:30:00",
  },
  "6": {
    id: "6",
    name: "فيلا قيد المراجعة",
    region: "الرياض",
    address: "حي العليا، شارع العروبة",
    contactNumber: "966501112222",
    currentPrice: 1800000,
    discountPercentage: 0,
    rooms: 5,
    beds: 4,
    bathrooms: 3,
    area: 400,
    floor: 2,
    type: "عائلات",
    furnished: true,
    featured: false,
    status: "pending",
    latitude: 24.6877,
    longitude: 46.7219,
    description: "فيلا جديدة قيد المراجعة",
    addedDate: "2024-01-16 08:00:00",
  },
  "7": {
    id: "7",
    name: "شقة جديدة",
    region: "جدة",
    address: "جدة، حي الشاطئ",
    contactNumber: "966503334444",
    currentPrice: 550000,
    discountPercentage: 0,
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    area: 120,
    floor: 5,
    type: "عزاب",
    furnished: false,
    featured: false,
    status: "pending",
    latitude: 21.5169,
    longitude: 39.2192,
    description: "شقة جديدة قيد المراجعة",
    addedDate: "2024-01-16 09:30:00",
  },
  "8": {
    id: "8",
    name: "مبنى تجاري",
    region: "الدمام",
    address: "الدمام، شارع الملك سعود",
    contactNumber: "966505556666",
    currentPrice: 5000000,
    discountPercentage: 0,
    rooms: 20,
    beds: 0,
    bathrooms: 10,
    area: 2000,
    floor: 5,
    type: "تجاري",
    furnished: false,
    featured: false,
    status: "pending",
    latitude: 26.4207,
    longitude: 50.0888,
    description: "مبنى تجاري متعدد الطوابق",
    addedDate: "2024-01-15 16:00:00",
  },
};

function PropertyTable({ 
  properties, 
  status,
  onViewProperty 
}: { 
  properties: Property[]; 
  status: "approved" | "rejected" | "pending";
  onViewProperty: (id: string) => void;
}) {
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
                <button 
                  onClick={() => onViewProperty(property.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
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
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewProperty = (id: string) => {
    const details = propertyDetailsMap[id];
    if (details) {
      setSelectedProperty(details);
      setDialogOpen(true);
    }
  };

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
          <PropertyTable properties={approvedProperties} status="approved" onViewProperty={handleViewProperty} />
        </TabsContent>
        <TabsContent value="rejected">
          <PropertyTable properties={rejectedProperties} status="rejected" onViewProperty={handleViewProperty} />
        </TabsContent>
        <TabsContent value="pending">
          <PropertyTable properties={pendingProperties} status="pending" onViewProperty={handleViewProperty} />
        </TabsContent>
      </Tabs>

      <PropertyDetailsDialog 
        property={selectedProperty} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
}
