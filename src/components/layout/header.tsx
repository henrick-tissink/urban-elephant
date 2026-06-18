"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookingPicker } from "@/components/property/booking-picker";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { properties } from "@/data/content";
import Image from "next/image";

const navigation = [
  { key: "properties", href: "/properties" },
  { key: "tours", href: "/tours" },
  { key: "explore", href: "/recommendations" },
  { key: "carHire", href: "/car-hire" },
  { key: "theHerd", href: "/the-herd" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "propertyApplication", href: "/property-application" },
  { key: "contact", href: "/contact" },
];

// Primary items stay in the bar; secondary items collapse into a "More" dropdown
// so the row never overflows into the logo on laptop widths.
const primaryNavigation = navigation.filter(
  (item) => !["carHire", "propertyApplication"].includes(item.key),
);
const moreNavigation = navigation.filter((item) =>
  ["carHire", "propertyApplication"].includes(item.key),
);

export function Header() {
  const t = useTranslations("navigation");
  const ta = useTranslations("a11y");
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreActive = moreNavigation.some((item) => item.href === pathname);

  const openPicker = () => {
    setIsMobileMenuOpen(false);
    setPickerOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                {isScrolled ? (
                  <Image
                    src="/logo.svg"
                    alt="Urban Elephant"
                    width={180}
                    height={50}
                    className="h-9 lg:h-10 w-auto max-w-[180px]"
                    priority
                  />
                ) : (
                  <Image
                    src="/logo-white.svg"
                    alt="Urban Elephant"
                    width={180}
                    height={50}
                    className="h-9 lg:h-10 w-auto max-w-[180px]"
                    priority
                  />
                )}
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-6">
              {primaryNavigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-colors duration-300 hover:text-[var(--color-brand-anchor)]",
                      isScrolled ? "text-[#24272a]" : "text-white",
                      pathname === item.href && "text-[var(--color-brand-anchor)]"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}

              {/* More dropdown — holds secondary nav items */}
              <motion.div
                ref={moreRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: primaryNavigation.length * 0.1 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-colors duration-300 hover:text-[var(--color-brand-anchor)]",
                    isScrolled ? "text-[#24272a]" : "text-white",
                    (moreOpen || moreActive) && "text-[var(--color-brand-anchor)]"
                  )}
                >
                  {t("more")}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      moreOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 min-w-[200px] rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-2"
                    >
                      {moreNavigation.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "block px-4 py-2.5 text-sm font-bold tracking-wide uppercase whitespace-nowrap text-[#24272a] transition-colors hover:bg-black/[0.04] hover:text-[var(--color-brand-anchor)]",
                            pathname === item.href && "text-[var(--color-brand-anchor)]"
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={cn(
                  isScrolled
                    ? "text-[#24272a] hover:text-[var(--color-brand-anchor)]"
                    : "text-white/80 hover:text-white",
                )}
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant={isScrolled ? "primary" : "outlineLight"}
                  size="sm"
                  className="ml-4"
                  onClick={openPicker}
                >
                  {t("bookNow")}
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden relative z-10 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={ta("toggleMenu")}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                {isMobileMenuOpen ? (
                  <X className={cn("w-6 h-6", isScrolled ? "text-[#24272a]" : "text-white")} />
                ) : (
                  <Menu className={cn("w-6 h-6", isScrolled ? "text-[#24272a]" : "text-white")} />
                )}
              </motion.div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#24272a]"
          >
            <nav className="container mx-auto px-6 pt-28 pb-12 h-full flex flex-col">
              <div className="flex flex-col gap-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-3xl font-bold uppercase text-white hover:text-[var(--color-brand-anchor)] transition-colors block py-2",
                        pathname === item.href && "text-[var(--color-brand-anchor)]"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70"
                >
                  <LanguageSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={openPicker}
                  >
                    {t("bookNow")}
                  </Button>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        properties={properties}
      />
    </>
  );
}
