import { useEffect, useRef } from "react";

type RaceAdPlayerProps = {
  src: string;
  type?: "hls" | "mp4";
  pipSrc?: string;
  pipType?: "hls" | "mp4";
  pipPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
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
    RacePlayer?: {
      setAltView?: (options: { src: string; type?: string; position?: string }) => void;
      clearAltView?: () => void;
    };
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

export default function RaceAdPlayer({
  src,
  type = "hls",
  pipSrc,
  pipType,
  pipPosition = "bottom-right",
  vastTagUrl,
  className,
}: RaceAdPlayerProps) {
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
        const initPromise = window.initRacePlayer?.(rootRef.current, {
          mainSrc: src,
          mainType: type,
          vastTagUrl,
        });
        Promise.resolve(initPromise)
          .then(() => {
            if (!isMounted || !pipSrc) {
              return;
            }
            const resolvedType = pipType ?? (pipSrc.endsWith(".m3u8") ? "hls" : "mp4");
            window.RacePlayer?.setAltView?.({
              src: pipSrc,
              type: resolvedType,
              position: pipPosition,
            });
          })
          .catch(() => {});
      })
      .catch((error) => {
        console.error("RaceAdPlayer init failed", error);
      });

    return () => {
      isMounted = false;
      window.RacePlayer?.clearAltView?.();
    };
  }, [src, type, pipSrc, pipType, pipPosition, vastTagUrl]);

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

        <div className="splash" data-role="splash" aria-hidden="false">
          <video
            className="splash-video"
            data-role="splash-video"
            playsInline
            muted
            preload="auto"
          >
            <source src="/SportsActionCrash.mp4" type="video/mp4" />
          </video>
          <img className="splash-image" data-role="splash-image" src="/hero-image.png" alt="SportsActionTV" />
        </div>

        <div className="view-overlay hidden mode-pip view-bottom-right" data-role="view-overlay" aria-hidden="true">
          <div className="view-container" data-role="view-container">
            <video className="view-video" data-role="view-video" playsInline muted></video>
          </div>
          <button
            className="pip-toggle"
            type="button"
            data-role="pip-toggle"
            aria-label="Minimize picture-in-picture"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pip-toggle-icon">
              <path d="M7 7h10v10H7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9 15l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M11 9h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

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
