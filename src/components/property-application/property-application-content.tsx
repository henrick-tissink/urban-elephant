"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Waves,
  Sparkles,
  CalendarCheck,
  Sofa,
  TrendingUp,
  Wrench,
  Heart,
  Phone,
  Clock,
  MessageCircle,
  Check,
  Quote,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { SiteSettings } from "@/types";

const GUEST_RELATIONS_WHATSAPP = "27726188140";

// Real owner reviews carried over from the original property-application page.
// Treated as fixed brand quotes (kept in English across all locales).
const OWNER_TESTIMONIALS: { quote: string; author: string }[] = [
  {
    quote:
      "I met and joined Niles at Urban Elephant when he became involved at The Docklands. I would not entrust my unit to anyone else. It has certainly been a pleasure to work with the team for several years now. Thank you Niles and the Urban Elephant team.",
    author: "Hannes van Aarde",
  },
  {
    quote:
      "Niles and team took over the responsibility of dealing with service providers, setting up and furnishing the apartment. Ongoing maintenance is taken care of and the apartment is spotless clean. It's been a pleasure having Urban Elephant managing our apartment.",
    author: "Natasha & Henry",
  },
  {
    quote:
      "My apartment has been in the capable hands of Urban Elephant for a year, and Niles and his team have delivered a highly professional service. The bottom line is, they get the bookings and I feel confident in their ability to also take care of my investment.",
    author: "Crystal Wolmarans",
  },
  {
    quote:
      "The team at Urban Elephant has always treated our flat as if it is their own property. They are so professional, from the owner down, and the service they give us is exceptional. I consider myself lucky to have them as managers of our property.",
    author: "Aletta Theron",
  },
  {
    quote:
      "We loved staying in Urban Elephant's apartments during our visits to Cape Town. When we got our own apartments, there was no question — only Urban Elephant could take care of them. Niles and his team were incredibly helpful from the start, with a keen eye for detail and a commitment to creating a beautiful experience for both guests and owners.",
    author: "Kira-Clarissa Kaiser",
  },
  {
    quote:
      "Based on my exceptional experience with this apartment management service, I wholeheartedly recommend them without hesitation. Their dedication, professionalism, and unwavering commitment to excellence make them the clear choice for anyone seeking a reliable and efficient management service.",
    author: "Elizabeth Lange",
  },
];

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  propertyLocation: z.string().min(2, "Please enter the property location"),
  numberOfUnits: z
    .number({ error: "Please enter the number of units" })
    .min(1, "Please enter the number of units"),
  propertyDescription: z
    .string()
    .min(10, "Please tell us a little about the property"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

function buildWaPrefill(data: ApplicationFormData): string {
  const lines = [
    `Dear Guest Relations, this is ${data.name} — I just submitted a property application via the website.`,
    `Property location: ${data.propertyLocation}`,
    `Number of units: ${data.numberOfUnits}`,
  ];
  return `https://wa.me/${GUEST_RELATIONS_WHATSAPP}?text=${encodeURIComponent(
    lines.join("\n\n"),
  )}`;
}

interface PropertyApplicationContentProps {
  settings: SiteSettings | null;
}

export function PropertyApplicationContent({
  settings,
}: PropertyApplicationContentProps) {
  const t = useTranslations("propertyApplication");
  const tAbout = useTranslations("about");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ApplicationFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/property-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send");
      setSubmitted(data);
      reset();
    } catch {
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitAnother = () => setSubmitted(null);

  const criteria = [
    { icon: MapPin, key: "location" },
    { icon: Waves, key: "amenities" },
    { icon: Sparkles, key: "branding" },
    { icon: CalendarCheck, key: "availability" },
  ] as const;

  const handle = [
    { icon: Sofa, key: "setup" },
    { icon: TrendingUp, key: "bookings" },
    { icon: Wrench, key: "maintenance" },
    { icon: Heart, key: "guests" },
  ] as const;

  const operationsPhone = settings?.contact?.phone || "+27 21 300 1044";
  const afterHoursPhone =
    settings?.contact?.afterHoursPhone ||
    settings?.contact?.whatsapp ||
    "+27 72 618 8140";

  return (
    <>
      {/* Hero — full-bleed rooftop pool with dark overlay */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <Image
          src="/images/properties/16-on-bree/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* top gradient — keeps the transparent header legible */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#1a1c1e]/75 to-transparent" />
        {/* bottom gradient — anchors the headline */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1e] via-[#1a1c1e]/45 to-transparent" />
        <div className="relative container mx-auto px-6 lg:px-12 pb-16 lg:pb-24 pt-40">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-sm mb-4">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.05]">
              {t("hero.title")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">
              {t("hero.description")}
            </p>
            <Button variant="primary" size="lg" asChild>
              <a href="#apply">{t("hero.cta")}</a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-2xl mb-12">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-3">
              {t("criteria.eyebrow")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-light text-[#24272a] mb-4">
              {t("criteria.heading")}
            </h2>
            <p className="text-stone-600 leading-relaxed">
              {t("criteria.subheading")}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {criteria.map(({ icon: Icon, key }, index) => (
              <ScrollReveal key={key} delay={index * 0.08}>
                <div className="group h-full border border-stone-200 bg-stone-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-anchor)]/30 hover:shadow-xl hover:shadow-stone-200/60">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-brand-wash)] mb-6 transition-colors duration-300 group-hover:bg-[var(--color-brand-anchor)]">
                    <Icon className="w-6 h-6 text-[var(--color-brand-anchor)] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-[#24272a] mb-2">
                    {t(`criteria.${key}.title`)}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {t(`criteria.${key}.body`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we handle — editorial split with a furnished interior */}
      <section className="py-16 lg:py-24 bg-[#24272a] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                {/* offset accent frame for depth */}
                <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-[var(--color-brand-mid)]/30 pointer-events-none" />
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/properties/16-on-bree/08.jpg"
                    alt={t("handle.imageAlt")}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-xs mb-3">
                {t("handle.eyebrow")}
              </p>
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                {t("handle.heading")}
              </h2>
              <p className="text-white/70 leading-relaxed mb-10 max-w-xl">
                {t("handle.subheading")}
              </p>

              <div className="space-y-8">
                {handle.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-brand-anchor)] flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {t(`handle.${key}.title`)}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-md">
                        {t(`handle.${key}.body`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Owner testimonials — led by the founder */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-[var(--color-brand-wash)] pointer-events-none" />
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/site/founder.png"
                    alt={`${tAbout("founderName")} — ${tAbout("founderTitle")}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-3">
                {t("testimonials.eyebrow")}
              </p>
              <h2 className="text-3xl lg:text-4xl font-light text-[#24272a] mb-4">
                {t("testimonials.heading")}
              </h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                {t("testimonials.subheading")}
              </p>
              <blockquote className="border-l-2 border-[var(--color-brand-anchor)] pl-5">
                <p className="text-xl lg:text-2xl font-light text-[#24272a] italic leading-snug mb-4">
                  &ldquo;{tAbout("founderQuote")}&rdquo;
                </p>
                <footer>
                  <p className="text-[#24272a] font-medium">
                    {tAbout("founderName")}
                  </p>
                  <p className="text-stone-500 text-sm">
                    {tAbout("founderTitle")}
                  </p>
                </footer>
              </blockquote>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OWNER_TESTIMONIALS.map(({ quote, author }, index) => (
              <ScrollReveal key={author} delay={(index % 3) * 0.08}>
                <figure className="h-full flex flex-col border border-stone-200 bg-stone-50 p-8 transition-colors duration-300 hover:border-[var(--color-brand-anchor)]/40">
                  <Quote className="w-8 h-8 text-[var(--color-brand-anchor)]/30 mb-4" />
                  <blockquote className="text-stone-700 leading-relaxed flex-1">
                    {quote}
                  </blockquote>
                  <figcaption className="mt-6 pt-4 border-t border-stone-200 text-sm font-medium text-[#24272a]">
                    {author}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application form + contact */}
      <section id="apply" className="py-16 lg:py-24 bg-stone-50 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form (or success state) */}
            <ScrollReveal>
              {submitted ? (
                <div className="border border-stone-200 bg-white p-8 lg:p-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-brand-wash)] mb-6">
                    <Check className="w-7 h-7 text-[var(--color-brand-anchor)]" />
                  </div>
                  <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-3">
                    {t("form.successEyebrow")}
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-light text-[#24272a] mb-4">
                    {t("form.successHeading", { name: submitted.name })}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-8">
                    {t("form.successBody")}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="lg" asChild>
                      <a
                        href={buildWaPrefill(submitted)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t("form.successWa")}
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" onClick={submitAnother}>
                      {t("form.successAgain")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-3">
                    {t("form.eyebrow")}
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-light text-[#24272a] mb-3">
                    {t("form.heading")}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-8">
                    {t("form.subheading")}
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label={t("form.name")}
                        {...register("name")}
                        error={errors.name?.message}
                      />
                      <Input
                        label={t("form.phone")}
                        type="tel"
                        {...register("phone")}
                        error={errors.phone?.message}
                      />
                    </div>

                    <Input
                      label={t("form.email")}
                      type="email"
                      {...register("email")}
                      error={errors.email?.message}
                    />

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label={t("form.propertyLocation")}
                        {...register("propertyLocation")}
                        error={errors.propertyLocation?.message}
                      />
                      <Input
                        label={t("form.numberOfUnits")}
                        type="number"
                        min={1}
                        {...register("numberOfUnits", { valueAsNumber: true })}
                        error={errors.numberOfUnits?.message}
                      />
                    </div>

                    <Textarea
                      label={t("form.propertyDescription")}
                      {...register("propertyDescription")}
                      error={errors.propertyDescription?.message}
                      showCount
                      maxLength={1000}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      loading={isSubmitting}
                    >
                      {t("form.submit")}
                    </Button>
                  </form>
                </div>
              )}
            </ScrollReveal>

            {/* Contact strip */}
            <ScrollReveal direction="right">
              <div className="lg:pl-8 lg:border-l border-stone-200">
                <h2 className="text-2xl text-[#24272a] mb-6">
                  {t("contact.heading")}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 mb-1">
                        {t("contact.operations")}
                      </p>
                      <a
                        href={`tel:${operationsPhone.replace(/\s/g, "")}`}
                        className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors"
                      >
                        {operationsPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 mb-1">
                        {t("contact.afterHours")}
                      </p>
                      <a
                        href={`https://wa.me/${afterHoursPhone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors"
                      >
                        {afterHoursPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 mb-1">
                        {t("contact.hours")}
                      </p>
                      <p className="text-[#24272a]">{t("contact.hoursValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
