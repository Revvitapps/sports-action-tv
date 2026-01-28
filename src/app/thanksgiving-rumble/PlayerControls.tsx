"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerControlsProps = {
  showCameras?: boolean;
  pipSrc?: string;
  pipType?: "hls" | "mp4";
};

const getPlayerRoot = () => document.querySelector("[data-race-player]") as HTMLElement | null;

export default function PlayerControls({
  showCameras = false,
  pipSrc,
  pipType,
}: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const lastVolumeRef = useRef(0.6);
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
      setVolume(video.volume);
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
  const volumeBars = useMemo(() => {
    if (isMuted) {
      return 0;
    }
    return Math.max(0, Math.min(4, Math.round(volume * 4)));
  }, [isMuted, volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.RacePlayer?.pause?.();
    } else {
      window.RacePlayer?.play?.();
    }
  };

  const handleMuteToggle = () => {
    const root = getPlayerRoot();
    const video = root?.querySelector("[data-role='main-video']") as HTMLVideoElement | null;
    if (!video) {
      return;
    }
    if (isMuted) {
      const restoreVolume = lastVolumeRef.current || 0.6;
      video.muted = false;
      video.volume = restoreVolume;
      setIsMuted(false);
      setVolume(restoreVolume);
    } else {
      lastVolumeRef.current = video.volume || 0.6;
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeLevel = (level: number) => {
    const root = getPlayerRoot();
    const video = root?.querySelector("[data-role='main-video']") as HTMLVideoElement | null;
    if (!video) {
      return;
    }
    const nextVolume = Math.max(0, Math.min(1, level));
    lastVolumeRef.current = nextVolume || lastVolumeRef.current;
    video.muted = nextVolume === 0;
    video.volume = nextVolume;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const handleFullscreenToggle = () => {
    const root = getPlayerRoot();
    if (!root) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      root.requestFullscreen?.();
    }
  };

  const handleCamSelect = () => {
    if (!pipSrc) {
      return;
    }
    const resolvedType = pipType ?? (pipSrc.endsWith(".m3u8") ? "hls" : "mp4");
    window.RacePlayer?.setAltView?.({
      src: pipSrc,
      type: resolvedType,
      position: "bottom-right",
    });
  };

  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center justify-center gap-3 transition-opacity",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      <>
        <Button type="button" variant="secondary" onClick={handlePlayPause}>
          <span className="flex items-center gap-2">
            {isPlaying ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
            <span>{controlLabel}</span>
          </span>
        </Button>
        <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
          <button
            type="button"
            className="text-white/90 hover:text-white"
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M4 10v4h4l5 4V6L8 10H4z" />
              {isMuted ? (
                <path d="M16 9l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M16 9c1.5 1.5 1.5 4.5 0 6m2.5-8.5c3 3 3 8 0 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <div className="flex items-end gap-1">
            {[1, 2, 3, 4].map((level) => {
              const active = volumeBars >= level;
              const height = 6 + level * 3;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleVolumeLevel(level / 4)}
                  className={cn(
                    "w-1.5 rounded-sm transition",
                    active ? "bg-white" : "bg-white/30"
                  )}
                  style={{ height }}
                  aria-label={`Set volume ${level}`}
                />
              );
            })}
          </div>
        </div>
        <Button type="button" variant="outline" onClick={handleFullscreenToggle}>
          <span className="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </span>
        </Button>
        {showCameras && (
          <>
            <Button type="button" variant="secondary" onClick={handleCamSelect} disabled={!pipSrc}>
              Driver Cam
            </Button>
            <Button type="button" variant="secondary" onClick={handleCamSelect} disabled={!pipSrc}>
              Cam 1
            </Button>
            <Button type="button" variant="secondary" onClick={handleCamSelect} disabled={!pipSrc}>
              Cam 2
            </Button>
          </>
        )}
      </>
    </div>
  );
}
