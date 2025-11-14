import Reveal from "@/components/Reveal";
import Image from "next/image";
import { brandAssets } from "@/lib/site";

const eventSpotlights = [
  {
    name: "Red Clay Rumble",
    location: "Lake View Motor Speedway · SC",
    timeframe: "May 25 · 8P ET",
    surface: "Dirt sprint",
    purse: "$30K to win",
    package: "Weekend PPV",
    detail: "Sunset dust clouds, flame cannons, and championship trophy lifts—stream it like you&apos;re leaning on the fence.",
    image: brandAssets.trackBackground,
  },
  {
    name: "Midnight Drift Showdown",
    location: "Tri-County Kartplex · NC",
    timeframe: "Jun 7 · 9P ET",
    surface: "Kart night",
    purse: "Paddock sellout",
    package: "Crew access",
    detail: "Glow-strips under every kart, helmet-cam switchers, and radio chatter so you never miss the late apex.",
    image: brandAssets.kartWheel,
  },
  {
    name: "Stadium Lights 500",
    location: "East Coast Open Wheel Series",
    timeframe: "Jul 4 · 10P ET",
    surface: "Open wheel",
    purse: "$100K weekend",
    package: "All-access",
    detail: "Primetime sprints with crowd roars, super slow-mo replays, and garage interviews pumped straight to your TV.",
    image: brandAssets.cameraRig,
  },
];

export function EventShowcaseSection() {
  return (
    <section id="events" className="section-shell space-y-8">
      <Reveal className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Race-week energy</p>
        <h2 className="text-3xl font-semibold text-white">Build cards that feel like a live truck feed.</h2>
        <p className="text-muted-foreground">
          These are the kinds of cards queuing up inside SportsActionTV every week—burnouts, kart shootouts, and open-wheel marathons with the same energy you see on DirtVision, RacinDirt, and FloSports.
        </p>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-3">
        {eventSpotlights.map((event) => (
          <Reveal
            key={event.name}
            className="group relative flex min-h-[700px] flex-col overflow-hidden rounded-[3rem] border border-white/15 bg-black/60 shadow-[0_30px_90px_rgba(0,0,0,0.4)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_45px_120px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0">
              <Image
                src={event.image}
                alt={event.name}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover brightness-125 transition duration-500 group-hover:scale-105 group-hover:brightness-150"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/80" />
            </div>
            <div className="relative flex h-full flex-col gap-6 p-10 text-center text-white">
              <div className="space-y-3">
                <div className="flex flex-col gap-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
                  <span>{event.surface}</span>
                  <span>{event.timeframe}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-semibold">{event.name}</h3>
                  <p className="text-sm text-white/80">{event.location}</p>
                </div>
              </div>
              <div className="mt-auto space-y-3 text-sm text-white/85">
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/25 bg-black/50 px-4 py-4 text-white">
                  <div className="text-lg font-semibold">{event.purse}</div>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary/90">{event.package}</span>
                </div>
                <p>{event.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
