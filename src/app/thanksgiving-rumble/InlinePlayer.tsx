"use client";

import RaceAdPlayer from "../../../RaceAdPlayer";
import PlayerControls from "./PlayerControls";

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
      <PlayerControls showCameras pipSrc={PIP_SRC} pipType="mp4" />
    </div>
  );
}
