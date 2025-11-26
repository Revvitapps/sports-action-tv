"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Reveal from "@/components/Reveal";
import { brandAssets } from "@/lib/site";

const navItems = [
  { href: "/watch", label: "Watch Live" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/lifecycle", label: "Raceweek" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/thanksgiving-rumble") {
    return (
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/75 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-center py-4">
          <div className="flex w-full max-w-5xl items-center justify-center gap-4 rounded-full border border-white/20 bg-white/10 px-12 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white p-1.5">
              <Image
                src={brandAssets.primaryLogo}
                alt="SportsActionTV logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white text-center">
              Thanksgiving Rumble / Wayne Poole Memorial
            </div>
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white p-1.5">
              <Image
                src={brandAssets.primaryLogo}
                alt="SportsActionTV logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/75 backdrop-blur-xl">
      <Reveal className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white p-1">
            <Image
              src={brandAssets.primaryLogo}
              alt="SportsActionTV logo"
              fill
              sizes="44px"
              className="object-contain"
            />
          </span>
          <div className="leading-tight">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">SportsActionTV</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
              scroll={item.href.startsWith("#")}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="ghost" asChild>
            <Link href="/watch">Watch Streams</Link>
          </Button>
          <Button asChild>
            <Link href="/subscribe">Subscribe Now</Link>
          </Button>
        </nav>
        <button
          className="rounded-md border border-white/10 p-2 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Reveal>
      {open && (
        <div className="border-t border-white/5 bg-background/90 lg:hidden">
          <div className="section-shell pb-6 pt-4">
            <div className="grid gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-muted-foreground transition hover:text-foreground"
                  scroll={item.href.startsWith("#")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              <Button variant="outline" asChild>
                <Link href="/watch" onClick={() => setOpen(false)}>
                  Watch Streams
                </Link>
              </Button>
            <Button asChild>
              <Link href="/subscribe" onClick={() => setOpen(false)}>
                Subscribe Now
              </Link>
            </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
