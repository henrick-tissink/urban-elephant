"use client";

import { cn } from "@/lib/utils";

interface VehicleCardSkeletonProps {
  className?: string;
}

export function VehicleCardSkeleton({ className }: VehicleCardSkeletonProps) {
  return (
    <div className={cn("bg-gray-50 overflow-hidden", className)}>
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />

        {/* Specs */}
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-100 animate-pulse rounded w-12" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-12" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-16" />
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-28" />
            <div className="h-3 bg-gray-100 animate-pulse rounded w-16" />
          </div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function VehicleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
