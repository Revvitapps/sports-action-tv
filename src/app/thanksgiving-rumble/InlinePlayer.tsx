"use client";

import RaceAdPlayer from "../../../RaceAdPlayer";
import { Button } from "@/components/ui/button";

const MAIN_SRC = "/player-main.mp4";
const PIP_SRC = "/player-pip.mp4";

export default function InlinePlayer() {
  return (
    <div className="w-full">
      <RaceAdPlayer
        src={MAIN_SRC}
        type="mp4"
        pipSrc={PIP_SRC}
        pipType="mp4"
        className="player-shell mx-auto"
      />
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
      </div>
    </div>
  );
}
