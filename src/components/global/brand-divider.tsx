import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandDividerProps {
  /** Show the elephant icon in the center over the gradient line */
  withMark?: boolean;
  /** Container background — defaults to white */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Section transition: a thin brand-gradient hairline, optionally with the
 * elephant mark centered. Used between major sections to give the page a
 * recurring brand chapter mark — references the logo wordmark gradient.
 */
export function BrandDivider({
  withMark = false,
  variant = "light",
  className,
}: BrandDividerProps) {
  const bg = variant === "dark" ? "bg-[#24272a]" : "bg-white";
  const markBg = variant === "dark" ? "bg-[#24272a]" : "bg-white";

  if (!withMark) {
    return (
      <div className={cn(bg, className)}>
        <div className="brand-hairline" />
      </div>
    );
  }

  return (
    <div className={cn("relative", bg, className)}>
      <div className="brand-hairline" />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6",
          markBg
        )}
      >
        <Image
          src="/images/site/elephant-icon.svg"
          alt=""
          width={28}
          height={26}
          className={cn(
            variant === "dark" ? "opacity-40" : "opacity-50"
          )}
          style={
            variant === "dark"
              ? { filter: "brightness(0) invert(1)" }
              : undefined
          }
          aria-hidden
        />
      </div>
    </div>
  );
}
