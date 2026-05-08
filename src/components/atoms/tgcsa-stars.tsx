import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  count: number;
  /** Render size in px. Component requests at 2x for retina then displays at this size. */
  size?: number;
  className?: string;
  /** Override the alt/title; defaults to a credential statement. */
  title?: string;
}

/**
 * Renders N copies of the official TGCSA grading star (SA flag insignia).
 * Used wherever the site shows a property's grading or the brand-level
 * credential — replaces generic Lucide stars so the rating reads as
 * "awarded by TGCSA" rather than "added by us".
 */
export function TGCSAStars({
  count,
  size = 14,
  className,
  title = "Officially graded by the Tourism Grading Council of South Africa",
}: Props) {
  if (count <= 0) return null;
  return (
    <div className={cn("flex items-center gap-1", className)} title={title}>
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src="/badges/tgcsa-star.png"
          alt=""
          width={size * 2}
          height={size * 2}
          style={{ width: size, height: size }}
          className="object-contain shrink-0"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
