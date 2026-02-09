"use client";

import { cn } from "@/lib/utils";

interface TestimonialSkeletonProps {
  className?: string;
}

export function TestimonialSkeleton({ className }: TestimonialSkeletonProps) {
  return (
    <div className={cn("bg-white p-8 lg:p-10", className)}>
      {/* Stars skeleton */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-[#ffc6ff] animate-pulse rounded" />
        ))}
      </div>

      {/* Quote skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
        <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
        <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
      </div>

      {/* Author skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
          <div className="h-3 bg-gray-100 animate-pulse rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <TestimonialSkeleton key={i} />
      ))}
    </div>
  );
}
