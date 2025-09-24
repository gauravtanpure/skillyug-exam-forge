import { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/80">{subtitle}</p>
        </div>
        
        <div className="bg-card rounded-lg shadow-card-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
};