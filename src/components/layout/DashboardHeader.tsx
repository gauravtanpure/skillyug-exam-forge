import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userRole: "student" | "admin";
}

export const DashboardHeader = ({ onMenuClick, userRole }: DashboardHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden md:flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={userRole === "admin" ? "Search tests, users..." : "Search tests..."}
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
        </Button>
        
        <div className="hidden sm:block text-sm">
          <p className="font-medium">
            {userRole === "admin" ? "Admin Dashboard" : "Student Dashboard"}
          </p>
        </div>
      </div>
    </header>
  );
};