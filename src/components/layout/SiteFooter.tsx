import Link from "next/link";
import Image from "next/image";
import { brandAssets } from "@/lib/site";

const footerLinks = [
  {
    title: "Product",
    items: [
      { label: "Subscribe demo", href: "/subscribe" },
      { label: "Raceweek timeline", href: "/lifecycle" },
      { label: "Watch live", href: "/watch" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "https://www.sportsactiontv.com" },
      { label: "Careers", href: "#" },
      { label: "Support", href: "mailto:hello@sportsactiontv.com" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Migration playbook", href: "#" },
      { label: "Data room", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background/60">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-white p-2">
              <Image
                src={brandAssets.primaryLogo}
                alt="SportsActionTV logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <div className="text-lg font-semibold">SportsActionTV</div>
          </div>
          <p className="text-sm text-muted-foreground">
            Building a resilient commerce stack for promoters, tracks, and fans. We handle the subscribe flow so your team can focus on race day.
          </p>
          <p className="text-sm text-muted-foreground">
            CNAME-ready • SOC2-friendly • 24/7 streaming support
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {section.title}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SportsActionTV. All rights reserved.
      </div>
    </footer>
  );
}
