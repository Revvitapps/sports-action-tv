import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { MotionDiv } from "@/components/MotionDiv";
import { Button } from "@/components/ui/button";
import { brandAssets, streamingPlatforms } from "@/lib/site";

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
    value: "Thanksgiving Rumble",
    detail: "Two-day fall showcase with youth classes, pro shootouts, and festival energy.",
    image: brandAssets.kartRacer,
  },
  {
    label: "Headliner",
    value: "Wayne Poole Memorial",
    detail: "51-lap tribute race; payouts have climbed into the $20,092-to-win range for the 20th anniversary.",
    image: "/wp-memorial.jpg",
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
    title: "Thanksgiving Rumble: Festival-Style Fall Weekend",
    summary:
      "Paradise Raceway's Thanksgiving Rumble is now a national fall marquee, part of the WKA Dirt Series Triple Crown with six-figure purses and festival energy.",
    body: [
      "Born in the mid-2010s as a Thanksgiving weekend destination, the Rumble quickly grew from a regional race into a national draw with two packed days of youth, amateur, and pro shootouts. Paradise's high-banked red clay, 180+ pit sheds, and family-friendly setup turned it into a holiday tradition.",
      "Big-money eras and WKA Triple Crown status cemented its stature: the 2021 weekend hit a ~$220K purse and introduced broad live streaming; 2022 brought spec Reaper tires to level the field; 2023 saw record crowds and Austin Banker reclaim the Wayne Poole Memorial; 2024 (10th anniversary) delivered Cameron Carter's last-lap Memorial win alongside fireworks, fan fest, parachute team drop-ins, and a two-day festival slate.",
      "The modern Rumble blends championship-caliber racing with full-festival vibes: multi-cam streaming, fireworks, live music, fan fest, and wristbanded entry so fans and teams can move easily between pits and grandstands while catching every class and replay.",
    ],
  },
  {
    title: "Wayne Poole Memorial: The Crown-Jewel Karting Tribute",
    summary:
      "Karting's most coveted memorial race, honoring #92 Wayne Poole with a 50+ lap showdown now hosted at Paradise.",
    image: "/wayne-poole.png",
    body: [
      "Founded in 2005 after Wayne's passing, the Wayne Poole Memorial race has grown into a career-making win. It ran for years at Georgia Thanksgiving Thunder before moving permanently to Paradise Raceway in 2021 as the Friday-night headliner of the Thanksgiving Rumble.",
      "The race format leans into Wayne's number: 50+ laps (51 for the 2025 milestone) and payouts that always end in 92. Early years paid $5,092-to-win, later seasons jumped to $10,092, and the 2025 anniversary lands at $20,092-to-win.",
      "Past champions read like a hall of fame: Austin Banker (2017, 2023), Jesse Riggins (2021), Shay Chavous (2022), and Cameron Carter's 2024 last-lap thriller after five attempts. Winning it is a career-defining moment because the field is stacked and the distance is grueling.",
      "The 2025 program adds a Champions-of-Champions shootout plus family tributes at Paradise. Expect Wayne's family on-site, ceremonial laps, and a packed crowd tuned in on SportsActionTV for the memorial that blends emotion, prestige, and flat-out speed.",
    ],
  },
  {
    title: "Paradise Raceway: Thanksgiving Rumble Home Track",
    summary:
      "South Carolina's karting showplace with a well-groomed dirt oval, fan-first amenities, and family-friendly vibes.",
    body: [
      "Opened in the early 2010s by Henry Moree, the 95/38 Paradise Raceway pairs a red clay surface with modern touches - 180 covered pit sheds, raised spectator walkways, a playground, a small lake, and alcohol-free grounds.",
      "Amenities keep scaling: a VIP lounge, tiled restrooms, safety barrier upgrades, and plans for more VIP suites plus a NASCAR-style scoreboard. The track runs programs on the 2nd and 4th weekends monthly and anchors four marquee events each year, including the Thanksgiving Rumble and Wayne Poole Memorial.",
    ],
  },
];

