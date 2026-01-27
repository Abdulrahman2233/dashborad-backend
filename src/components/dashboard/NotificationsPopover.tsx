import { Bell, Building2, MessageSquare, UserPlus, Eye } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "property" | "message" | "user" | "view";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "property",
    title: "عقار جديد",
    description: "تم إضافة فيلا حي النرجس للمراجعة",
    time: "منذ 5 دقائق",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "رسالة جديدة",
    description: "أحمد محمد أرسل استفسار عن عقار",
    time: "منذ 15 دقيقة",
    read: false,
  },
  {
    id: "3",
    type: "user",
    title: "مستخدم جديد",
    description: "سعود العتيبي قام بالتسجيل كمالك",
    time: "منذ ساعة",
    read: false,
  },
  {
    id: "4",
    type: "view",
    title: "مشاهدات عالية",
    description: "شقة حي الملقا حققت 100 مشاهدة",
    time: "منذ ساعتين",
    read: true,
  },
  {
    id: "5",
    type: "property",
    title: "تم الموافقة",
    description: "تم اعتماد فيلا حي الروضة",
    time: "منذ 3 ساعات",
    read: true,
  },
  {
    id: "6",
    type: "message",
    title: "رسالة جديدة",
    description: "خالد سالم يسأل عن موعد المعاينة",
    time: "منذ 4 ساعات",
    read: true,
  },
];

const iconMap = {
  property: Building2,
  message: MessageSquare,
  user: UserPlus,
  view: Eye,
};

const colorMap = {
  property: "bg-blue-100 text-blue-600",
  message: "bg-purple-100 text-purple-600",
  user: "bg-green-100 text-green-600",
  view: "bg-amber-100 text-amber-600",
};

export function NotificationsPopover() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">الإشعارات</h4>
            {unreadCount > 0 && (
              <span className="text-xs text-primary font-medium">{unreadCount} جديد</span>
            )}
          </div>
        </div>
        <ScrollArea className="h-80">
          <div className="p-2">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className={cn("p-2 rounded-full", colorMap[notification.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <button className="w-full text-center text-sm text-primary font-medium hover:underline">
            عرض جميع الإشعارات
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
