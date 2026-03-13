import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
  trend?: { value: number; positive?: boolean };
  accent?: boolean;
  className?: string;
  delay?: number;
}

export function StatCard({ title, value, icon, description, trend, accent, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      className={cn(
        "card-elevated rounded-lg p-5 card-hover",
        accent && "bg-primary text-primary-foreground border-primary",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn("text-xs font-medium uppercase tracking-wide", accent ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {title}
          </p>
          <p className={cn("mt-1.5 text-2xl font-bold", accent ? "text-primary-foreground" : "text-foreground")}>
            {value}
          </p>
          {description && (
            <p className={cn("mt-0.5 text-xs", accent ? "text-primary-foreground/60" : "text-muted-foreground")}>
              {description}
            </p>
          )}
          {trend && (
            <p className={cn(
              "mt-1 text-xs font-medium",
              trend.positive ? "text-status-published" : "text-status-rejected",
              accent && "opacity-80"
            )}>
              {trend.positive ? "+" : ""}{trend.value}% vs last month
            </p>
          )}
        </div>
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          accent ? "bg-primary-foreground/15" : "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
