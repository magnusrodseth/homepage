import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
  icon?: ReactNode;
  children?: React.ReactNode;
  className?: string;
  type?: "default" | "warning" | "danger";
}

export function Callout({
  children,
  icon,
  className,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-md border border-l-4 p-4",
        type === "danger" &&
          "border-red-600 bg-red-50 text-red-950 dark:border-red-500 dark:bg-red-950/40 dark:text-red-100",
        type === "warning" &&
          "border-yellow-600 bg-yellow-50 text-yellow-950 dark:border-yellow-500 dark:bg-yellow-950/40 dark:text-yellow-100",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className={cn("font-semibold", className)}>{children}</div>
    </div>
  );
}
