"use client";

import { useSearchParams } from "next/navigation";

import RaceAdPlayer from "../../../RaceAdPlayer";

const FALLBACK_SRC = "/player-main.mp4";
const FALLBACK_PIP = "/player-pip.mp4";

type AllowedType = "hls" | "mp4";

const getType = (src: string, typeParam: string | null): AllowedType => {
  if (typeParam === "hls" || typeParam === "mp4") {
    return typeParam;
  }
  return src.endsWith(".m3u8") ? "hls" : "mp4";
};

export default function ClientPlayer() {
  const searchParams = useSearchParams();
  const src = searchParams.get("src") ?? FALLBACK_SRC;
  const type = getType(src, searchParams.get("type"));
  const pipSrc = searchParams.get("pip") ?? FALLBACK_PIP;
  const pipType = getType(pipSrc, searchParams.get("pipType"));
  const vastTagUrl = searchParams.get("vast") ?? undefined;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">SportsActionTV</p>
          <h1 className="text-3xl md:text-4xl font-semibold">Live Player Preview</h1>
          <p className="text-sm text-white/70">
            Lightweight player endpoint for email deliverability testing.
          </p>
        </div>
        <RaceAdPlayer
          src={src}
          type={type}
          pipSrc={pipSrc}
          pipType={pipType}
          vastTagUrl={vastTagUrl}
          className="player-shell"
        />
      </div>
    </div>
  );
}
