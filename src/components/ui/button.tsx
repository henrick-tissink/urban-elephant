"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-[#24272a] text-white hover:bg-[#1a1c1e] focus-visible:ring-[#24272a]",
        primary:
          "bg-[#ff00ff] text-white hover:bg-[#cc00cc] focus-visible:ring-[#ff00ff] shadow-lg shadow-[#ff00ff]/25 hover:shadow-[#cc00cc]/30",
        secondary:
          "bg-[#fff0ff] text-[#24272a] hover:bg-[#ffc6ff] focus-visible:ring-[#ff00ff]",
        outline:
          "border-2 border-[#ff00ff] bg-transparent text-[#ff00ff] hover:bg-[#ff00ff] hover:text-white",
        outlineLight:
          "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#24272a]",
        ghost: "text-[#24272a] hover:bg-[#fff0ff]",
        link: "text-[#ff00ff] underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, rounded, asChild = false, loading, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
