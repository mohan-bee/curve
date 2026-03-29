import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  danger:  "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-400",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger:  "bg-red-500",
  info:    "bg-blue-500",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
  dot = false,
}) => {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && (
        <span
          className={["w-1.5 h-1.5 rounded-full flex-shrink-0", dotClasses[variant]].join(" ")}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
