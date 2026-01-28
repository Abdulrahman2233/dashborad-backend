import { useState, useEffect } from "react";
import { Activity, TrendingUp, Users, Building2, MessageSquare, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: number;
  type: "property" | "user" | "message" | "view";
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
}

const activities: ActivityItem[] = [
  { id: 1, type: "property", title: "عقار جديد", description: "تم إضافة فيلا في الرياض", time: "منذ دقيقة", isNew: true },
  { id: 2, type: "user", title: "مستخدم جديد", description: "انضم أحمد محمد للمنصة", time: "منذ 3 دقائق", isNew: true },
  { id: 3, type: "message", title: "رسالة جديدة", description: "استفسار عن شقة في جدة", time: "منذ 5 دقائق" },
  { id: 4, type: "view", title: "مشاهدة عقار", description: "50 مشاهدة لفيلا الياسمين", time: "منذ 10 دقائق" },
  { id: 5, type: "property", title: "تحديث عقار", description: "تم تعديل سعر شقة الملز", time: "منذ 15 دقيقة" },
  { id: 6, type: "user", title: "تسجيل وسيط", description: "انضم مكتب الفيصل العقاري", time: "منذ 20 دقيقة" },
];

const iconMap = {
  property: Building2,
  user: Users,
  message: MessageSquare,
  view: Eye,
};

const colorMap = {
  property: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  user: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  message: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  view: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

export function LiveActivityWidget() {
  const [currentActivities, setCurrentActivities] = useState(activities);
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="h-5 w-5 text-primary" />
            <span className={cn(
              "absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 transition-transform",
              pulse && "animate-ping"
            )} />
          </div>
          <div>
            <h3 className="text-lg font-bold">النشاط المباشر</h3>
            <p className="text-xs text-muted-foreground">تحديثات لحظية</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-700 dark:text-green-400">مباشر</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {currentActivities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div 
              key={activity.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-muted/50",
                activity.isNew && "bg-primary/5 border border-primary/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-2 rounded-lg", colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{activity.title}</p>
                  {activity.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded">
                      جديد
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">إجمالي اليوم</span>
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
            <TrendingUp className="h-4 w-4" />
            <span>+127 نشاط</span>
          </div>
        </div>
      </div>
    </div>
  );
}
