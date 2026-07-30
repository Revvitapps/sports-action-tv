import type { MetadataRoute } from "next";

// Basic installable PWA manifest. Kept intentionally minimal for this pass —
// the full offline service worker + Web Push pipeline (per the Product
// Completion Standard §1) is tracked separately. This makes the app
// installable (Add to Home Screen) with standalone display + icons.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SportsActionTV",
    short_name: "SportsActionTV",
    description:
      "Live race and sports streaming with picture-in-picture and overlay ads.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
