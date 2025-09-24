import { BookOpen } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
        <BookOpen className="w-5 h-5 text-primary-foreground" />
      </div>
      {showText && (
        <span className="text-xl font-bold text-foreground">
          Skillyug <span className="text-accent">Exam Hub</span>
        </span>
      )}
    </div>
  );
};