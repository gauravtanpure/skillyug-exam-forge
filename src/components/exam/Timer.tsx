import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export const Timer = ({ initialMinutes, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft <= 300; // Last 5 minutes
  const isCriticalTime = timeLeft <= 60; // Last 1 minute

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
      isCriticalTime 
        ? "border-destructive bg-destructive/10 text-destructive" 
        : isLowTime 
        ? "border-warning bg-warning/10 text-warning"
        : "border-primary bg-primary/10 text-primary"
    )}>
      {isCriticalTime ? (
        <AlertTriangle className="w-5 h-5 animate-pulse" />
      ) : (
        <Clock className="w-5 h-5" />
      )}
      <span className={cn(
        "font-mono text-lg font-bold",
        isCriticalTime && "animate-pulse"
      )}>
        {formatTime(timeLeft)}
      </span>
      {isLowTime && (
        <span className="text-sm font-medium">
          {isCriticalTime ? "Time's up!" : "Hurry up!"}
        </span>
      )}
    </div>
  );
};