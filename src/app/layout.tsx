import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackgroundMedia } from "@/components/BackgroundMedia";
import { brandAssets } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "SportsActionTV Subscribe",
    template: "%s | SportsActionTV",
  },
  description:
    "Stripe-native subscribe flow and lifecycle automation for streaming promoters and racing series.",
  openGraph: {
    title: "SportsActionTV Subscribe",
    description:
      "Launch a Vercel-hosted subscribe experience with code-based access, CRM sync, and automated outreach.",
    url: "https://subscribe.sportsactiontv.com",
    siteName: "SportsActionTV Subscribe",
    images: [
      {
        url: brandAssets.heroBackdrop ?? "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "SportsActionTV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [brandAssets.heroBackdrop ?? "/hero-image.png"],
  },
  metadataBase: new URL("https://subscribe.sportsactiontv.com"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative flex min-h-screen flex-col bg-background text-foreground">
        <BackgroundMedia />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),transparent_55%)] opacity-70" />
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-24 py-10 lg:gap-28">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
