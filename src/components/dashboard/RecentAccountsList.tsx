import { User, Mail, Phone, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  accountType: "owner" | "agent" | "office" | "admin";
  registrationDate: string;
  avatar: string;
}

const recentAccounts: Account[] = [
  {
    id: "1",
    name: "أحمد محمد السالم",
    email: "ahmed.salem@email.com",
    username: "ahmed_salem",
    phone: "+966 50 123 4567",
    accountType: "owner",
    registrationDate: "2026-01-27 10:30",
    avatar: "أ",
  },
  {
    id: "2",
    name: "سعود العتيبي",
    email: "saud.otaibi@email.com",
    username: "saud_otaibi",
    phone: "+966 55 987 6543",
    accountType: "agent",
    registrationDate: "2026-01-27 09:15",
    avatar: "س",
  },
  {
    id: "3",
    name: "مكتب الأمل العقاري",
    email: "alamal.office@email.com",
    username: "alamal_office",
    phone: "+966 11 456 7890",
    accountType: "office",
    registrationDate: "2026-01-26 16:45",
    avatar: "م",
  },
  {
    id: "4",
    name: "فهد الشمري",
    email: "fahad.shamri@email.com",
    username: "fahad_sh",
    phone: "+966 54 321 0987",
    accountType: "owner",
    registrationDate: "2026-01-26 14:20",
    avatar: "ف",
  },
  {
    id: "5",
    name: "خالد المطيري",
    email: "khalid.mutairi@email.com",
    username: "khalid_m",
    phone: "+966 56 789 0123",
    accountType: "agent",
    registrationDate: "2026-01-26 11:00",
    avatar: "خ",
  },
  {
    id: "6",
    name: "عبدالله الحربي",
    email: "abdullah.harbi@email.com",
    username: "abdullah_h",
    phone: "+966 59 456 7891",
    accountType: "admin",
    registrationDate: "2026-01-25 18:30",
    avatar: "ع",
  },
];

const accountTypeLabels = {
  owner: { label: "مالك", class: "bg-blue-100 text-blue-700" },
  agent: { label: "وسيط", class: "bg-purple-100 text-purple-700" },
  office: { label: "مكتب", class: "bg-cyan-100 text-cyan-700" },
  admin: { label: "مشرف", class: "bg-red-100 text-red-700" },
};

export function RecentAccountsList() {
  return (
    <div className="card-glow rounded-xl bg-card p-4 lg:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base lg:text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          آخر الحسابات المضافة
        </h3>
        <span className="text-xs text-muted-foreground">{recentAccounts.length} حساب</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">المستخدم</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">البريد الإلكتروني</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden lg:table-cell">اسم المستخدم</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden sm:table-cell">الهاتف</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">النوع</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground hidden lg:table-cell">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {recentAccounts.map((account) => {
              const typeInfo = accountTypeLabels[account.accountType];
              return (
                <tr key={account.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {account.avatar}
                      </div>
                      <span className="font-medium text-sm">{account.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span dir="ltr">{account.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground" dir="ltr">@{account.username}</span>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span dir="ltr">{account.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded-full font-medium inline-flex items-center gap-1", typeInfo.class)}>
                      {account.accountType === "admin" && <Shield className="h-3 w-3" />}
                      {typeInfo.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span dir="ltr">{account.registrationDate}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
