"use client";

import { useSearchParams } from "next/navigation";

import RaceAdPlayer from "../../../RaceAdPlayer";

type AllowedType = "hls" | "mp4";

const inferType = (src: string, typeParam: string | null): AllowedType => {
  if (typeParam === "hls" || typeParam === "mp4") {
    return typeParam;
  }
  return src.endsWith(".m3u8") ? "hls" : "mp4";
};

// Parse a comma-separated `allow` param into an explicit postMessage origin
// allowlist. Only well-formed absolute origins are kept; anything else is
// dropped so a malformed value can never widen the allowlist. When empty,
// RaceAdPlayer / player.js falls back to same-origin only.
const parseAllowedOrigins = (raw: string | null): string[] | undefined => {
  if (!raw) return undefined;
  const origins = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => {
      try {
        // Reject anything that isn't a bare scheme://host[:port] origin.
        return new URL(value).origin === value;
      } catch {
        return false;
      }
    });
  return origins.length ? origins : undefined;
};

export default function EmbedPlayer() {
  const searchParams = useSearchParams();

  const src = searchParams.get("src") ?? "";
  const type = inferType(src, searchParams.get("type"));

  // PiP is opt-in: pass `pip=<url>` to enable the picture-in-picture camera.
  const pipSrc = searchParams.get("pip") ?? searchParams.get("pipSrc") ?? undefined;
  const pipType = pipSrc ? inferType(pipSrc, searchParams.get("pipType")) : undefined;
  const pipSizeParam = searchParams.get("pipSize");
  const pipSize = pipSizeParam === "large" ? "large" : "default";

  const vastTagUrl = searchParams.get("vast") ?? undefined;
  const allowedOrigins = parseAllowedOrigins(searchParams.get("allow"));

  if (!src) {
    return (
      <div className="embed-stage embed-message">
        <p>
          Missing <code>src</code>. Add a stream URL, e.g.
          <br />
          <code>/embed?src=https://example.com/stream.m3u8&amp;type=hls</code>
        </p>
      </div>
    );
  }

  return (
    <div className="embed-stage">
      <RaceAdPlayer
        src={src}
        type={type}
        pipSrc={pipSrc}
        pipType={pipType}
        pipSize={pipSize}
        vastTagUrl={vastTagUrl}
        allowedOrigins={allowedOrigins}
        className="embed-shell"
      />
    </div>
  );
}
