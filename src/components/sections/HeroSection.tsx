import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { MotionDiv } from "@/components/MotionDiv";
import { brandAssets, streamingPlatforms } from "@/lib/site";

const heroStats = [
  { label: "Live cards", value: "40+/mo", detail: "Dirt, kart & sprint showdowns" },
  { label: "Instant start", value: "< 30s", detail: "Tap pay, watch in seconds" },
  { label: "Every screen", value: "Phone → TV", detail: "AirPlay, Roku, Fire, web" },
];

const heroVisuals = [
  {
    src: brandAssets.kartRacer,
    categories: ["Feature heat", "Open wheel"],
    headline: "Slide jobs + sparks",
    detail: "Feel the exhaust haze, drone dives, and burnout sparks just like being in the infield.",
    features: ["Pyro intros", "Turn-by-turn telemetry", "Victory lane camera"],
  },
  {
    src: brandAssets.kartWheel,
    categories: ["Night drift", "Kart barns"],
    headline: "Pit crews on standby",
    detail: "Hop between onboard cams and broadcast angles the same way FloSports and DirtVision keep you close.",
    features: ["Helmet-cam switchers", "Radio chatter feeds", "Live pit timing"],
  },
  {
    src: brandAssets.helmets,
    categories: ["Fan perks", "Members club"],
    headline: "Member-only drops",
    detail: "Unlock merch perks, highlight recaps, and SMS alerts when the next green flag is staging.",
    features: ["Merch perks", "Highlight recaps", "Loyalty boosts"],
  },
  {
    src: brandAssets.cameraRig,
    categories: ["Broadcast booth", "Production stack"],
    headline: "Multi-cam control room",
    detail: "Switcher-style overlays, pit-lane stats, and replay triggers roll out just like the DiFiore services stack.",
    features: ["Switcher overlays", "Pit-lane stats", "Replay triggers"],
  },
];

const inspirationBeats = ["DirtVision energy", "RacinDirt grit", "FloSports polish"];

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[92svh] overflow-hidden px-0 pt-24 pb-24">
      <div className="relative flex w-full flex-col gap-14">
        <div className="space-y-10 px-6 text-center sm:px-12 lg:px-20">
          <Reveal>
            <MotionDiv
              delay={0.05}
              className="inline-flex items-center gap-5 rounded-full border border-white/15 bg-black/75 px-8 py-4 text-[0.8rem] uppercase tracking-[0.5em] text-white/90 backdrop-blur transition duration-500 hover:bg-black/85"
            >
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white p-1.5">
                <Image src={brandAssets.primaryLogo} alt="SportsActionTV" fill sizes="42px" className="object-contain" />
              </span>
              Watch SportsActionTV Live
            </MotionDiv>
          </Reveal>
          <Reveal>
            <MotionDiv delay={0.12} className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#pricing">Get your pit pass</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#events">See upcoming races</Link>
              </Button>
            </MotionDiv>
          </Reveal>
          <Reveal>
            <MotionDiv delay={0.18} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroStats.map((stat, index) => (
                <MotionDiv
                  key={stat.label}
                  delay={0.2 + index * 0.05}
                  className="rounded-2xl border border-white/20 bg-black/70 p-6 text-white"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-white/80">{stat.label}</div>
                  <div className="mt-2 text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-white/90">{stat.detail}</p>
                </MotionDiv>
              ))}
            </MotionDiv>
          </Reveal>
          <Reveal>
            <MotionDiv delay={0.25}>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Every burnout, slide job, and kart battle streaming live with SportsActionTV.
              </h1>
            </MotionDiv>
          </Reveal>
        </div>
        <div className="w-full space-y-10 px-4 sm:px-8">
          {heroVisuals.map((visual, index) => (
            <Reveal key={visual.headline}>
              <MotionDiv
                delay={0.2 + index * 0.1}
                className="group relative min-h-[360px] w-full overflow-hidden border border-white/15 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_45px_120px_rgba(0,0,0,0.6)]"
              >
                <Image
                  src={visual.src}
                  alt={visual.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  className="absolute inset-0 h-full w-full object-cover brightness-[1.45] transition duration-500 group-hover:scale-105 group-hover:brightness-[1.6]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/65" />
                <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-6 py-12 text-center text-white lg:px-12">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                    {visual.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[clamp(2.4rem,3.5vw,3.2rem)] font-semibold drop-shadow-lg">{visual.headline}</h3>
                  <p className="max-w-3xl text-base text-white/90">{visual.detail}</p>
                  <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                    {visual.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg">Get a pit pass</Button>
                    <Button size="lg" variant="outline">
                      See highlights
                    </Button>
                  </div>
                </div>
              </MotionDiv>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-1 flex-col items-center gap-10 px-6 text-center sm:px-10 lg:px-16 lg:text-left">
          <Reveal>
            <MotionDiv delay={0.3} className="space-y-4 text-center">
              <div className="text-sm uppercase tracking-[0.5em] text-white/80">Dialed like</div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.35em] text-white">
                {inspirationBeats.map((beat) => (
                  <span key={beat} className="rounded-full border border-white/30 bg-black/70 px-4 py-2">
                    {beat}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </Reveal>
          <Reveal>
            <MotionDiv delay={0.35} className="space-y-4 text-center">
              <div className="text-sm uppercase tracking-[0.5em] text-white/80">Streaming surfaces</div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {streamingPlatforms.map((platform, index) => (
                  <MotionDiv key={platform.name} delay={0.35 + index * 0.05}>
                    <div className="flex min-h-[110px] min-w-[210px] flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-white/25 bg-black/75 px-6 py-5 text-white">
                      {platform.name === "Mobile Apps" ? (
                        <>
                          <span className="text-xs uppercase tracking-[0.35em] text-white/70">Mobile Apps</span>
                          <div className="flex flex-col gap-2 text-[0.8rem] font-semibold">
                            <span className="rounded-full border border-white/40 px-3 py-1">App Store</span>
                            <span className="rounded-full border border-white/40 px-3 py-1">Google Play</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={platform.logo}
                            alt={platform.name}
                            width={130}
                            height={40}
                            className="h-10 w-auto object-contain brightness-150"
                          />
                          <span className="text-xs uppercase tracking-[0.35em] text-white/80">{platform.name}</span>
                        </>
                      )}
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          </Reveal>
        </div>
        <Reveal>
          <MotionDiv
            delay={0.4}
            className="mx-auto w-full max-w-4xl rounded-[2.5rem] border border-white/10 bg-black/65 px-10 py-8 text-center text-base text-white/90"
          >
            <span className="block text-xl font-semibold">
              Fire up the trailer TV, text the crew link, and let the motion graphics guide you to the feature—no tech brief required.
            </span>
          </MotionDiv>
        </Reveal>
      </div>
    </section>
  );
}
