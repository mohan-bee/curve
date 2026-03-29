import React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a circle (e.g., for avatars) */
  circle?: boolean;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ circle = false, width, height, className, style, ...rest }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading…"
      className={cn(
        "animate-pulse bg-gray-200",
        circle ? "rounded-full" : "rounded-lg",
        className
      )}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}

// ---------------------------------------------------------------------------
// Convenience presets
// ---------------------------------------------------------------------------

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-label="Loading…">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          className={i === lines - 1 ? "w-4/5" : "w-full"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center gap-4">
        <Skeleton circle width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton height={14} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <SkeletonText lines={3} className="mt-4" />
    </div>
  );
}
