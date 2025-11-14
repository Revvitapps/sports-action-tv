import Image from "next/image";
import Reveal from "@/components/Reveal";
import { streamingPlatforms } from "@/lib/site";

const featurePoints = [
  {
    title: "Tap to TV",
    detail: "Start a stream on your phone, then AirPlay or cast to Roku, Fire TV, or Apple TV without re-entering anything.",
  },
  {
    title: "Multi-cam control",
    detail: "Swap between main feed, onboard cam, drone pass, and pit lane angles in a single swipe.",
  },
  {
    title: "Fan-first alerts",
    detail: "Mobile push + SMS let you know when staging lanes open, when rain delays clear, and when highlights drop.",
  },
];

export function PlatformCoverageSection() {
  return (
    <section id="features" className="section-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
      <Reveal className="space-y-4">
        <h2 className="text-3xl font-semibold text-white">Pay once, take the race everywhere.</h2>
        <p className="text-white/85">
          Whether you&apos;re wrenching in the garage, tailgating outside the track, or on the couch with the crew,
          SportsActionTV keeps the stream locked to your account so you can move from phone to big screen without
          missing the restart.
        </p>
        <div className="grid gap-6 rounded-[2.75rem] border border-white/20 bg-black/75 p-6 text-white md:grid-cols-2">
          {streamingPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-4 rounded-[1.75rem] border border-white/25 bg-white/12 px-5 py-4">
              <Image
                src={platform.logo}
                alt={platform.name}
                width={platform.name === "Mobile Apps" ? 90 : 130}
                height={40}
                className="object-contain brightness-150"
              />
              <span className="text-sm uppercase tracking-[0.35em] text-white">{platform.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-6">
        {featurePoints.map((point) => (
          <Reveal
            key={point.title}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-black/50 p-6"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-primary/80">
              {point.title}
            </div>
            <p className="mt-3 text-lg text-muted-foreground">{point.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
