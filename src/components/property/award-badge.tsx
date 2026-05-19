import type { PropertyAward } from "@/types";

interface AwardBadgeProps {
  award: PropertyAward;
  variant?: "light" | "dark";
  className?: string;
}

export function AwardBadge({ award, variant = "light", className }: AwardBadgeProps) {
  const bg = variant === "dark" ? "bg-white/10 text-white" : "bg-white text-[#24272a] border border-stone-200";
  return (
    <span
      className={`inline-flex items-center gap-2 ${bg} px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-medium ${className ?? ""}`}
      title={`Booking.com Traveller Review Award ${award.year}`}
    >
      <span className="font-display italic font-normal normal-case tracking-normal text-[11px]">
        Booking.com
      </span>
      <span className="w-px h-3 bg-current/30" aria-hidden />
      <span className="text-[var(--color-brand-anchor)] font-bold">
        {award.score.toFixed(1)}
      </span>
      <span className="text-stone-400">· {award.year}</span>
    </span>
  );
}
