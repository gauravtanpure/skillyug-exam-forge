import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X, LayoutDashboard, FileText, BarChart3, User, LogOut, Users, Database, Settings, BookOpen } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: "student" | "admin";
}

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Tests", path: "/tests" },
  { icon: BarChart3, label: "Results", path: "/results" },
  { icon: User, label: "Profile", path: "/profile" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: FileText, label: "Manage Tests", path: "/admin/tests" },
  { icon: Database, label: "Question Bank", path: "/admin/questions" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export const Sidebar = ({ isOpen, onClose, userRole }: SidebarProps) => {
  const navigate = useNavigate();
  const navItems = userRole === "admin" ? adminNavItems : studentNavItems;

  const handleLogout = () => {
    // In real app, clear auth tokens here
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <Logo />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3 px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {userRole === "admin" ? "Admin User" : "Student User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole === "admin" ? "admin@skillyug.com" : "student@skillyug.com"}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};