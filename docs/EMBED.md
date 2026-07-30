# SportsActionTV Embeddable Player

A drop-in video player that keeps the main stream playing while running a
picture-in-picture (PiP) camera and quarter-screen / PiP **VAST overlay ads**.
Plays **HLS** (`.m3u8`) and **MP4**. Configure entirely by URL — no build step,
no SDK.

There are two ways to embed, backed by the **same** player engine
(`/player.js` + `/styles.css`):

| Surface | URL | Best for |
| --- | --- | --- |
| **Static file** | `/embed.html` | Third-party sites, CMS blocks, email CTAs. Zero framework. |
| **App route** | `/embed` | Same features **plus** cross-origin `postMessage` control via `allow=`. |

Both render **chromeless and full-bleed** — the player fills the entire iframe.

---

## Quick start

```html
<iframe
  src="https://subscribe.sportsactiontv.com/embed.html?src=https://example.com/stream.m3u8&type=hls"
  width="960"
  height="540"
  style="border:0;aspect-ratio:16/9;width:100%;max-width:960px"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>
```

Swap `embed.html` for `embed` to use the Next route:

```html
<iframe
  src="https://subscribe.sportsactiontv.com/embed?src=https://example.com/stream.m3u8&type=hls"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>
```

> Playback starts **muted** (browser autoplay policy). The viewer taps once to
> unmute; the player exposes `unmute()` via the operator API below.

---

## Query parameters

| Param | Values | Default | Description |
| --- | --- | --- | --- |
| `src` | URL | — (**required**) | Main stream. `.m3u8` → HLS, otherwise MP4. |
| `type` | `hls` \| `mp4` | inferred from `src` | Force the main stream type. |
| `pip` | URL | *off* | Secondary camera for the PiP window. Presence of this param **enables PiP**. |
| `pipType` | `hls` \| `mp4` | inferred from `pip` | Force the PiP stream type. |
| `pipSize` | `default` \| `large` | `default` | PiP window size. |
| `vast` | URL | *off* | VAST tag URL. Auto-triggers a PiP overlay ad on load. |
| `allow` | comma-separated origins | same-origin only | **`/embed` route only.** Origins allowed to send `postMessage` commands (see below). Malformed values are ignored. |

**Enable PiP + a VAST ad:**

```
/embed?src=https://example.com/main.m3u8&type=hls&pip=https://example.com/cam2.m3u8&pipSize=large&vast=https://ads.example.com/vast.xml
```

---

## Operator API (`window.RacePlayer`)

Available on the page hosting the player (e.g. inside the iframe, or from the
parent via `postMessage` — see next section):

```js
window.RacePlayer.play();
window.RacePlayer.pause();
window.RacePlayer.mute();
window.RacePlayer.unmute();           // returns a Promise<{ ok, reason? }>
window.RacePlayer.triggerAd({
  mode: "pip",                        // "pip" | "quarter"
  vastTagUrl: "https://ads.example.com/vast.xml",
  durationSec: 15,
  clickThroughUrl: "https://sportsactiontv.com",
});
window.RacePlayer.clearAd();
window.RacePlayer.setSchedule([
  { atSec: 60,  mode: "pip",     vastTagUrl: "...", durationSec: 15 },
  { atSec: 180, mode: "quarter", vastTagUrl: "...", durationSec: 20 },
]);
window.RacePlayer.setAltView({ src: "https://example.com/cam2.m3u8", type: "hls" });
window.RacePlayer.clearAltView();
window.RacePlayer.setPipSize("large");
```

## Cross-origin control via `postMessage`

For security, the player **only** acts on `postMessage` commands from origins
you explicitly allow. Same-origin is always allowed. To control a cross-origin
embed, use the `/embed` route and list your site in `allow`:

```
/embed?src=...&allow=https://your-site.com
```

Then, from `https://your-site.com`:

```js
const frame = document.querySelector("iframe").contentWindow;
frame.postMessage(
  { type: "RacePlayer", action: "triggerAd", payload: { mode: "pip", vastTagUrl: "https://ads.example.com/vast.xml", durationSec: 15 } },
  "https://subscribe.sportsactiontv.com"
);
```

Supported actions: `play`, `pause`, `mute`, `unmute`, `triggerAd`, `clearAd`.
Messages from any origin not in the allowlist are ignored. Click-through URLs
in ad payloads are sanitized to `http(s)` only.

> The static `/embed.html` file uses same-origin `postMessage` only. Use the
> `/embed` route whenever the embedding site is on a different origin.

---

## Notes & limits

- **Autoplay** requires a muted start (all modern browsers). The player handles
  this and surfaces a tap-to-unmute affordance.
- **HLS** uses the browser's native HLS where available; see `player.js` for the
  loading path.
- The player is **responsive** and fills its iframe; set the iframe's own
  dimensions / `aspect-ratio` to control layout.
- Send `allow`/`fullscreen`/`picture-in-picture` in the iframe `allow` attribute
  so fullscreen and native PiP work.
