import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

/**
 * Generate URL for Sanity images with transformations
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get image dimensions from Sanity image asset
 */
export function getImageDimensions(image: SanityImageSource): {
  width: number;
  height: number;
  aspectRatio: number;
} | null {
  if (!image || typeof image !== "object") return null;

  const ref = (image as { asset?: { _ref?: string } }).asset?._ref;
  if (!ref) return null;

  // Extract dimensions from asset reference
  // Format: image-<id>-<width>x<height>-<format>
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;

  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);

  return {
    width,
    height,
    aspectRatio: width / height,
  };
}

/**
 * Generate blur data URL for LQIP (Low Quality Image Placeholder)
 */
export function getBlurDataUrl(image: SanityImageSource): string {
  return urlFor(image).width(24).height(24).blur(10).quality(30).url();
}

/**
 * Generate responsive image srcset
 */
export function getSrcSet(
  image: SanityImageSource,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048]
): string {
  return widths
    .map((w) => `${urlFor(image).width(w).auto("format").url()} ${w}w`)
    .join(", ");
}
