import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "student" | "admin";
}

export const DashboardLayout = ({ children, userRole = "student" }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userRole={userRole}
      />
      
      <div className="lg:ml-64">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(true)}
          userRole={userRole}
        />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};