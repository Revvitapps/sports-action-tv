"use client";

import { useState } from "react";
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
  const [minimized, setMinimized] = useState(false);

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
        {minimized ? (
          <div className="mx-auto flex min-h-[180px] w-full max-w-4xl items-center justify-center rounded-2xl border border-white/15 bg-black/60 text-center text-sm text-white/70">
            Player minimized.
          </div>
        ) : (
          <RaceAdPlayer
            src={src}
            type={type}
            pipSrc={pipSrc}
            pipType={pipType}
            vastTagUrl={vastTagUrl}
            className="player-shell"
          />
        )}
        <PlayerControls
          showCameras
          showMinimize
          minimized={minimized}
          onToggleMinimize={() => setMinimized((prev) => !prev)}
        />
      </div>
    </div>
  );
}
