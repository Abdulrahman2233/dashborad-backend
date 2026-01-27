import { Search, User } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-lg px-4 lg:px-6">
      <div className="flex items-center gap-4 mr-14 lg:mr-0">
        <h1 className="text-lg lg:text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search - hidden on small screens */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث..."
            className="bg-transparent text-sm focus:outline-none w-32 lg:w-48"
          />
        </div>
        
        {/* Notifications */}
        <NotificationsPopover />
        
        {/* Profile */}
        <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-secondary transition-colors">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium">أحمد</p>
          </div>
        </button>
      </div>
    </header>
  );
}
