"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none",
              isFocused || hasValue
                ? "top-2 text-xs text-[var(--color-brand-anchor)]"
                : "top-1/2 -translate-y-1/2 text-stone-400"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-14 w-full border border-stone-200 bg-white px-4 text-base text-[#24272a] transition-all duration-200",
            "placeholder:text-stone-400",
            "focus:outline-none focus:border-[var(--color-brand-anchor)] focus:ring-2 focus:ring-[var(--color-brand-anchor)]/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-stone-50",
            label && "pt-6 pb-2",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
