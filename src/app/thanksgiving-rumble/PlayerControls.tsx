"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerControlsProps = {
  showCameras?: boolean;
  showMinimize?: boolean;
  minimized?: boolean;
  onToggleMinimize?: () => void;
};

const getPlayerRoot = () => document.querySelector("[data-race-player]") as HTMLElement | null;

export default function PlayerControls({
  showCameras = false,
  showMinimize = false,
  minimized = false,
  onToggleMinimize,
}: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [inView, setInView] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const root = getPlayerRoot();
    if (!root) {
      return;
    }
    const video = root.querySelector("[data-role='main-video']") as HTMLVideoElement | null;
    if (!video) {
      return;
    }

    const syncState = () => {
      setIsPlaying(!video.paused);
      setIsMuted(video.muted);
    };

    syncState();
    video.addEventListener("play", syncState);
    video.addEventListener("pause", syncState);
    video.addEventListener("volumechange", syncState);

    return () => {
      video.removeEventListener("play", syncState);
      video.removeEventListener("pause", syncState);
      video.removeEventListener("volumechange", syncState);
    };
  }, []);

  useEffect(() => {
    const root = getPlayerRoot();
    if (!root) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    onFullscreenChange();
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const hidden = !inView || isFullscreen;
  const controlLabel = useMemo(() => (isPlaying ? "Pause" : "Play"), [isPlaying]);
  const volumeLabel = useMemo(() => (isMuted ? "Unmute" : "Mute"), [isMuted]);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.RacePlayer?.pause?.();
    } else {
      window.RacePlayer?.play?.();
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      window.RacePlayer?.unmute?.();
    } else {
      window.RacePlayer?.mute?.();
    }
  };

  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center justify-center gap-3 transition-opacity",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      {!minimized && (
        <>
          <Button type="button" variant="secondary" onClick={handlePlayPause}>
            {controlLabel}
          </Button>
          <Button type="button" variant="secondary" onClick={handleMuteToggle}>
            {volumeLabel}
          </Button>
          {showCameras && (
            <>
              <Button type="button" variant="secondary">
                Driver Cam
              </Button>
              <Button type="button" variant="secondary">
                Cam 1
              </Button>
              <Button type="button" variant="secondary">
                Cam 2
              </Button>
            </>
          )}
        </>
      )}
      {showMinimize && onToggleMinimize && (
        <Button type="button" variant="outline" onClick={onToggleMinimize}>
          {minimized ? "Restore player" : "Minimize player"}
        </Button>
      )}
    </div>
  );
}
