"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import type { SiteSettings, PropertyCard } from "@/types";
import Image from "next/image";

interface FooterProps {
  settings?: SiteSettings | null;
  properties?: PropertyCard[];
}

export function Footer({ settings, properties = [] }: FooterProps) {
  const t = useTranslations("footer");

  const serviceLinks = [
    { key: "tours", href: "/tours" },
    { key: "carHire", href: "/car-hire" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  const legalLinks = [
    { key: "bookingPolicy", href: "/booking-policy" },
    { key: "privacyPolicy", href: "/privacy-policy" },
    { key: "terms", href: "/terms" },
  ];

  return (
    <footer className="bg-[#24272a] text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Urban Elephant"
                width={200}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-4">
              {settings?.social?.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-[#1a1c1e] rounded-full flex items-center justify-center hover:bg-[#ff00ff] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings?.social?.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-[#1a1c1e] rounded-full flex items-center justify-center hover:bg-[#ff00ff] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {/* Fallback social links if no settings */}
              {!settings?.social?.instagram && !settings?.social?.facebook && (
                <>
                  <a
                    href="https://instagram.com/urbanelephant"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 bg-[#1a1c1e] rounded-full flex items-center justify-center hover:bg-[#ff00ff] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com/urbanelephant"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 bg-[#1a1c1e] rounded-full flex items-center justify-center hover:bg-[#ff00ff] transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t("sections.properties")}
            </h3>
            <ul className="space-y-3">
              {properties.length > 0 ? (
                properties.slice(0, 5).map((property) => (
                  <li key={property._id}>
                    <Link
                      href={`/properties/${property.slug.current}`}
                      className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                    >
                      {property.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    href="/properties"
                    className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                  >
                    {t("links.viewAll")}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t("sections.services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t("sections.contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff00ff] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  {settings?.address
                    ? `${settings.address.city}, ${settings.address.country}`
                    : "Cape Town, South Africa"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ff00ff] flex-shrink-0" />
                <a
                  href={`tel:${settings?.contact?.phone || "+27213001044"}`}
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  {settings?.contact?.phone || "+27 21 300 1044"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ff00ff] flex-shrink-0" />
                <a
                  href={`mailto:${settings?.contact?.email || "karin@urbanelephant.co.za"}`}
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  {settings?.contact?.email || "karin@urbanelephant.co.za"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#1a1c1e] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Urban Elephant. {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-gray-500 text-sm hover:text-[#ff00ff] transition-colors"
              >
                {t(`links.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
