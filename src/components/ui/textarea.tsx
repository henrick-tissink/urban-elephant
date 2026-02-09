"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, showCount, maxLength, autoResize = true, id, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      typeof props.value === "string" ? props.value.length : 0
    );
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const hasValue = props.value !== undefined && props.value !== "";
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    // Auto resize functionality
    useEffect(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [props.value, autoResize]);

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none z-10",
              isFocused || hasValue
                ? "top-2 text-xs text-[#cc00cc]"
                : "top-4 text-gray-400"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className={cn(
            "flex min-h-[120px] w-full border border-gray-200 bg-white px-4 py-4 text-base text-[#24272a] transition-all duration-200 resize-none",
            "placeholder:text-gray-400",
            "focus:outline-none focus:border-[#ff00ff] focus:ring-2 focus:ring-[#ff00ff]/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
            label && "pt-7",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          maxLength={maxLength}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            props.onChange?.(e);
          }}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {showCount && maxLength && (
            <p
              className={cn(
                "text-sm ml-auto",
                charCount > maxLength * 0.9 ? "text-[#cc00cc]" : "text-gray-400"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
