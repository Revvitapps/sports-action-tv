"use client";

import RaceAdPlayer from "../../../RaceAdPlayer";
import PlayerControls from "./PlayerControls";

const MAIN_SRC = "/crashes.mp4";
const CAMERA_SOURCES = {
  driver: "/modified-mafia.mp4",
  cam1: "/Chili-Bowl-promo1.mp4",
  cam2: "/player-main.mp4",
};

export default function InlinePlayer() {
  return (
    <div className="relative w-full" data-player-shell data-player-root>
      <RaceAdPlayer
        src={MAIN_SRC}
        type="mp4"
        pipSrc={CAMERA_SOURCES.driver}
        pipType="mp4"
        pipSize="large"
        className="player-shell mx-auto"
      />
      <PlayerControls showCameras cameraSources={CAMERA_SOURCES} />
    </div>
  );
}
