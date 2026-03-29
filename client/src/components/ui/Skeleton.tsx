import React from "react";
import { cn } from "../../lib/utils";

/* ------------------------------------------------------------------ */
/*  Base Skeleton                                                       */
/* ------------------------------------------------------------------ */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit width (Tailwind class or inline style via `style` prop) */
  width?: string;
  /** Explicit height (Tailwind class or inline style via `style` prop) */
  height?: string;
  /** Round the skeleton into a circle (for avatars) */
  circle?: boolean;
}

export function Skeleton({
  width,
  height,
  circle = false,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-gray-200",
        circle ? "rounded-full" : "rounded",
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Text preset — simulates a block of text lines                      */
/* ------------------------------------------------------------------ */

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="1rem"
          // Make the last line shorter for a natural look
          width={i === lines - 1 ? "66%" : "100%"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card preset — simulates a card with image + text                   */
/* ------------------------------------------------------------------ */

export interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn("rounded-lg border border-gray-200 p-4", className)}
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <Skeleton height="10rem" className="mb-4 w-full" />
      {/* Title */}
      <Skeleton height="1.25rem" width="60%" className="mb-2" />
      {/* Body lines */}
      <SkeletonText lines={2} />
    </div>
  );
}
