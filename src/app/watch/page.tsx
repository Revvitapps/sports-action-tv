import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { PlayerEmbed } from "@/components/PlayerEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Watch Live | SportsActionTV",
  description: "Embedded player for live races plus on-demand archives.",
};

const tabs = [
  { label: "Live Feed", description: "Current broadcast with live commentary and multi-cam feed." },
  { label: "On Demand", description: "Replay vault with tagging, chapters, and code-protected access." },
  { label: "Driver Radio", description: "Audio-only stream optimized for trackside connectivity." },
];

export default function WatchPage() {
  return (
    <section className="space-y-8">
      <Reveal className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Watch live</p>
        <h1 className="text-3xl font-semibold text-white">Stream every lap with the SportsActionTV player.</h1>
        <p className="text-muted-foreground">
          Redeem your subscribe code, press play, and broadcast to Roku, Fire TV, Apple TV, and mobile.
        </p>
      </Reveal>
      <Reveal className="grid gap-4 md:grid-cols-3">
        {tabs.map((tab) => (
          <div key={tab.label} className="rounded-3xl border border-white/10 bg-black/50 p-5">
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{tab.label}</div>
            <div className="mt-3 text-sm text-muted-foreground">{tab.description}</div>
          </div>
        ))}
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <PlayerEmbed title="SportsActionTV Player" src="https://www.lightcast.com/embed/player.php?id=648218" />
        <PlayerEmbed title="Replay Player" src="https://www.lightcast.com/embed/player.php?id=687668" />
      </div>
      <Reveal className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/15 bg-black/70 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="text-xs uppercase tracking-[0.4em] text-white/70">Need access?</div>
          <h2 className="mt-3 text-2xl font-semibold text-white">Grab a pay-per-view pass</h2>
          <p className="mt-3 text-sm text-white/85">
            Each purchase issues a unique code tied to your profile. Enter it on the Subscribe page to unlock this player instantly.
          </p>
          <Button asChild className="mt-4">
            <Link href="/subscribe">Go to Subscribe</Link>
          </Button>
        </div>
        <div className="rounded-3xl border border-white/15 bg-black/70 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="text-xs uppercase tracking-[0.4em] text-white/70">Support</div>
          <h2 className="mt-3 text-2xl font-semibold text-white">Having trouble?</h2>
          <p className="mt-3 text-sm text-white/85">
            Email hello@sportsactiontv.com or DM @SportsActionTV on race night. We can resend codes or refresh device tokens in seconds.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
