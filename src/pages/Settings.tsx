import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { User, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout title="الإعدادات">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
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

        {/* Notifications */}
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">الإشعارات</h3>
          </div>
          <div className="space-y-4">
            {["إشعارات البريد", "إشعارات التطبيق", "تنبيهات العقارات", "رسائل المستخدمين"].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span>{item}</span>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            ))}
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
        <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">المظهر</h3>
          </div>
          <div className="space-y-4">
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
