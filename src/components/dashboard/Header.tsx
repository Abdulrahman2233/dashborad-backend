import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">لوحة التحكم</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث..."
            className="bg-transparent text-sm focus:outline-none w-48"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        </button>
        
        {/* Profile */}
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">أحمد محمد</p>
            <p className="text-xs text-muted-foreground">مدير النظام</p>
          </div>
        </button>
      </div>
    </header>
  );
}
