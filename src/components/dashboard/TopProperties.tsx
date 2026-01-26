import { Eye, TrendingUp } from "lucide-react";

interface Property {
  id: string;
  name: string;
  location: string;
  views: number;
  trend: number;
  image: string;
}

const properties: Property[] = [
  {
    id: "1",
    name: "فيلا فاخرة",
    location: "حي النرجس، الرياض",
    views: 1250,
    trend: 12,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "شقة عصرية",
    location: "حي الملقا، الرياض",
    views: 980,
    trend: 8,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "دوبلكس راقي",
    location: "حي الياسمين، الرياض",
    views: 756,
    trend: 15,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    name: "قصر ملكي",
    location: "حي حطين، الرياض",
    views: 654,
    trend: 5,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop",
  },
];

export function TopProperties() {
  return (
    <div className="card-glow rounded-xl bg-card p-6 border border-border/50">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">⭐ أكثر العقارات مشاهدة</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          عرض الكل
        </button>
      </div>
      
      <div className="space-y-4">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
            <img
              src={property.image}
              alt={property.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{property.name}</p>
              <p className="text-xs text-muted-foreground truncate">{property.location}</p>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Eye className="h-4 w-4 text-muted-foreground" />
                {property.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +{property.trend}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
