"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/text-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Attempt to play video on mount - handles browser autoplay policies
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
  }, []);

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

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
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

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#ff00ff] uppercase tracking-[0.3em] text-xs md:text-sm mb-6 font-bold"
          >
            {t("tagline")}
          </motion.p>

          {/* Main Title */}
          <div className="mb-6">
            <TextReveal
              text={t("title")}
              as="h1"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1]"
              delay={0.5}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-white/80 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton>
              <Button variant="primary" size="lg" asChild>
                <Link href="/properties">{tCommon("viewDetails")}</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outlineLight" size="lg" asChild>
                <a href="https://book.nightsbridge.com" target="_blank" rel="noopener noreferrer">
                  {tCommon("bookNow")}
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Video Controls - Glass morphism style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-24 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1"
        >
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
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
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label={t("scrollDown")}
        >
          <span className="text-xs uppercase tracking-widest">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>

        {/* Best Rate Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-24 right-6 hidden md:block"
        >
          <div className="bg-[#ff00ff] text-white px-4 py-3 rounded-lg shadow-lg shadow-[#ff00ff]/30">
            <p className="text-[10px] uppercase tracking-widest mb-0.5 opacity-90">Guaranteed</p>
            <p className="text-sm font-bold uppercase">{t("bestRate")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
