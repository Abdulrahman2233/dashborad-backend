import { Plus, FileText, Users, Settings, MessageSquare, Building2, BarChart3, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { icon: Plus, label: "إضافة عقار", color: "bg-blue-500", href: "/properties" },
  { icon: Users, label: "المستخدمين", color: "bg-green-500", href: "/users" },
  { icon: MessageSquare, label: "الرسائل", color: "bg-purple-500", href: "/messages" },
  { icon: BarChart3, label: "التقارير", color: "bg-orange-500", href: "/activity" },
];

export function QuickActionsPanel() {
  return (
    <div className="card-glow rounded-2xl bg-card p-5 lg:p-6 border border-border shadow-lg">
      <h3 className="text-lg font-bold mb-4">إجراءات سريعة</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105"
          >
            <div className={`p-3 rounded-xl ${action.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
