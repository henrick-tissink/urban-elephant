"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/magnetic-button";

const reasonKeys = ["loyalty", "protection", "belonging", "premium"] as const;
const benefitKeys = ["rates", "priority", "amenities", "offers"] as const;

const SIGNUP_RECIPIENT = "karin@urbanelephant.co.za";
const BOOK_DIRECT_URL = "https://book.nightsbridge.com/30034";

export function TheHerdPageContent() {
  const t = useTranslations("theHerd");

  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Stopgap until Marshall wires the backend: opens the user's email
  // client with a pre-filled signup to Karin. Their email proves intent
  // and gives Karin the data she needs to onboard them manually. The
  // success state is honest — it tells the user the email was opened
  // and asks them to send it.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("The Herd — new member signup");
    const body = encodeURIComponent(
      `New Herd member signup\n\nName: ${name}\nEmail: ${email}\n\n— Sent from urbanelephant.co.za/the-herd`,
    );
    window.location.href = `mailto:${SIGNUP_RECIPIENT}?subject=${subject}&body=${body}`;
    setFormState("success");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pb-28 bg-[#24272a] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-6">
              {t("eyebrow")}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight text-balance mb-8">
              {t("title")}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why The Herd — Bapata's brand reasoning bullets */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-14 lg:mb-20">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
              {t("whyEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] leading-tight tracking-tight text-balance">
              {t("whyTitle")}
            </h2>
            <p className="mt-6 text-stone-600 text-lg leading-relaxed max-w-2xl">
              {t("whyIntro")}
            </p>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16">
            {reasonKeys.map((key) => (
              <StaggerItem key={key}>
                <article>
                  <h3 className="text-xl md:text-2xl text-[#24272a] mb-3 tracking-tight">
                    {t(`reasons.${key}.title`)}
                  </h3>
                  <p className="text-stone-600 leading-relaxed max-w-md">
                    {t(`reasons.${key}.description`)}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-14 lg:mb-20 max-w-2xl mx-auto">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
              {t("benefitsEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] leading-tight tracking-tight text-balance">
              {t("benefitsTitle")}
            </h2>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitKeys.map((key) => (
              <StaggerItem key={key}>
                <div className="bg-white p-8 lg:p-10 h-full border border-stone-200/70">
                  <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.2em] text-[11px] font-bold mb-4">
                    {t(`benefits.${key}.label`)}
                  </p>
                  <h3 className="text-lg md:text-xl text-[#24272a] mb-3 tracking-tight">
                    {t(`benefits.${key}.title`)}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {t(`benefits.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Join form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal direction="left">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
                {t("joinEyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] leading-tight tracking-tight text-balance mb-6">
                {t("joinTitle")}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                {t("joinDescription")}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right">
              {formState === "success" ? (
                <div className="bg-stone-50 border border-stone-200/70 p-8 lg:p-10">
                  <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.2em] text-xs font-bold mb-4">
                    {t("form.successEyebrow")}
                  </p>
                  <h3 className="text-2xl text-[#24272a] mb-3 tracking-tight">
                    {t("form.successTitle")}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {t("form.successBody")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="herd-name" className="block text-xs uppercase tracking-[0.2em] font-bold text-[#24272a] mb-2">
                      {t("form.nameLabel")}
                    </label>
                    <input
                      id="herd-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-[var(--color-brand-anchor)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="herd-email" className="block text-xs uppercase tracking-[0.2em] font-bold text-[#24272a] mb-2">
                      {t("form.emailLabel")}
                    </label>
                    <input
                      id="herd-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-[var(--color-brand-anchor)] focus:outline-none transition-colors"
                    />
                  </div>
                  <MagneticButton>
                    <Button type="submit" variant="primary" size="lg" disabled={formState === "submitting"}>
                      {formState === "submitting" ? t("form.submitting") : t("form.submit")}
                    </Button>
                  </MagneticButton>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    {t("form.disclaimer")}
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Book direct — closes the loop for existing/returning members */}
      <section className="py-20 lg:py-28 bg-[#24272a] text-white relative overflow-hidden">
        <div
          className="absolute -top-1/3 -right-1/4 w-[80%] h-[160%] opacity-25 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal className="max-w-2xl mx-auto">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
              {t("bookEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight text-balance mb-6">
              {t("bookTitle")}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {t("bookDescription")}
            </p>
            <MagneticButton>
              <Button variant="primary" size="lg" asChild>
                <a href={BOOK_DIRECT_URL} target="_blank" rel="noopener noreferrer">
                  {t("bookCta")}
                </a>
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
