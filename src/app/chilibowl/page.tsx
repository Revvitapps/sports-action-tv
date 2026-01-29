import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { MotionDiv } from "@/components/MotionDiv";
import { Button } from "@/components/ui/button";
import { brandAssets, streamingPlatforms } from "@/lib/site";
import PipPreview from "./PipPreview";
import InlinePlayer from "./InlinePlayer";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const resolveParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

const resolveType = (src: string, typeParam?: string) => {
  if (typeParam === "hls" || typeParam === "mp4") {
    return typeParam;
  }
  return src.endsWith(".m3u8") ? "hls" : "mp4";
};

const subscriptionUrl = "https://sportsactiontv.lightcast.com/#subscription_products";

const highlightStats = [
  {
    label: "Venue",
    value: "Paradise Raceway - Sellers, SC",
    detail: "High-banked red clay oval with 180 covered pit sheds and raised walkways.",
    image: "/paradise-raceway-night.jpeg",
  },
  {
    label: "Weekend",
    value: "Experience the Thrill of Racing",
    detail: "Two-day fall showcase with youth classes, pro shootouts, and festival energy.",
    image: brandAssets.kartRacer,
  },
  {
    label: "Feature",
    value: "Championship main event",
    detail: "Full-field showdown with stacked grids and high-banked action.",
    image: brandAssets.cameraRig,
  },
  {
    label: "Access",
    value: "Monthly stream pass",
    detail: "Live + replays on Roku, Fire TV, Apple TV, web, and mobile with a single login.",
    image: brandAssets.helmets,
  },
];

const storySections = [
  {
    title: "Experience the Thrill of Racing: Festival-Style Weekend",
    summary:
      "A two-night karting showcase at Paradise Raceway with stacked grids, fan fest energy, and nonstop action.",
    body: [
      "Built around high-banked clay and full fields, the weekend brings youth, amateur, and pro shootouts into one packed program.",
      "Expect fireworks, fan fest moments, and multi-cam coverage that keeps every lap in view.",
      "From qualifying to finales, the focus stays on speed, rivalries, and race-night atmosphere.",
    ],
  },
  {
    title: "Paradise Raceway: Home Track for the Weekend",
    summary:
      "South Carolina's karting showplace with a well-groomed dirt oval, fan-first amenities, and family-friendly vibes.",
    body: [
      "Opened in the early 2010s by Henry Moree, the 95/38 Paradise Raceway pairs a red clay surface with modern touches - 180 covered pit sheds, raised spectator walkways, a playground, a small lake, and alcohol-free grounds.",
      "Amenities keep scaling: a VIP lounge, tiled restrooms, safety barrier upgrades, and plans for more VIP suites plus a NASCAR-style scoreboard. The track runs programs on the 2nd and 4th weekends monthly and anchors several marquee events each year.",
    ],
  },
];

