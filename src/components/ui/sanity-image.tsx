"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor, getBlurDataUrl, getImageDimensions } from "@/lib/sanity";
import type { SanityImage as SanityImageType } from "@/types";

interface SanityImageProps {
  image: SanityImageType;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  quality?: number;
  hoverZoom?: boolean;
}

export function SanityImage({
  image,
  alt,
  fill = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className,
  containerClassName,
  quality = 85,
  hoverZoom = false,
}: SanityImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!image?.asset) return null;

  // Get dimensions for aspect ratio
  const dimensions = getImageDimensions(image);
  const aspectRatio = dimensions?.aspectRatio || 16 / 9;

  // Generate blur placeholder
  const blurDataUrl = getBlurDataUrl(image);

  // Build image URL
  const imageUrl = urlFor(image)
    .width(width || 1200)
    .height(height || Math.round((width || 1200) / aspectRatio))
    .quality(quality)
    .auto("format")
    .url();

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          className={cn(
            "object-cover transition-all duration-700",
            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
            hoverZoom && "group-hover:scale-105",
            className
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      style={{ aspectRatio }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={width || 1200}
        height={height || Math.round((width || 1200) / aspectRatio)}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        className={cn(
          "object-cover transition-all duration-700 w-full h-full",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          hoverZoom && "group-hover:scale-105",
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
