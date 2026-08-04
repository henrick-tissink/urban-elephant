"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations/text-reveal";
import { BookingPicker } from "@/components/property/booking-picker";
import { properties } from "@/data/content";
import { track } from "@/lib/analytics";
import { ReservationsCentre } from "@/components/sections/reservations-centre";
import { PropertyStrip } from "@/components/sections/property-strip";

export function Hero() {
  const t = useTranslations("hero");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  // Only load the background video on larger screens that haven't asked to
  // reduce motion. Phones and data-savers get the poster still instead — no
  // multi-MB download over cellular, and the poster is the LCP either way.
  const [enableVideo, setEnableVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const big = window.matchMedia("(min-width: 768px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnableVideo(big.matches && motionOk.matches);
    update();
    big.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      big.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  const openPicker = () => {
    track("book_now_open", { source: "hero" });
    setPickerOpen(true);
  };

  // Attempt to play video once it's mounted - handles browser autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Autoplay was prevented - video stays paused
        setIsPlaying(false);
      }
    };

    // Try to play when video data is loaded
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", attemptPlay);
    };
  }, [enableVideo]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked - user needs to interact first
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };


  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background with Ken Burns fallback */}
      <div className="absolute inset-0">
        {/* Poster image with Ken Burns effect (shows before video loads) */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: videoLoaded ? 1 : 1.1 }}
          transition={{ duration: 20, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
        />

        {enableVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            onPlay={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Gradient Overlay — strengthened top scrim so the header logo and
            pink tagline keep contrast against bright/golden video frames */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
      </div>

      {/* Content — the reservations desk is the centrepiece, with online
          booking offered alongside it rather than instead of it. pt-32 clears
          the fixed reservations bar + header stack. */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[var(--color-brand-anchor)] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mb-5 sm:mb-6 font-bold [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          >
            {t("tagline")}
          </motion.p>

          {/* Main Title — sized down from text-8xl to make room for the
              reservations centre below without pushing it off short screens. */}
          <div className="mb-8 md:mx-auto md:max-w-3xl">
            <TextReveal
              text={t("title")}
              as="h1"
              align="center"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1]"
              delay={0.5}
            />
          </div>

          {/* The reservations desk, given the middle of the hero. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <ReservationsCentre onBookOnline={openPicker} />
          </motion.div>

          {/* Brand slip-line — Niles' marketing tagline, present on every hero */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          >
            {t("slipLine")}
          </motion.p>
        </div>

        {/* The four addresses, along the foot of the hero. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.6 }}
          className="mt-10 w-full border-t border-white/10 pt-7 sm:mt-12 sm:pt-8"
        >
          <PropertyStrip properties={properties} />
        </motion.div>

        {/* Video Controls - Glass morphism style (only when the video is shown) */}
        {enableVideo && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-6 hidden items-center gap-2 rounded-full bg-white/10 p-1 backdrop-blur-md lg:flex"
        >
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? t("pauseVideo") : t("playVideo")}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label={isMuted ? t("unmuteVideo") : t("muteVideo")}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </motion.div>
        )}

      </div>

      <BookingPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        properties={properties}
      />
    </section>
  );
}
