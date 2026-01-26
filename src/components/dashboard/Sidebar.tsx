import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Percent,
  Activity,
  Settings,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { title: "الرئيسية", icon: LayoutDashboard, path: "/" },
  { title: "تحليل العقارات", icon: Building2, path: "/properties" },
  { title: "تحليل المستخدمين", icon: Users, path: "/users" },
  { title: "العروض والخصومات", icon: Percent, path: "/offers" },
  { title: "سجل النشاط", icon: Activity, path: "/activity" },
  { title: "الإعدادات", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity",
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setCollapsed(true)}
      />

      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border"
      >
        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed right-0 top-0 z-40 h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-72",
          "lg:relative lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-3", collapsed && "lg:justify-center lg:w-full")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold gradient-text">عقاري</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  collapsed && "lg:justify-center lg:px-3"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
