'use client';

import { useState } from "react";
import Image from "next/image";
import { brandAssets } from "@/lib/site";

export function BackgroundMedia() {
  const [showImage, setShowImage] = useState(!brandAssets.heroVideo);
  const imageSrc = brandAssets.heroBackdrop ?? brandAssets.trackBackground;

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {showImage || !brandAssets.heroVideo ? (
        <Image
          src={imageSrc}
          alt="SportsActionTV background"
          fill
          sizes="100vw"
          priority
          className="object-cover brightness-[1.4]"
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          poster={imageSrc}
          style={{ filter: "brightness(1.45)" }}
          onEnded={() => setShowImage(true)}
          onError={() => setShowImage(true)}
        >
          <source src={brandAssets.heroVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.3)_35%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
