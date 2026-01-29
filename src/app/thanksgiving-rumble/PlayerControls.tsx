"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerControlsProps = {
  showCameras?: boolean;
  cameraSources?: {
    driver?: string;
    cam1?: string;
    cam2?: string;
  };
  className?: string;
};

const getPlayerRoot = (scope?: HTMLElement | null) => {
  const root = scope?.querySelector?.("[data-race-player]") as HTMLElement | null;
  return root ?? (document.querySelector("[data-race-player]") as HTMLElement | null);
};

export default function PlayerControls({
  showCameras = false,
  cameraSources,
  className,
}: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const lastVolumeRef = useRef(0.6);
  const [inView, setInView] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const root = getPlayerRoot(host);
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
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const root = getPlayerRoot(host);
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

  const hidden = !inView && !isFullscreen;
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  const bumpControls = () => {
    setControlsVisible(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, 2500);
  };

  useEffect(() => {
    bumpControls();
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const target = host ?? document;
    const handleActivity = () => bumpControls();
    target.addEventListener("mousemove", handleActivity);
    target.addEventListener("touchstart", handleActivity, { passive: true });
    target.addEventListener("touchmove", handleActivity, { passive: true });
    target.addEventListener("wheel", handleActivity, { passive: true });
    target.addEventListener("keydown", handleActivity);
    return () => {
      target.removeEventListener("mousemove", handleActivity);
      target.removeEventListener("touchstart", handleActivity);
      target.removeEventListener("touchmove", handleActivity);
      target.removeEventListener("wheel", handleActivity);
      target.removeEventListener("keydown", handleActivity);
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);
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
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const root = getPlayerRoot(host);
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
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const root = getPlayerRoot(host);
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
    const host = (document.querySelector("[data-player-root]") as HTMLElement | null) ?? null;
    const root = getPlayerRoot(host);
    const wrapper = root?.closest("[data-player-shell]") as HTMLElement | null;
    const target = wrapper || root;
    if (!target) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      target.requestFullscreen?.();
    }
  };

  const handleCamSelect = (src?: string) => {
    if (!src) {
      return;
    }
    const resolvedType = src.endsWith(".m3u8") ? "hls" : "mp4";
    window.RacePlayer?.setAltView?.({
      src,
      type: resolvedType,
      position: "bottom-right",
    });
    if (!isPlaying) {
      window.RacePlayer?.play?.();
    }
  };

  return (
    <div
      className={cn(
        "absolute bottom-3 left-1/2 z-10 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur transition-opacity -translate-x-1/2",
        hidden && "pointer-events-none opacity-0",
        !controlsVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      <>
          <Button type="button" variant="secondary" onClick={handlePlayPause} className="h-8 px-3 text-[11px] uppercase tracking-[0.2em]">
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
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
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
          <Button type="button" variant="outline" onClick={handleFullscreenToggle} className="h-8 px-3 text-[11px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M5 9V5h4M19 9V5h-4M5 15v4h4M19 15v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M9 9l-4-4M15 9l4-4M9 15l-4 4M15 15l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              </svg>
              <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            </span>
          </Button>
        {showCameras && (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleCamSelect(cameraSources?.driver)}
              disabled={!cameraSources?.driver}
              className="h-8 px-3 text-[11px] uppercase tracking-[0.2em]"
            >
              Driver Cam
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleCamSelect(cameraSources?.cam1)}
              disabled={!cameraSources?.cam1}
              className="h-8 px-3 text-[11px] uppercase tracking-[0.2em]"
            >
              Cam 1
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleCamSelect(cameraSources?.cam2)}
              disabled={!cameraSources?.cam2}
              className="h-8 px-3 text-[11px] uppercase tracking-[0.2em]"
            >
              Cam 2
            </Button>
          </>
        )}
      </>
    </div>
  );
}
