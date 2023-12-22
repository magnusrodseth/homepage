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
        "my-6 flex items-start rounded-md border border-l-4 pt-4 px-4",
        {
          "border-red-900 bg-red-50": type === "danger",
          "border-yellow-900 bg-yellow-50": type === "warning",
          className,
        }
      )}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className={cn("font-semibold", className)}>{children}</div>
    </div>
  );
}
