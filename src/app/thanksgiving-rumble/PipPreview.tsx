"use client";

import RaceAdPlayer from "../../../RaceAdPlayer";
import PlayerControls from "./PlayerControls";

type PipPreviewProps = {
  src: string;
  type: "hls" | "mp4";
  pipSrc: string;
  pipType: "hls" | "mp4";
  vastTagUrl?: string;
};

export default function PipPreview({ src, type, pipSrc, pipType, vastTagUrl }: PipPreviewProps) {
  const cameraSources = {
    driver: "/chili-bowl-promo2.mp4",
    cam1: "/Chili-Bowl-promo1.mp4",
    cam2: "/player-main.mp4",
  };

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
        <div className="relative" data-player-shell data-player-root>
          <RaceAdPlayer
            src={src}
            type={type}
            vastTagUrl={vastTagUrl}
            className="player-shell"
          />
          <PlayerControls showCameras cameraSources={cameraSources} />
        </div>
      </div>
    </div>
  );
}
