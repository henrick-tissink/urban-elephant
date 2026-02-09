"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import type { Popup } from "@/types";

interface PromotionalPopupProps {
  popup: Popup | null;
}

export function PromotionalPopup({ popup }: PromotionalPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!popup) return;

    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem(`popup-dismissed-${popup._id}`);
    if (dismissed) return;

    // Show popup after delay
    const delay = (popup.delay || 3) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [popup]);

  const handleDismiss = () => {
    setIsOpen(false);
    if (popup) {
      sessionStorage.setItem(`popup-dismissed-${popup._id}`, "true");
    }
  };

  if (!popup) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={popup.dismissable ? handleDismiss : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto">
              {/* Close button */}
              {popup.dismissable && (
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors z-10"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Image */}
              {popup.image && (
                <div className="relative aspect-video">
                  <Image
                    src={urlFor(popup.image).width(600).height(340).url()}
                    alt={popup.heading}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-serif text-[#24272a] mb-3">
                  {popup.heading}
                </h2>

                {popup.message && (
                  <div className="text-gray-600 mb-6">
                    {/* Simple text rendering for popup message */}
                    <p>{popup.message[0] && "children" in popup.message[0]
                      ? (popup.message[0].children as Array<{ text: string }>)?.[0]?.text
                      : ""}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {popup.buttonLink && popup.buttonText && (
                    <Button asChild className="flex-1">
                      <a href={popup.buttonLink}>{popup.buttonText}</a>
                    </Button>
                  )}
                  {popup.dismissable && (
                    <Button variant="outline" onClick={handleDismiss}>
                      Maybe Later
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