const highlightVideos = [
  {
    title: "Experience the Thrill of Racing Weekend Promo",
    description: "Set the stage for two nights of Paradise Raceway action - spot the fireworks, fan fest, and stacked grids.",
    src: "https://www.lightcast.com/embed/player.php?id=778547&share=2&autoPlay=1",
  },
  {
    title: "Crash & Chaos Reel",
    description: "Lean into the dirt-track drama with the heaviest hits and close calls from past Paradise weekends.",
    src: "https://www.lightcast.com/embed/player.php?id=778546&share=2&autoPlay=1",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://watch.sportsactiontv.com"),
  title: "Experience the Thrill of Racing | SportsActionTV",
  description:
    "Stream Experience the Thrill of Racing live from Paradise Raceway. Full-weekend coverage on Roku, Fire TV, Apple TV, mobile, and web.",
  openGraph: {
    title: "Experience the Thrill of Racing | SportsActionTV",
    description:
      "Watch Experience the Thrill of Racing live from Paradise Raceway. Full-weekend coverage with replays, multi-cam, and TV apps.",
    url: "https://watch.sportsactiontv.com/chilibowl",
    type: "website",
    images: [
      {
        url: "https://watch.sportsactiontv.com/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Experience the Thrill of Racing hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience the Thrill of Racing | SportsActionTV",
    description:
      "Live coverage of Experience the Thrill of Racing from Paradise Raceway with full replay access.",
    images: ["https://watch.sportsactiontv.com/hero-image.png"],
  },
};

export default function ThanksgivingRumblePage({ searchParams }: PageProps) {
  const pipParam = resolveParam(searchParams?.pip);
  const modeParam = resolveParam(searchParams?.mode);
  const pipToggle = pipParam === "1" || pipParam === "true";
  const showPip = pipToggle || pipParam !== undefined || modeParam === "pip";

  if (showPip) {
    const src = resolveParam(searchParams?.src) ?? "/chili-bowl-promo3.mp4";
    const pipSrc = (!pipToggle && pipParam) || resolveParam(searchParams?.pipSrc) || "/player-main.mp4";
    const type = resolveType(src, resolveParam(searchParams?.type));
    const pipType = resolveType(pipSrc, resolveParam(searchParams?.pipType));
    const vastTagUrl = resolveParam(searchParams?.vast) || undefined;

    return (
      <PipPreview
        src={src}
        type={type}
        pipSrc={pipSrc}
        pipType={pipType}
        vastTagUrl={vastTagUrl}
      />
    );
  }

  return (
    <div className="w-full space-y-16 pb-8">
      <section className="relative w-full min-h-[100svh] overflow-hidden px-0 pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/22 to-black/18 pointer-events-none" />
        <div className="section-shell relative flex h-full flex-col items-center gap-14 text-center">
          <Reveal className="space-y-5 text-white">
            <MotionDiv delay={0.05} className="text-xs uppercase tracking-[0.45em] text-white/75">
              Paradise Raceway • Live
            </MotionDiv>
            <MotionDiv delay={0.12}>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Experience the Thrill of Racing
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.18}>
              <p className="max-w-4xl text-white/85">
                Two nights of high-banked karting from Sellers, SC - streamed live on SportsActionTV. Grab a monthly pass,
                send it to the big screen, and catch every lap and fireworks show.
              </p>
            </MotionDiv>
            <MotionDiv delay={0.24} className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-14 py-6 text-xl font-semibold"
              >
                <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                  Subscribe to watch now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-6 text-lg font-semibold"
              >
                <Link href="/chilibowl?pip=1">
                  Player preview
                </Link>
              </Button>
            </MotionDiv>
            <MotionDiv
              delay={0.3}
              className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-white/80"
            >
              <span className="rounded-full border border-white/30 bg-gradient-to-r from-black/70 via-black/60 to-black/70 px-6 py-3">
                Roku
              </span>
              <span className="rounded-full border border-white/30 bg-gradient-to-r from-black/70 via-black/60 to-black/70 px-6 py-3">
                Fire TV
              </span>
              <span className="rounded-full border border-white/30 bg-gradient-to-r from-black/70 via-black/60 to-black/70 px-6 py-3">
                Apple TV
              </span>
              <span className="rounded-full border border-white/30 bg-gradient-to-r from-black/70 via-black/60 to-black/70 px-6 py-3">
                Web + Mobile
              </span>
            </MotionDiv>
          </Reveal>

          <div className="flex w-full flex-col gap-14 pt-6">
            {highlightStats.map((stat, index) => (
              <MotionDiv
                key={stat.label}
                delay={0.08 + index * 0.04}
                className={`relative min-h-[180px] overflow-hidden rounded-[999px] border border-white/15 bg-black/60 px-8 py-6 text-white shadow-[0_18px_55px_rgba(0,0,0,0.4)] ${
                  index % 2 === 0 ? "md:ml-auto md:w-[70%]" : "md:mr-auto md:w-[70%]"
                }`}
              >
                {stat.image && (
                  <Image
                    src={stat.image}
                    alt={stat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className={`object-cover ${
                      stat.label === "Feature"
                        ? "object-[50%_35%] scale-[1.05]"
                        : stat.label === "Venue"
                          ? "object-[50%_60%] scale-[0.95] brightness-[1.08]"
                          : stat.label === "Weekend"
                            ? "object-[50%_20%] scale-[0.96]"
                            : "object-center scale-[1.02]"
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
                <div className="relative space-y-1 text-center">
                  <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/70">{stat.label}</div>
                  <div className="text-lg font-semibold leading-tight">{stat.value}</div>
                  <p className="text-sm text-white/80">{stat.detail}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell space-y-6">
        <div className="text-center space-y-2 text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Player preview</p>
          <h2 className="text-2xl font-semibold md:text-3xl">Live player embed</h2>
          <p className="text-sm text-white/70">
            This inline player is live for deliverability checks.
          </p>
        </div>
        <InlinePlayer />
      </section>

      <section className="space-y-8 px-0">
        <div className="section-shell">
          <Reveal className="flex flex-col gap-3 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">All-access stream</p>
              <h2 className="text-3xl font-semibold">Watch the entire weekend on every platform.</h2>
              <p className="text-white/80">
                One monthly pass unlocks live and replay feeds plus device-hopping for the crew.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="secondary" size="lg">
                <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                  Buy monthly access
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/subscribe">Redeem a code</Link>
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="space-y-6">
          <Reveal className="group relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-black/70 shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1">
            <div className="absolute inset-0">
              <Image
                src="/paradise-raceway-night.jpeg"
                alt="Feature race night"
                fill
                sizes="100vw"
                className="object-cover object-[50%_35%] brightness-[1.2] transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            </div>
            <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Featured main event
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Two-night card
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Live + replay
                </span>
              </div>
              <h3 className="text-[clamp(2.2rem,3.2vw,3rem)] font-semibold drop-shadow-lg">Prime-time racing, wall-to-wall.</h3>
              <p className="max-w-4xl text-base text-white/90">
                Expect stacked grids, fan fest energy, and a headline main event under the lights. Tap below for the full weekend overview.
              </p>
              <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Full-field finals
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Multi-cam coverage
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Replay ready
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="#stories">Explore event details</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe to watch now
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <section className="w-full px-0">
            <Reveal className="grid w-full gap-4 rounded-[1.5rem] p-0 md:grid-cols-2 md:gap-4">
              <div className="relative h-[300px] w-full overflow-hidden rounded-[1.25rem] bg-black/60 sm:h-[340px] lg:h-[400px]">
                <iframe
                  title={highlightVideos[0].title}
                  src={highlightVideos[0].src}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="relative h-[300px] w-full overflow-hidden rounded-[1.25rem] sm:h-[340px] lg:h-[400px]">
                <Image
                  src="/16-9scheulde.png"
                  alt="Experience the Thrill of Racing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-contain object-center"
                />
              </div>
            </Reveal>
          </section>

          <Reveal className="group relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-black/70 shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1">
            <div className="absolute inset-0">
              <Image
                src="/helmets.png"
                alt="Experience the Thrill of Racing weekend"
                fill
                sizes="100vw"
                className="object-cover object-[50%_20%] brightness-[1.15] transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            </div>
            <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Experience the Thrill of Racing
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Two-day card
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Live + replay
                </span>
              </div>
              <h3 className="text-[clamp(2.2rem,3.2vw,3rem)] font-semibold drop-shadow-lg">Watch the entire weekend everywhere.</h3>
              <p className="max-w-4xl text-base text-white/90">
                Fireworks, fan fest, stacked kart grids, and wall-to-wall coverage. Cast from phone to Roku, Fire TV, or Apple TV without losing your spot in the stream.
              </p>
              <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Multi-cam + replay vault
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Device hopping trackside
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  TV apps + web + mobile
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe to watch now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/watch">Watch now</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <section className="w-full px-0">
            <Reveal className="grid w-full gap-4 rounded-[1.5rem] p-0 md:grid-cols-2 md:gap-4">
              <div className="relative h-[300px] w-full overflow-hidden rounded-[1.25rem] bg-black/60 sm:h-[340px] lg:h-[400px]">
                <Image
                  src="/helmets.png"
                  alt="Crash reel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Crash highlights</div>
                  <h3 className="text-xl font-semibold">{highlightVideos[1].title}</h3>
                  <p className="text-sm text-white/85">{highlightVideos[1].description}</p>
                </div>
              </div>
              <div className="relative h-[300px] w-full overflow-hidden rounded-[1.25rem] bg-black/60 sm:h-[340px] lg:h-[400px]">
                <iframe
                  title={highlightVideos[1].title}
                  src={highlightVideos[1].src}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </Reveal>
          </section>

          <div id="platforms">
            <Reveal className="rounded-[2rem] border border-white/10 bg-black/60 p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Platforms</div>
              <p className="mt-2 text-lg font-semibold text-white">Tap to TV or watch on the go.</p>
              <p className="mt-2 text-sm text-white/80">
                Roku, Fire TV, Apple TV, mobile apps, and web are all live - same pass, same player.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {streamingPlatforms.map((platform, idx) => (
                  <MotionDiv
                    key={platform.name}
                    delay={0.05 + idx * 0.04}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3"
                  >
                    <Image
                      src={platform.logo}
                      alt={platform.name}
                      width={platform.name === "Mobile Apps" ? 80 : 120}
                      height={36}
                      className="h-9 w-auto object-contain brightness-150"
                    />
                    <span className="text-xs uppercase tracking-[0.3em] text-white">{platform.name}</span>
                  </MotionDiv>
                ))}
              </div>
              <Button asChild className="mt-5 w-full">
                <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                  Subscribe to watch now
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="stories" className="section-shell space-y-5">
        <Reveal className="space-y-3 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Learn more</p>
          <h2 className="text-3xl font-semibold">Learn more about this weekend&apos;s race and venue.</h2>
          <p className="text-white/80">
            Tap to open the event overview and Paradise Raceway background.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {storySections.map((section, index) => (
            <Reveal
              key={section.title}
              className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/65 shadow-[0_20px_65px_rgba(0,0,0,0.4)]"
            >
              <details className="group" open={index === 0}>
                <summary className="flex cursor-pointer flex-col gap-4 px-6 py-5 text-left text-white sm:flex-row sm:items-start sm:justify-between [&::-webkit-details-marker]:hidden">
                  <div className="space-y-2 sm:max-w-3xl">
                    <div className="text-xs uppercase tracking-[0.35em] text-primary/80">See more</div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-sm text-white/80">{section.summary}</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/75">
                    Read
                  </span>
                </summary>
                <div className="space-y-3 border-t border-white/10 bg-white/5 px-6 py-5 text-sm text-white/85">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-black/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="relative flex flex-col gap-6 text-white lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4 lg:max-w-2xl">
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Ready to watch?</p>
              <h3 className="text-3xl font-semibold">Grab the monthly pass and lock in the weekend.</h3>
              <p className="text-white/80">
                The CTAs above all drive to our subscription products. Keep this block live through the weekend so viewers always have a direct path back to the checkout and player.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe to watch now
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96 lg:w-[520px]">
              <Image
                src="/schedule-next-to-video.jpeg"
                alt="Experience the Thrill of Racing schedule"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-contain object-center scale-[0.98]"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
