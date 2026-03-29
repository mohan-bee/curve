import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle hover lift effect */
  hoverable?: boolean;
  /** Removes inner padding */
  noPadding?: boolean;
  /** Optional card header title */
  title?: React.ReactNode;
  /** Optional action placed in the header's trailing slot */
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  noPadding = false,
  title,
  action,
}) => {
  return (
    <div
      className={[
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm",
        hoverable
          ? "transition-shadow duration-200 hover:shadow-md hover:-translate-y-px"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {title && (
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {title}
            </h3>
          )}
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
};

export default Card;
