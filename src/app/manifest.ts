import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urban Elephant — Luxury Apartment Hotels in Cape Town",
    short_name: "Urban Elephant",
    description:
      "Family-owned, TGCSA-graded luxury apartment hotels in Cape Town. Hotel comfort, design-led spaces, professional management.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff00ff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
