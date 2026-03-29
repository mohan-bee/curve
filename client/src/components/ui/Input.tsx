import React from "react";
import { cn } from "../../lib/utils";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size = "md",
      leftAddon,
      rightAddon,
      id,
      className,
      ...props
    },
    ref
  ) => {
    // Always generate a stable fallback ID so aria-describedby values are never
    // built from "undefined" even when neither `id` nor `label` is provided.
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <span className="pointer-events-none absolute left-3 text-gray-400">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              "w-full rounded-md border bg-white transition-colors",
              "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0",
              error
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500",
              leftAddon && "pl-9",
              rightAddon && "pr-9",
              sizeClasses[size],
              className
            )}
            {...props}
          />

          {rightAddon && (
            <span className="pointer-events-none absolute right-3 text-gray-400">
              {rightAddon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