const highlightVideos = [
  {
    title: "Thanksgiving Rumble Weekend Promo",
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
  title: "Thanksgiving Rumble Weekend | SportsActionTV",
  description:
    "Stream the Thanksgiving Rumble and Wayne Poole Memorial live from Paradise Raceway. Full-weekend coverage on Roku, Fire TV, Apple TV, mobile, and web.",
  openGraph: {
    title: "Thanksgiving Rumble + Wayne Poole Memorial | SportsActionTV",
    description:
      "Watch the Thanksgiving Rumble and Wayne Poole Memorial live from Paradise Raceway. Full-weekend coverage with replays, multi-cam, and TV apps.",
    images: [
      {
        url: "/16-9scheulde.png",
        width: 1200,
        height: 630,
        alt: "Thanksgiving Rumble schedule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanksgiving Rumble + Wayne Poole Memorial | SportsActionTV",
    description:
      "Live coverage of the Thanksgiving Rumble and Wayne Poole Memorial from Paradise Raceway with full replay access.",
    images: ["/16-9scheulde.png"],
  },
};

export default function ThanksgivingRumblePage() {
  return (
    <div className="w-full space-y-16 pb-8">
      <section className="relative w-full min-h-[100svh] overflow-hidden px-0 pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/22 to-black/18 pointer-events-none" />
        <div className="section-shell relative flex h-full flex-col items-center gap-14 text-center">
          <Reveal className="space-y-5 text-white">
            <MotionDiv delay={0.05} className="text-xs uppercase tracking-[0.45em] text-white/75">
              Thanksgiving weekend - Paradise Raceway
            </MotionDiv>
            <MotionDiv delay={0.12}>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Thanksgiving Rumble + Wayne Poole Memorial
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.18}>
              <p className="max-w-4xl text-white/85">
                Two nights of high-banked karting from Sellers, SC - streamed live on SportsActionTV. Grab a monthly pass,
                send it to the big screen, and catch every lap, memorial ceremony, and fireworks show.
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
                      stat.label === "Headliner"
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
                src="/cart-racer.png"
                alt="Wayne Poole Memorial"
                fill
                sizes="100vw"
                className="object-cover object-[50%_35%] brightness-[1.2] transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            </div>
            <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Wayne Poole Memorial
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  51 laps
                </span>
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  $20,092-to-win
                </span>
              </div>
              <h3 className="text-[clamp(2.2rem,3.2vw,3rem)] font-semibold drop-shadow-lg">Legacy race of the Rumble weekend.</h3>
              <p className="max-w-4xl text-base text-white/90">
                Friday-night headline with ceremonial laps, Wayne&apos;s family on-site, and a field stacked with past champions. Tap below to read the full memorial story.
              </p>
              <div className="grid w-full gap-3 text-sm text-white/90 md:grid-cols-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Champions of Champions shootout
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  51 laps - $20,092 purse
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-center font-medium">
                  Career-defining winners
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="#stories">Read the memorial story</Link>
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
                  alt="Thanksgiving Rumble"
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
                alt="Thanksgiving Rumble weekend"
                fill
                sizes="100vw"
                className="object-cover object-[50%_20%] brightness-[1.15] transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            </div>
            <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-center gap-3 text-black">
                <span className="rounded-full bg-yellow-300/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                  Thanksgiving Rumble
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
            Tap to open the Rumble overview, Wayne Poole Memorial details, and Paradise Raceway background.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {storySections.map((section) => (
            <Reveal
              key={section.title}
              className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/65 shadow-[0_20px_65px_rgba(0,0,0,0.4)]"
            >
              <details className="group" open={section.title.includes("Wayne Poole Memorial")}>
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
              <h3 className="text-3xl font-semibold">Grab the monthly pass and lock in the Rumble weekend.</h3>
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
                alt="Thanksgiving Rumble schedule"
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
