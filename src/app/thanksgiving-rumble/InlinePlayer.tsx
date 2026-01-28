"use client";

import { useState } from "react";
import RaceAdPlayer from "../../../RaceAdPlayer";
import { Button } from "@/components/ui/button";

const MAIN_SRC = "/player-main.mp4";
const PIP_SRC = "/player-pip.mp4";

export default function InlinePlayer() {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="w-full">
      {!minimized ? (
        <RaceAdPlayer
          src={MAIN_SRC}
          type="mp4"
          pipSrc={PIP_SRC}
          pipType="mp4"
          className="player-shell mx-auto"
        />
      ) : (
        <div className="mx-auto flex min-h-[180px] w-full max-w-4xl items-center justify-center rounded-2xl border border-white/15 bg-black/60 text-center text-sm text-white/70">
          Player minimized.
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" variant="secondary">
          Driver Cam
        </Button>
        <Button type="button" variant="secondary">
          Cam 1
        </Button>
        <Button type="button" variant="secondary">
          Cam 2
        </Button>
        <Button type="button" variant="outline" onClick={() => setMinimized((prev) => !prev)}>
          {minimized ? "Restore player" : "Minimize player"}
        </Button>
      </div>
    </div>
  );
}
