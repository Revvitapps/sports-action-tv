import { useEffect, useRef } from "react";

type RaceAdPlayerProps = {
  src: string;
  type?: "hls" | "mp4";
  vastTagUrl?: string;
  className?: string;
};

declare global {
  interface Window {
    initRacePlayer?: (root: HTMLElement | null, options?: {
      mainSrc?: string;
      mainType?: string;
      vastTagUrl?: string;
    }) => void;
  }
}

const ensureStyle = () => {
  if (document.querySelector("link[data-race-player-style]")) {
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/styles.css";
  link.dataset.racePlayerStyle = "true";
  document.head.appendChild(link);
};

const ensureScript = () =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector("script[data-race-player-script]")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "/player.js";
    script.async = true;
    script.dataset.racePlayerScript = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load player.js"));
    document.body.appendChild(script);
  });

export default function RaceAdPlayer({ src, type = "hls", vastTagUrl, className }: RaceAdPlayerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    let isMounted = true;
    ensureStyle();
    ensureScript()
      .then(() => {
        if (!isMounted) {
          return;
        }
        window.initRacePlayer?.(rootRef.current, {
          mainSrc: src,
          mainType: type,
          vastTagUrl,
        });
      })
      .catch((error) => {
        console.error("RaceAdPlayer init failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [src, type, vastTagUrl]);

  return (
    <div className={className}>
      <div className="player-container" data-race-player ref={rootRef}>
        <video
          className="main-video"
          data-role="main-video"
          playsInline
          muted
          preload="metadata"
        ></video>

        <div className="ad-overlay hidden mode-pip" data-role="ad-overlay" aria-hidden="true">
          <div className="ad-badge">Sponsored</div>
          <div className="ad-container" data-role="ad-container">
            <video className="ad-video" data-role="ad-video" playsInline muted></video>
            <a className="ad-fallback hidden" data-role="ad-fallback" href="#" target="_blank" rel="noreferrer">
              <span className="ad-fallback-title">YOUR BRAND HERE</span>
              <span className="ad-fallback-subtitle">CONTACT US</span>
            </a>
          </div>
        </div>

        <button className="tap-to-play hidden" type="button" data-role="tap-to-play">Tap to Play</button>
      </div>
    </div>
  );
}
