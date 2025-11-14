import Image from "next/image";
import Reveal from "@/components/Reveal";
import { streamingPlatforms } from "@/lib/site";

export function BroadcastPartnersSection() {
  return (
    <section className="section-shell space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-black/70 p-6">
      <Reveal className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Broadcast surface</p>
        <h2 className="text-2xl font-semibold text-white">Watch wherever you cheer.</h2>
        <p className="text-muted-foreground">
          Fire it up on your phone in the pits, toss it to the living-room TV for the feature, or keep a laptop feed open for
          onboard cams—SportsActionTV plays nice with every screen in the trailer.
        </p>
      </Reveal>
      <Reveal className="flex flex-wrap items-center justify-center gap-8">
        {streamingPlatforms.map((platform) => (
          <div key={platform.name} className="flex flex-col items-center gap-3">
            <Image
              src={platform.logo}
              alt={platform.name}
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{platform.name}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
