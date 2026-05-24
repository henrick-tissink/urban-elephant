"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, MessageCircle, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { SiteSettings, PropertyCard } from "@/types";

const GUEST_RELATIONS_WHATSAPP = "27726188140";

function buildWaPrefill(data: ContactFormData): string {
  const lines = [
    `Dear Guest Relations, this is ${data.name} — I just sent a message via the website.`,
    data.property ? `Property: ${data.property}` : null,
    `Subject: ${data.subject}`,
  ].filter(Boolean) as string[];
  return `https://wa.me/${GUEST_RELATIONS_WHATSAPP}?text=${encodeURIComponent(lines.join("\n\n"))}`;
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  property: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactPageContentProps {
  settings: SiteSettings | null;
  properties: PropertyCard[];
}

export function ContactPageContent({ settings, properties }: ContactPageContentProps) {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
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

  const sendAnother = () => setSubmitted(null);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-sm mb-4">
              {t("subtitle")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-white/70 text-lg">
              {t("description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form (or success state with WhatsApp prefill) */}
            <ScrollReveal>
              {submitted ? (
                <div className="border border-stone-200 bg-stone-50 p-8 lg:p-10">
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
                    <Button variant="outline" size="lg" onClick={sendAnother}>
                      {t("form.successAgain")}
                    </Button>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label={t("form.name")}
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <Input
                    label={t("form.email")}
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label={t("form.phone")}
                    type="tel"
                    {...register("phone")}
                  />
                  <div className="relative">
                    <select
                      {...register("property")}
                      className="flex h-14 w-full border border-stone-200 bg-white px-4 pt-6 pb-2 text-base text-[#24272a] transition-all focus:outline-none focus:border-[var(--color-brand-anchor)] focus:ring-2 focus:ring-[var(--color-brand-anchor)]/20 appearance-none"
                    >
                      <option value="">{t("form.selectProperty")}</option>
                      {properties.map((property) => (
                        <option key={property._id} value={property.name}>
                          {property.name}
                        </option>
                      ))}
                    </select>
                    <label className="absolute left-4 top-2 text-xs text-[var(--color-brand-anchor)] pointer-events-none">
                      {t("form.property")}
                    </label>
                  </div>
                </div>

                <Input
                  label={t("form.subject")}
                  {...register("subject")}
                  error={errors.subject?.message}
                />

                <Textarea
                  label={t("form.message")}
                  {...register("message")}
                  error={errors.message?.message}
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
                  {isSubmitting ? t("form.submit") : t("form.submit")}
                </Button>
              </form>
              )}
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl text-[#24272a] mb-6">
                    {t("infoHeading")}
                  </h2>
                  <div className="space-y-6">
                    {settings?.contact?.email && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t("info.email")}</p>
                          <a href={`mailto:${settings.contact.email}`} className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors">
                            {settings.contact.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.contact?.phone && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t("info.phone")}</p>
                          <a href={`tel:${settings.contact.phone}`} className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors">
                            {settings.contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.contact?.whatsapp && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t("info.whatsapp")}</p>
                          <a
                            href={`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors"
                          >
                            {settings.contact.whatsapp}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.address && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t("info.address")}</p>
                          <p className="text-[#24272a]">
                            {settings.address.street}<br />
                            {settings.address.city}, {settings.address.country}
                          </p>
                        </div>
                      </div>
                    )}

                    {settings?.contact?.operationsHours && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t("info.hours")}</p>
                          <p className="text-[#24272a]">{settings.contact.operationsHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fallback info if no settings */}
                {!settings?.contact && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-brand-wash)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[var(--color-brand-anchor)]" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 mb-1">{t("info.email")}</p>
                        <a href="mailto:reservations@urbanelephant.co.za" className="text-[#24272a] hover:text-[var(--color-brand-anchor)] transition-colors">
                          reservations@urbanelephant.co.za
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
