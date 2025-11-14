import Reveal from "@/components/Reveal";
import { Clock } from "lucide-react";

const lifecycleMilestones = [
  {
    label: "T-7 days",
    title: "Teaser drop",
    detail: "Highlight reels, drama-packed trailers, and behind-the-scenes pitside photos hit your inbox + SMS.",
  },
  {
    label: "Pass secured",
    title: "Instant code",
    detail: "Right after checkout you get a text + email with your access link, device tips, and schedule reminders.",
  },
  {
    label: "Checkered flag",
    title: "Post-race rewind",
    detail: "Full replay, multi-cam highlights, and photo galleries stay unlocked so you can rewatch with the crew.",
  },
  {
    label: "Next slate",
    title: "Early bird heads-up",
    detail: "If you haven&apos;t booked the next card, we ping you with loyalty discounts and the next big storyline.",
  },
];

export function LifecycleTimelineSection() {
  return (
    <section id="timeline" className="section-shell space-y-6">
      <Reveal className="flex items-center gap-3 text-sm text-muted-foreground">
        <Clock className="size-4" />
        Race-week timeline
      </Reveal>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/20 to-transparent md:left-1/2" />
        <div className="space-y-10">
          {lifecycleMilestones.map((milestone, idx) => (
            <Reveal
              key={milestone.title}
              className={`relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/80 text-white shadow-[0_25px_70px_rgba(0,0,0,0.4)] ${
                idx % 2 === 0 ? "md:ml-auto md:w-1/2" : "md:mr-auto md:w-1/2"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-30" />
              <div className="relative p-8">
                <div className="text-xs uppercase tracking-[0.4em] text-white/70">{milestone.label}</div>
                <h3 className="mt-3 text-2xl font-semibold">{milestone.title}</h3>
                <p className="mt-4 text-lg text-white/85">{milestone.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
