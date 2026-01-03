# Race Broadcast Player (Static)

Production-ready static player that keeps the main race stream playing while running PiP or quarter-screen overlay ads via Google IMA.

## Files
- `index.html`
- `styles.css`
- `player.js`
- `RaceAdPlayer.tsx` (optional Next.js wrapper)

## Query Params
- `src`: main stream URL
- `type`: `hls` or `mp4` (optional; inferred from `.m3u8`)
- `vast`: optional VAST tag URL to auto-trigger a PiP ad on load

Example:
```
https://YOUR.pages.dev/?src=https://example.com/stream.m3u8&type=hls
```

## Operator API (Browser Console)
```
window.RacePlayer.play()
window.RacePlayer.pause()
window.RacePlayer.mute()
window.RacePlayer.unmute()
window.RacePlayer.triggerAd({
  mode: 'pip' | 'quarter',
  vastTagUrl: 'https://example.com/vast',
  durationSec: 15,
  clickThroughUrl: 'https://sportsactiontv.com'
})
window.RacePlayer.clearAd()
window.RacePlayer.setSchedule([
  { atSec: 60, mode: 'pip', vastTagUrl: 'https://example.com/vast', durationSec: 15 },
  { atSec: 180, mode: 'quarter', vastTagUrl: 'https://example.com/vast', durationSec: 20 }
])
window.RacePlayer.setAltView({
  src: 'https://example.com/cam2.m3u8',
  type: 'hls',
  position: 'bottom-right'
})
window.RacePlayer.clearAltView()
```
Alt view audio is always muted.

Event hooks (console logging is default):
```
window.RacePlayer.on('onMainPlay', () => {})
window.RacePlayer.on('onMainPause', () => {})
window.RacePlayer.on('onMainError', (err) => {})
window.RacePlayer.on('onAdRequest', (payload) => {})
window.RacePlayer.on('onAdStart', () => {})
window.RacePlayer.on('onAdComplete', () => {})
window.RacePlayer.on('onAdError', (err) => {})
window.RacePlayer.on('onAdClick', () => {})
```

## Fallback Ad
If no VAST tag is provided or an error occurs, a clickable placeholder panel appears:
- “YOUR BRAND HERE”
- “CONTACT US”

Defaults to `mailto:ads@sportsactiontv.com` or uses `clickThroughUrl` if provided.

## Wix Embed Instructions
Recommended iframe snippet:
```
<iframe
  src="https://YOUR.pages.dev/?src=STREAM_URL&type=hls"
  style="width:100%; aspect-ratio:16/9; border:0;"
  allow="autoplay; encrypted-media; picture-in-picture"
></iframe>
```

## postMessage Control (Optional)
From the parent page:
```
iframeEl.contentWindow.postMessage({
  type: 'RacePlayer',
  action: 'triggerAd',
  payload: { mode: 'pip', vastTagUrl: 'https://example.com/vast', durationSec: 15 }
}, '*')
```
Supported actions: `play`, `pause`, `mute`, `unmute`, `triggerAd`, `clearAd`.

## Cloudflare Pages Deployment (Static Upload)
1. Build folder: this repo root containing `index.html`, `styles.css`, `player.js`.
2. In Cloudflare Pages, create a new project and select “Direct Upload”.
3. Upload the three static files.
4. Use the generated `*.pages.dev` URL in your Wix iframe.

## Local Testing
1. Start a static server in the repo root:
   - `npx serve .`
   - or `python3 -m http.server 8080`
2. Open `http://localhost:8080/?src=YOUR_STREAM_URL&type=hls`.

## Notes
- Main stream attempts autoplay muted; if blocked, a “Tap to Play” overlay appears.
- Tap to Play also unmutes the main stream.
- IMA and hls.js load dynamically from CDNs.
- Ads render inside the overlay container while the main video continues playing.
- Splash intro uses `/public/SportsActionCrash.mp4` and falls back to `/public/hero-image.png`.
- og:image points at the Pages domain; update it when you move to a custom domain.

## Next.js Wrapper (Optional)
`RaceAdPlayer.tsx` expects `player.js` and `styles.css` to be served from `/public` in your Next.js app. Copy those files into `public/` and then render the component:
```
<RaceAdPlayer src=\"https://example.com/stream.m3u8\" type=\"hls\" vastTagUrl=\"https://example.com/vast\" />
```
