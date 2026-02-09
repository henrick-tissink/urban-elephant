"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navigation = [
  { key: "properties", href: "/properties" },
  { key: "tours", href: "/tours" },
  { key: "carHire", href: "/car-hire" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "af" : "en";
    router.replace(pathname, { locale: newLocale });
  };

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
                    className="h-12 w-auto"
                    priority
                  />
                ) : (
                  <Image
                    src="/logo-white.svg"
                    alt="Urban Elephant"
                    width={180}
                    height={50}
                    className="h-12 w-auto"
                    priority
                  />
                )}
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-bold tracking-wide uppercase transition-colors duration-300 hover:text-[#ff00ff]",
                      isScrolled ? "text-[#24272a]" : "text-white",
                      pathname === item.href && "text-[#ff00ff]"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}

              {/* Language Switcher */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={toggleLocale}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  isScrolled ? "text-[#24272a] hover:text-[#ff00ff]" : "text-white/80 hover:text-white"
                )}
              >
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant={isScrolled ? "primary" : "outlineLight"}
                  size="sm"
                  className="ml-4"
                  asChild
                >
                  <a href="https://book.nightsbridge.com" target="_blank" rel="noopener noreferrer">
                    {t("home") === "Home" ? "Book Now" : "Bespreek Nou"}
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
                        "text-3xl font-bold uppercase text-white hover:text-[#ff00ff] transition-colors block py-2",
                        pathname === item.href && "text-[#ff00ff]"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                {/* Language Switcher Mobile */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={toggleLocale}
                  className="flex items-center gap-2 text-white/70 hover:text-[#ff00ff] transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  {locale === "en" ? "Afrikaans" : "English"}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button variant="primary" size="lg" className="w-full" asChild>
                    <a href="https://book.nightsbridge.com" target="_blank" rel="noopener noreferrer">
                      {t("home") === "Home" ? "Book Now" : "Bespreek Nou"}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
