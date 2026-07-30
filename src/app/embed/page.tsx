import type { Metadata } from "next";
import { Suspense } from "react";

import EmbedPlayer from "./EmbedPlayer";

// The embed surface is a product endpoint meant to be iframed by third
// parties, not indexed or crawled as a page.
export const metadata: Metadata = {
  title: "SportsActionTV Player",
  robots: { index: false, follow: false },
};

// This page is deliberately chromeless: it renders inside the app's root
// layout, so the scoped CSS below covers the site header/footer/background
// with an opaque, viewport-filling stage. That keeps the iframe output to
// just the player, without a second root layout to maintain.
const embedStyles = `
  html, body { background: #000 !important; overflow: hidden !important; }
  .embed-stage {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    background: #000;
    display: grid;
    place-items: center;
  }
  .embed-shell { width: 100%; height: 100%; }
  .embed-shell .player-container {
    width: 100%;
    height: 100%;
    max-width: none;
    aspect-ratio: auto;
    border-radius: 0;
    box-shadow: none;
  }
  .embed-message {
    color: #f5f5f5;
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 24px;
    line-height: 1.6;
  }
  .embed-message code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
  }
`;

export default function EmbedPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: embedStyles }} />
      <Suspense
        fallback={
          <div className="embed-stage embed-message">
            <p>Loading player&hellip;</p>
          </div>
        }
      >
        <EmbedPlayer />
      </Suspense>
    </>
  );
}
