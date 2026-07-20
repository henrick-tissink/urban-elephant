import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    // Serve modern formats — smaller files, same quality. next/image negotiates
    // AVIF → WebP → original based on browser support.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
