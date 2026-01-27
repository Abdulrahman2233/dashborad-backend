import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { User, Bell, Shield, Palette, Moon, Sun, MessageSquare, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    properties: true,
    messages: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      localStorage.setItem("notifications", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  return (
    <DashboardLayout title="الإعدادات">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Dark Mode */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <h3 className="text-lg font-semibold">الوضع المظلم 🌙</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium">تفعيل الوضع المظلم</p>
                <p className="text-sm text-muted-foreground">تغيير مظهر التطبيق إلى الوضع الليلي</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground">
                الوضع الحالي: <span className="font-medium text-foreground">{theme === "dark" ? "مظلم" : "فاتح"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">الإشعارات 🔔</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>رسالة جديدة</span>
              </div>
              <Switch checked={notifications.messages} onCheckedChange={() => handleNotificationChange("messages")} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>تنبيهات العقارات</span>
              </div>
              <Switch checked={notifications.properties} onCheckedChange={() => handleNotificationChange("properties")} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span>إشعارات التطبيق</span>
              </div>
              <Switch checked={notifications.app} onCheckedChange={() => handleNotificationChange("app")} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>إشعارات البريد</span>
              </div>
              <Switch checked={notifications.email} onCheckedChange={() => handleNotificationChange("email")} />
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">الملف الشخصي</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">الاسم</label>
              <input type="text" defaultValue="أحمد محمد" className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">البريد الإلكتروني</label>
              <input type="email" defaultValue="ahmed@example.com" className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              حفظ التغييرات
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">الأمان</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">كلمة المرور الحالية</label>
              <input type="password" className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">كلمة المرور الجديدة</label>
              <input type="password" className="w-full mt-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              تغيير كلمة المرور
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">المظهر والتفضيلات</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-muted-foreground">اللغة</span>
              <p className="font-medium">العربية</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-muted-foreground">المنطقة الزمنية</span>
              <p className="font-medium">توقيت الرياض (GMT+3)</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-muted-foreground">تنسيق التاريخ</span>
              <p className="font-medium">يوم/شهر/سنة</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
