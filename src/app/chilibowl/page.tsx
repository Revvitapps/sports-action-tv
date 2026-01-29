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

const upcomingEvents = [
  {
    label: "Sat, Feb 21",
    value: "2nd Annual Kathy Luster Memorial",
    detail: "Cross Roads Motorplex • Jasper, FL • 9:00 AM",
    image: brandAssets.kartRacer,
  },
  {
    label: "Sat, Feb 28",
    value: "Chili Bowl Karting Championship - Triple T",
    detail: "Triple T Raceway Inc • St Pauls, NC • 10:30 AM",
    image: brandAssets.cameraRig,
  },
  {
    label: "Sat, Mar 07",
    value: "Mach3 Pro Series",
    detail: "Triple T Raceway Inc • St Pauls, NC • 11:30 AM",
    image: brandAssets.helmets,
  },
];

const storySections = [
  {
    title: "Our Passion",
    summary: "We’re changing the way the world views racing.",
    body: [
      "Join us in the fast lane and become part of a community that shares your passion for racing.",
      "We spotlight the stories, the speed, and the people who make race day unforgettable.",
    ],
  },
  {
    title: "What We Offer",
    summary: "Exclusive access, live coverage, and an interactive experience.",
    body: [
      "Exclusive access: go behind the scenes with drivers, crews, and the moments you won’t find anywhere else.",
      "Live race coverage: heart-pounding action with multi-cam views and replay access across every device.",
      "Interactive experience: choose your views, track the stats, and stay connected to the action.",
    ],
  },
  {
    title: "Who We Are",
    summary: "We are Sports Action TV.",
    body: [
      "Sports Action TV films live events at dirt tracks, go kart racing, high school football games, and more.",
      "We use top-tier equipment to deliver high-quality coverage you can enjoy anywhere.",
      "If you love dirt track racing, karting, or Friday night lights, we bring you the biggest events and the moments that matter.",
    ],
  },
];

const highlightVideos = [
  {
    title: "SportsActionTV Feature Reel",
    description: "A quick look at the energy, coverage, and community you’ll find on Sports Action TV.",
    src: "https://www.lightcast.com/embed/player.php?id=778547&share=2&autoPlay=1",
  },
  {
    title: "Crash & Chaos Reel",
    description: "Highlights from intense race nights, close calls, and hard-fought battles.",
    src: "https://www.lightcast.com/embed/player.php?id=778546&share=2&autoPlay=1",
  },
];

