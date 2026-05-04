import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#24272a] text-white relative overflow-hidden">
      <div
        className="absolute -top-1/4 -right-1/3 w-[80%] h-[160%] opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 w-[70%] h-[120%] opacity-15 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
      />

      <main className="relative flex-1 flex items-center">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="max-w-3xl">
            <Image
              src="/images/site/elephant-icon.svg"
              alt=""
              width={64}
              height={58}
              className="mb-12 opacity-70"
              style={{ filter: "brightness(0) invert(1)" }}
              aria-hidden
            />

            <p className="text-[var(--color-brand-soft)] uppercase tracking-[0.3em] text-xs mb-5">
              Error · Four · Oh · Four
            </p>

            <h1 className="text-[clamp(4rem,12vw,12rem)] font-light leading-[0.92] tracking-[-0.04em] text-balance">
              You&rsquo;ve wandered<br />
              <em className="not-italic text-gradient-brand">off the map.</em>
            </h1>

            <p className="text-white/65 text-base lg:text-lg mt-8 max-w-xl text-balance leading-relaxed">
              The page you were looking for isn&rsquo;t here — but Cape Town
              itself rewards a wandering eye. Try one of these instead.
            </p>

            <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "All Properties", href: "/properties" },
                { label: "Tours", href: "/tours" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors"
                >
                  <span className="w-6 h-px bg-white/40 group-hover:w-10 group-hover:bg-[var(--color-brand-anchor)] transition-all duration-500" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
