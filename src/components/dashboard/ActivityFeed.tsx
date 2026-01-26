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
  { id: "1", type: "property", title: "عقار جديد", description: "تم إضافة فيلا في حي النرجس", time: "منذ 5 دقائق" },
  { id: "2", type: "user", title: "مستخدم جديد", description: "أحمد محمد سجل في المنصة", time: "منذ 15 دقيقة" },
  { id: "3", type: "offer", title: "خصم جديد", description: "تم تفعيل خصم 15% على الشقق", time: "منذ ساعة" },
  { id: "4", type: "message", title: "رسالة جديدة", description: "استفسار عن عقار في الرياض", time: "منذ ساعتين" },
  { id: "5", type: "view", title: "مشاهدة عالية", description: "شقة حي الملقا وصلت 500 مشاهدة", time: "منذ 3 ساعات" },
];

const iconMap = {
  property: Building2,
  user: User,
  offer: Percent,
  message: MessageSquare,
  view: Eye,
};

const colorMap = {
  property: "bg-blue-100 text-blue-600",
  user: "bg-green-100 text-green-600",
  offer: "bg-amber-100 text-amber-600",
  message: "bg-purple-100 text-purple-600",
  view: "bg-cyan-100 text-cyan-600",
};

export function ActivityFeed() {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="mb-4 lg:mb-6 flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold">آخر الأنشطة</h3>
        <button className="text-xs lg:text-sm text-primary hover:underline">عرض الكل</button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0", colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-[10px] lg:text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