const faqItems = [
  {
    question: "What events can I watch live?",
    answer:
      "Sports Action TV covers dirt track racing, go kart events, high school football, and more. We focus on the biggest races, marquee weekends, and the stories behind them.",
  },
  {
    question: "How do I catch the live action?",
    answer:
      "Catch the live action on our website or supported platforms. Just grab event access or use your subscription.",
  },
  {
    question: "Is a subscription required to watch?",
    answer:
      "Yes, you’ll need a subscription to watch our live streams and videos. Check event details for access info.",
  },
  {
    question: "Can I stream on my TV or phone?",
    answer:
      "Absolutely. Stream on your smart TV, phone, tablet, or computer.",
  },
  {
    question: "How do I subscribe to Sports Action TV?",
    answer:
      "Subscribing is easy. Head to our website, choose your plan, and follow the prompts to sign up. You’ll be watching live events in no time.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://watch.sportsactiontv.com"),
  title: "Sports Action TV | Live Events & Race Coverage",
  description:
    "Sports Action TV delivers live race coverage, exclusive access, and interactive viewing across web, mobile, and TV apps. See the next three races and subscribe.",
  openGraph: {
    title: "Sports Action TV | Live Events & Race Coverage",
    description:
      "Live coverage, exclusive access, and interactive race viewing across every device.",
    url: "https://watch.sportsactiontv.com/chilibowl",
    type: "website",
    images: [
      {
        url: "https://watch.sportsactiontv.com/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Sports Action TV hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Action TV | Live Events & Race Coverage",
    description:
      "Live coverage, exclusive access, and interactive race viewing across every device.",
    images: ["https://watch.sportsactiontv.com/hero-image.png"],
  },
};

export default function ChiliBowlPage({ searchParams }: PageProps) {
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
              Sports Action TV • Live + Replay
            </MotionDiv>
            <MotionDiv delay={0.12}>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                We’re Changing the Way the World Views Racing
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.18}>
              <p className="max-w-4xl text-white/85">
                Join us in the fast lane and become part of a community that shares your passion for racing. Watch live
                events, exclusive access, and multi-cam coverage across every device.
              </p>
            </MotionDiv>
            <MotionDiv delay={0.24} className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-14 py-6 text-xl font-semibold"
              >
                <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                  Subscribe now to get in on all the action
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
            <div className="text-center text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Next 3 races</p>
              <h2 className="text-2xl font-semibold md:text-3xl">Upcoming live events</h2>
              <p className="text-sm text-white/70">
                Mark your calendar and watch live on Sports Action TV.
              </p>
            </div>
            {upcomingEvents.map((stat, index) => (
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
                    className="object-cover object-center scale-[1.02]"
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
              <h2 className="text-3xl font-semibold">Watch live events on every platform.</h2>
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
                  Exclusive access
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Live coverage
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Live + replay
                </span>
              </div>
              <h3 className="text-[clamp(2.2rem,3.2vw,3rem)] font-semibold drop-shadow-lg">Prime-time action, wall-to-wall.</h3>
              <p className="max-w-4xl text-base text-white/90">
                From dirt tracks to karting and Friday night lights, Sports Action TV delivers nonstop coverage and the angles that matter.
              </p>
              <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Multi-cam views
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Replay ready
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Exclusive content
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="#stories">Explore Sports Action TV</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe now to get in on all the action
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
                  alt="Sports Action TV schedule"
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
                alt="Sports Action TV coverage"
                fill
                sizes="100vw"
                className="object-cover object-[50%_20%] brightness-[1.15] transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            </div>
            <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Sports Action TV
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Multi-cam
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Live + replay
                </span>
              </div>
              <h3 className="text-[clamp(2.2rem,3.2vw,3rem)] font-semibold drop-shadow-lg">Watch every weekend everywhere.</h3>
              <p className="max-w-4xl text-base text-white/90">
                Live events, exclusive access, and multi-cam coverage. Cast from phone to Roku, Fire TV, or Apple TV without losing your spot in the stream.
              </p>
              <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Multi-cam + replay vault
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Device hopping across devices
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  TV apps + web + mobile
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe now to get in on all the action
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
                Roku, Fire TV, Apple TV, mobile apps, and web are all live - one pass, one player.
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
                  Subscribe now to get in on all the action
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="stories" className="section-shell space-y-5">
        <Reveal className="space-y-3 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Learn more</p>
          <h2 className="text-3xl font-semibold">Learn more about Sports Action TV.</h2>
          <p className="text-white/80">
            Tap to open the story behind the coverage, access, and community.
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

      <section className="section-shell space-y-5">
        <Reveal className="space-y-3 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">FAQ</p>
          <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
          <p className="text-white/80">
            Answers to the most common questions about streaming Sports Action TV.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {faqItems.map((item, index) => (
            <Reveal
              key={item.question}
              className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/65 shadow-[0_20px_65px_rgba(0,0,0,0.4)]"
            >
              <details className="group" open={index === 0}>
                <summary className="flex cursor-pointer flex-col gap-4 px-6 py-5 text-left text-white sm:flex-row sm:items-start sm:justify-between [&::-webkit-details-marker]:hidden">
                  <div className="space-y-2 sm:max-w-3xl">
                    <div className="text-xs uppercase tracking-[0.35em] text-primary/80">FAQ</div>
                    <h3 className="text-xl font-semibold">{item.question}</h3>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/75">
                    Read
                  </span>
                </summary>
                <div className="space-y-3 border-t border-white/10 bg-white/5 px-6 py-5 text-sm text-white/85">
                  <p>{item.answer}</p>
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
              <h3 className="text-3xl font-semibold">Subscribe now to get in on all the action.</h3>
              <p className="text-white/80">
                Get access to live events, exclusive content, and the multi-cam experience across every device.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={subscriptionUrl} target="_blank" rel="noreferrer">
                    Subscribe now to get in on all the action
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96 lg:w-[520px]">
              <Image
                src="/schedule-next-to-video.jpeg"
                alt="Sports Action TV schedule"
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
