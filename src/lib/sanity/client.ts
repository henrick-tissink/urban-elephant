import { createClient, type QueryParams } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Check if Sanity is configured
export const isSanityConfigured = Boolean(projectId);

// Read client with CDN (for production)
// Use a placeholder project ID if not configured to prevent build errors
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// Preview client without CDN (for drafts)
export const previewClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
});

// Helper to get appropriate client
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

// Typed fetch helper with graceful fallback when Sanity is not configured
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  // Return null/empty if Sanity is not configured
  if (!isSanityConfigured) {
    // Return appropriate empty value based on query pattern
    if (query.includes("[0]") || query.includes("| order")) {
      return [] as unknown as T;
    }
    return null as unknown as T;
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: revalidate ?? 60, // Default 60s ISR
      tags,
    },
  });
}
