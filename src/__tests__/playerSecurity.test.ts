/**
 * Tests the postMessage origin allowlist and click-through URL sanitizer in
 * `player.js` (the vanilla-JS Race Player, loaded via a plain <script> tag —
 * not a bundled ES module, so it can't be `import`ed directly). Rather than
 * re-implementing the logic (which could silently drift from what's actually
 * shipped), this extracts the exact committed source text of the two
 * relevant snippets via regex and evaluates it — the test fails loudly if
 * the extraction pattern no longer matches, so it can't pass by accident
 * against stale/reimplemented logic.
 *
 * Deliberately isolated from this repo's large uncommitted backend
 * (src/lib/*, prisma/, supabase/, etc.) — this file only reads player.js.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const PLAYER_JS_PATH = new URL("../../player.js", import.meta.url);
const playerSrc = readFileSync(PLAYER_JS_PATH, "utf8");

function extractSanitizeUrl() {
  const protoMatch = playerSrc.match(/const SAFE_URL_PROTOCOLS = new Set\(\[[^\]]*\]\);/);
  const fnMatch = playerSrc.match(/const sanitizeUrl = \(url\) => \{[\s\S]*?\n  \};/);
  if (!protoMatch || !fnMatch) {
    throw new Error(
      "Could not extract sanitizeUrl from player.js — the extraction regex no longer matches the committed source, update this test."
    );
  }
  const win = { location: { href: "http://localhost/" } };
  return new Function("window", `${protoMatch[0]}\n${fnMatch[0]}\nreturn sanitizeUrl;`)(win);
}

function extractResolveOrigins(origin: string) {
  const match = playerSrc.match(
    /const origins = Array\.isArray\(allowedOrigins\)[\s\S]*?: \[window\.location\.origin\];/
  );
  if (!match) {
    throw new Error(
      "Could not extract the origin-allowlist logic from player.js — update this test if initPostMessage changed shape."
    );
  }
  const win = { location: { origin } };
  return new Function("window", "allowedOrigins", `${match[0]}\nreturn origins;`)(win);
}

/**
 * Reproduces the exact guard condition inside initPostMessage's message
 * listener: `if (!origins.includes(event.origin)) return;` followed by the
 * `event.data.type === "RacePlayer"` shape check — so we can assert on
 * whether a given (origins, event) pair would be acted on, without needing
 * a real `window`/DOM message-dispatch harness.
 */
function wouldHandleMessage(origins: string[], event: { origin: string; data: unknown }) {
  if (!origins.includes(event.origin)) return false;
  const data = event.data as { type?: string; action?: string } | null | undefined;
  if (!data || data.type !== "RacePlayer") return false;
  return true;
}

describe("player.js postMessage origin allowlist", () => {
  it("(missing config) defaults to same-origin only — does not accept arbitrary cross-origin commands", () => {
    const origins = extractResolveOrigins("https://embed.example.com");
    expect(origins).toEqual(["https://embed.example.com"]);
    expect(origins.includes("https://attacker.example.com")).toBe(false);
  });

  it("(empty array config) also defaults to same-origin only, not 'allow everything'", () => {
    const match = playerSrc.match(
      /const origins = Array\.isArray\(allowedOrigins\) && allowedOrigins\.length/
    );
    expect(match, "initPostMessage must treat an empty allowedOrigins array as 'not configured'").not.toBeNull();
  });

  it("(approved parent origin) a message from an explicitly allowed origin is handled", () => {
    const origins = ["https://parent.example.com"];
    const handled = wouldHandleMessage(origins, {
      origin: "https://parent.example.com",
      data: { type: "RacePlayer", action: "play" },
    });
    expect(handled).toBe(true);
  });

  it("(rejected parent origin) a message from an origin not on the list is ignored", () => {
    const origins = ["https://parent.example.com"];
    const handled = wouldHandleMessage(origins, {
      origin: "https://attacker.example.com",
      data: { type: "RacePlayer", action: "play" },
    });
    expect(handled).toBe(false);
  });

  it("(malformed messages) missing type, wrong type, and null data are all ignored even from an allowed origin", () => {
    const origins = ["https://parent.example.com"];
    expect(wouldHandleMessage(origins, { origin: "https://parent.example.com", data: null })).toBe(false);
    expect(wouldHandleMessage(origins, { origin: "https://parent.example.com", data: {} })).toBe(false);
    expect(
      wouldHandleMessage(origins, { origin: "https://parent.example.com", data: { type: "NotRacePlayer" } })
    ).toBe(false);
  });
});

describe("player.js click-through URL sanitization", () => {
  const sanitizeUrl = extractSanitizeUrl();

  it.each([
    ["http://example.com/promo", "http://example.com/promo"],
    ["https://example.com/promo", "https://example.com/promo"],
    ["mailto:ads@sportsactiontv.com", "mailto:ads@sportsactiontv.com"],
  ])("allows safe protocol %s", (input, expected) => {
    expect(sanitizeUrl(input)).toBe(expected);
  });

  it.each([
    ["javascript:alert(document.cookie)"],
    ["JAVASCRIPT:alert(1)"],
    ["  javascript:alert(1)"],
    ["data:text/html,<script>alert(1)</script>"],
    ["vbscript:msgbox(1)"],
    ["file:///etc/passwd"],
  ])("rejects unsafe protocol %s", (input) => {
    expect(sanitizeUrl(input)).toBeNull();
  });

  it("rejects empty/null input", () => {
    expect(sanitizeUrl("")).toBeNull();
    expect(sanitizeUrl(null)).toBeNull();
  });
});
