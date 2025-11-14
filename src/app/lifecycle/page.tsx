import type { Metadata } from "next";
import { LifecycleTimelineSection } from "@/components/sections/LifecycleTimelineSection";

export const metadata: Metadata = {
  title: "Raceweek | SportsActionTV",
  description: "Race-week automation map capturing teaser drops, codes, post-race recaps, and win-back flows.",
};

export default function LifecyclePage() {
  return (
    <main className="space-y-12 py-12">
      <section className="section-shell space-y-4 text-center text-white">
        <p className="text-xs uppercase tracking-[0.45em] text-white/70">Raceweek</p>
        <h1 className="text-4xl font-semibold">Race-week automation timeline.</h1>
        <p className="text-white/80">
          From teaser drops to post-race recaps, track every touchpoint that keeps subscribers engaged.
        </p>
      </section>
      <LifecycleTimelineSection />
    </main>
  );
}
