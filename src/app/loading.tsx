import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#24272a] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className="relative flex flex-col items-center gap-8">
        <Image
          src="/images/site/elephant-icon.svg"
          alt=""
          width={48}
          height={44}
          className="opacity-70 animate-pulse"
          style={{ filter: "brightness(0) invert(1)" }}
          aria-hidden
          priority
        />
        <p className="text-[var(--color-brand-soft)] uppercase tracking-[0.4em] text-[10px]">
          Loading
        </p>
      </div>
    </div>
  );
}
