"use client";

import { cn } from "@/lib/utils";

interface PropertyCardSkeletonProps {
  className?: string;
}

export function PropertyCardSkeleton({ className }: PropertyCardSkeletonProps) {
  return (
    <div className={cn("group", className)}>
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 animate-pulse mb-4" />

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-24" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
