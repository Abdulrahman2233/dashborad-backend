import { Building2, User, Percent, MessageSquare, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "property" | "user" | "offer" | "message" | "view";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "property",
    title: "عقار جديد",
    description: "تم إضافة فيلا في حي النرجس",
    time: "منذ 5 دقائق",
  },
  {
    id: "2",
    type: "user",
    title: "مستخدم جديد",
    description: "أحمد محمد سجل في المنصة",
    time: "منذ 15 دقيقة",
  },
  {
    id: "3",
    type: "offer",
    title: "خصم جديد",
    description: "تم تفعيل خصم 15% على الشقق",
    time: "منذ ساعة",
  },
  {
    id: "4",
    type: "message",
    title: "رسالة جديدة",
    description: "استفسار عن عقار في الرياض",
    time: "منذ ساعتين",
  },
  {
    id: "5",
    type: "view",
    title: "مشاهدة عالية",
    description: "شقة حي الملقا وصلت 500 مشاهدة",
    time: "منذ 3 ساعات",
  },
];

const iconMap = {
  property: Building2,
  user: User,
  offer: Percent,
  message: MessageSquare,
  view: Eye,
};

const colorMap = {
  property: "bg-primary/10 text-primary",
  user: "bg-success/10 text-success",
  offer: "bg-warning/10 text-warning",
  message: "bg-accent/10 text-accent",
  view: "bg-blue-glow/10 text-blue-glow",
};

export function ActivityFeed() {
  return (
    <div className="card-glow rounded-xl bg-card p-6 border border-border/50">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">آخر الأنشطة</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          عرض الكل
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors",
                index !== activities.length - 1 && "border-b border-border/50 pb-4"
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0", colorMap[activity.type])}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
