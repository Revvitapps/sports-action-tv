(() => {
  const DEFAULT_CONTACT = "mailto:ads@sportsactiontv.com";
  const IMA_SRC = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
  const HLS_SRC = "https://cdn.jsdelivr.net/npm/hls.js@1.5.15";
  const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

  // Rejects javascript:/data:/vbscript: and other script-executing schemes
  // that could be smuggled into a click-through URL (via a VAST tag or a
  // postMessage command), while still allowing normal ad-destination links.
  const sanitizeUrl = (url) => {
    if (!url) return null;
    try {
      const parsed = new URL(url, window.location.href);
      return SAFE_URL_PROTOCOLS.has(parsed.protocol) ? url : null;
    } catch {
      return null;
    }
  };

  const state = {
    root: null,
    mainVideo: null,
    mainHls: null,
    mainSource: null,
    adVideo: null,
    adOverlay: null,
    adContainer: null,
    adFallback: null,
    tapButton: null,
    splash: null,
    splashVideo: null,
    splashComplete: false,
    mainStarted: false,
    viewOverlay: null,
    viewVideo: null,
    viewHls: null,
    viewSource: null,
    adDragHandle: null,
    viewDragHandle: null,
    pipToggle: null,
    viewMinimized: false,
    pipSize: "default",
    viewPosition: "bottom-right",
    adsLoader: null,
    adsManager: null,
    adDisplayContainer: null,
    adActive: false,
    adTimer: null,
    scheduleTimer: null,
    schedule: [],
    userActivated: false,
    activatePlayback: null,
    pendingAd: null,
    pendingView: null,
    mainListenersAttached: false,
    callbacks: {},
  };

  const log = (event, payload) => {
    console.log(`[RacePlayer] ${event}`, payload || "");
  };

  const emit = (event, payload) => {
    log(event, payload);
    const handlers = state.callbacks[event];
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  };

  const on = (event, handler) => {
    if (!state.callbacks[event]) {
      state.callbacks[event] = [];
    }
    state.callbacks[event].push(handler);
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

  const attachHls = async (video, src) => {
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return null;
    }
    await loadScript(HLS_SRC);
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
    return hls;
  };

  const enableDrag = (handle, overlay) => {
    if (!handle || !overlay || !state.root) {
      return;
    }
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const containerRect = state.root.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();
      const offsetX = event.clientX - overlayRect.left;
      const offsetY = event.clientY - overlayRect.top;

      overlay.style.left = `${overlayRect.left - containerRect.left}px`;
      overlay.style.top = `${overlayRect.top - containerRect.top}px`;
      overlay.style.right = "auto";
      overlay.style.bottom = "auto";

      const onMove = (moveEvent) => {
        const nextLeft = moveEvent.clientX - containerRect.left - offsetX;
        const nextTop = moveEvent.clientY - containerRect.top - offsetY;
        const maxLeft = containerRect.width - overlayRect.width;
        const maxTop = containerRect.height - overlayRect.height;
        overlay.style.left = `${Math.max(0, Math.min(nextLeft, maxLeft))}px`;
        overlay.style.top = `${Math.max(0, Math.min(nextTop, maxTop))}px`;
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  };

  const showTapOverlay = () => {
    if (state.tapButton) {
      state.tapButton.classList.remove("hidden");
    }
  };

  const hideTapOverlay = () => {
    if (state.tapButton) {
      state.tapButton.classList.add("hidden");
    }
  };

  const hideSplash = () => {
    if (state.splash) {
      state.splash.classList.add("hidden");
      state.splash.setAttribute("aria-hidden", "true");
    }
  };

  const showSplash = () => {
    if (state.splash) {
      state.splash.classList.remove("hidden");
      state.splash.setAttribute("aria-hidden", "false");
    }
  };

  const setOverlayMode = (mode) => {
    state.adOverlay.classList.remove("mode-pip", "mode-quarter");
    state.adOverlay.classList.add(mode === "quarter" ? "mode-quarter" : "mode-pip");
  };

  const setViewPosition = (position) => {
    if (!state.viewOverlay) {
      return;
    }
    state.viewOverlay.classList.remove(
      "view-bottom-right",
      "view-bottom-left",
      "view-top-right",
      "view-top-left"
    );
    const posClass =
      position === "bottom-left"
        ? "view-bottom-left"
        : position === "top-right"
        ? "view-top-right"
        : position === "top-left"
        ? "view-top-left"
        : "view-bottom-right";
    state.viewOverlay.classList.add(posClass);
    state.viewPosition = position;
  };

  const updatePipToggleState = () => {
    if (!state.pipToggle) {
      return;
    }
    state.pipToggle.disabled = Boolean(state.adActive);
  };

  const setPipSize = (size) => {
    if (!state.root) {
      return;
    }
    const next = size === "large" ? "large" : "default";
    state.pipSize = next;
    state.root.dataset.pipSize = next;
  };

  const setViewVisible = (visible) => {
    if (!state.viewOverlay) {
      return;
    }
    state.viewMinimized = !visible;
    if (state.root) {
      state.root.dataset.pipMinimized = String(state.viewMinimized);
    }
    if (visible) {
      state.viewOverlay.classList.remove("hidden");
      state.viewOverlay.setAttribute("aria-hidden", "false");
      if (state.viewVideo && state.viewVideo.src) {
        state.viewVideo.play().catch(() => {});
      }
    } else {
      state.viewOverlay.classList.add("hidden");
      state.viewOverlay.setAttribute("aria-hidden", "true");
      if (state.viewVideo) {
        state.viewVideo.pause();
      }
    }
  };

  const showOverlay = () => {
    state.adOverlay.classList.remove("hidden");
    state.adOverlay.setAttribute("aria-hidden", "false");
  };

  const hideOverlay = () => {
    state.adOverlay.classList.add("hidden");
    state.adOverlay.setAttribute("aria-hidden", "true");
  };

  const clearAdTimer = () => {
    if (state.adTimer) {
      clearTimeout(state.adTimer);
      state.adTimer = null;
    }
  };

  const clearAdsManager = () => {
    if (state.adsManager) {
      state.adsManager.destroy();
      state.adsManager = null;
    }
  };

  const clearAltView = () => {
    if (state.viewHls) {
      state.viewHls.destroy();
      state.viewHls = null;
    }
    if (state.viewVideo) {
      state.viewVideo.pause();
      state.viewVideo.removeAttribute("src");
      state.viewVideo.load();
    }
    if (state.viewOverlay) {
      state.viewOverlay.classList.add("hidden");
      state.viewOverlay.setAttribute("aria-hidden", "true");
    }
    state.viewMinimized = false;
    state.viewSource = null;
    if (state.root) {
      state.root.dataset.pipMinimized = "false";
    }
  };

  const clearAd = () => {
    state.adActive = false;
    updatePipToggleState();
    clearAdTimer();
    clearAdsManager();
    if (state.adVideo) {
      state.adVideo.pause();
      state.adVideo.removeAttribute("src");
      state.adVideo.load();
    }
    if (state.adFallback) {
      state.adFallback.classList.add("hidden");
    }
    hideOverlay();
  };

  const showFallback = ({ clickThroughUrl, durationSec }) => {
    clearAdsManager();
    state.adActive = true;
    updatePipToggleState();
    setOverlayMode(state.pendingAd?.mode || "pip");
    showOverlay();
    if (state.adFallback) {
      state.adFallback.href = sanitizeUrl(clickThroughUrl) || DEFAULT_CONTACT;
      state.adFallback.classList.remove("hidden");
    }
    emit("onAdError", { reason: "fallback" });
    clearAdTimer();
    const timeout = Number(durationSec) || 15;
    state.adTimer = setTimeout(() => {
      emit("onAdComplete", { reason: "fallback" });
      clearAd();
    }, timeout * 1000);
  };

  const ensureAdDisplayContainer = () => {
    if (!state.adDisplayContainer) {
      state.adDisplayContainer = new google.ima.AdDisplayContainer(
        state.adContainer,
        state.adVideo
      );
    }
    if (state.userActivated) {
      state.adDisplayContainer.initialize();
    }
  };

  const initAdsLoader = async () => {
    await loadScript(IMA_SRC);
    if (!state.adsLoader) {
      state.adsLoader = new google.ima.AdsLoader(state.adDisplayContainer);
      state.adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event) => {
          clearAdsManager();
          state.adsManager = event.getAdsManager(state.adVideo, {
            restoreCustomPlaybackStateOnAdBreakComplete: true,
          });
          state.adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            (err) => {
              emit("onAdError", err.getError());
              showFallback(state.pendingAd || {});
            }
          );
          state.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
            emit("onAdStart");
            state.adActive = true;
            updatePipToggleState();
            if (state.viewMinimized) {
              setViewVisible(true);
            }
          });
          state.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, () => {
            emit("onAdComplete");
            clearAd();
          });
          state.adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            () => {
              emit("onAdComplete");
              clearAd();
            }
          );
          state.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, () => {
            emit("onAdClick");
          });

          try {
            const { width, height } = state.adContainer.getBoundingClientRect();
            state.adsManager.init(width, height, google.ima.ViewMode.NORMAL);
            state.adsManager.setVolume(0);
            state.adsManager.start();
            state.adActive = true;
            updatePipToggleState();
            if (state.viewMinimized) {
              setViewVisible(true);
            }
            state.adFallback.classList.add("hidden");
            showOverlay();
            clearAdTimer();
            if (state.pendingAd?.durationSec) {
              state.adTimer = setTimeout(() => {
                clearAd();
              }, Number(state.pendingAd.durationSec) * 1000);
            }
          } catch (error) {
            showTapOverlay();
            state.pendingAd = { ...state.pendingAd, retry: true };
          }
        }
      );
      state.adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        (err) => {
          emit("onAdError", err.getError());
          showFallback(state.pendingAd || {});
        }
      );
    }
  };

  const requestAd = async ({ vastTagUrl, mode, durationSec, clickThroughUrl }) => {
    if (!vastTagUrl) {
      showFallback({ clickThroughUrl, durationSec });
      return;
    }

    emit("onAdRequest", { vastTagUrl, mode });
    state.pendingAd = { vastTagUrl, mode, durationSec, clickThroughUrl };
    setOverlayMode(mode);
    showOverlay();
    try {
      await loadScript(IMA_SRC);
      ensureAdDisplayContainer();
      await initAdsLoader();
      const adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = vastTagUrl;
      adsRequest.linearAdSlotWidth = state.adContainer.offsetWidth;
      adsRequest.linearAdSlotHeight = state.adContainer.offsetHeight;
      adsRequest.nonLinearAdSlotWidth = state.adContainer.offsetWidth;
      adsRequest.nonLinearAdSlotHeight = state.adContainer.offsetHeight;
      state.adsLoader.requestAds(adsRequest);
    } catch (error) {
      emit("onAdError", error);
      showFallback({ clickThroughUrl, durationSec });
    }
  };

  const setAltView = async ({ src, type, position = "bottom-right" }) => {
    if (!state.viewOverlay || !state.viewVideo) {
      return;
    }
    clearAltView();
    setViewPosition(position);
    setViewVisible(true);
    state.viewVideo.muted = true;
    state.viewVideo.volume = 0;
    const resolvedType = type === "hls" || src.endsWith(".m3u8") ? "hls" : "mp4";
    try {
      if (resolvedType === "hls") {
        state.viewHls = await attachHls(state.viewVideo, src);
      } else {
        state.viewVideo.src = src;
      }
      await state.viewVideo.play();
      state.viewSource = { src, type: resolvedType };
    } catch (error) {
      emit("onMainError", error);
    }
  };

  const applyPendingView = () => {
    if (!state.pendingView) {
      return;
    }
    const nextView = state.pendingView;
    state.pendingView = null;
    setAltView(nextView);
  };

  const swapViews = async () => {
    if (!state.mainSource || !state.viewSource) {
      return;
    }
    const currentMain = state.mainSource;
    const currentView = state.viewSource;
    await setMainSource(currentView.src, currentView.type);
    await setAltView({
      src: currentMain.src,
      type: currentMain.type,
      position: state.viewPosition || "bottom-right",
    });
  };

  const triggerAd = ({ mode = "pip", vastTagUrl, durationSec = 15, clickThroughUrl }) => {
    clearAd();
    state.pendingAd = { mode, vastTagUrl, durationSec, clickThroughUrl };
    requestAd(state.pendingAd);
  };

  const setSchedule = (entries) => {
    state.schedule = (entries || []).map((entry) => ({
      ...entry,
      fired: false,
    }));
  };

  const startScheduleWatcher = () => {
    if (state.scheduleTimer) {
      return;
    }
    state.scheduleTimer = setInterval(() => {
      if (!state.mainVideo || state.mainVideo.paused) {
        return;
      }
      const current = state.mainVideo.currentTime || 0;
      state.schedule.forEach((entry) => {
        if (!entry.fired && current >= entry.atSec) {
          entry.fired = true;
          triggerAd(entry);
        }
      });
    }, 500);
  };

  const attemptAutoplay = async () => {
    try {
      await state.mainVideo.play();
      hideTapOverlay();
    } catch (error) {
      showTapOverlay();
    }
  };

  const startMainPlayback = async () => {
    if (!state.mainVideo) {
      return;
    }
    await attemptAutoplay();
  };

  const unmuteWithFallback = async () => {
    if (!state.mainVideo) {
      return { ok: false, reason: "missing_video" };
    }

    const targetVolume = state.mainVideo.volume > 0 ? state.mainVideo.volume : 1;
    state.mainVideo.volume = targetVolume;
    state.mainVideo.muted = false;

    try {
      if (state.mainVideo.paused) {
        await state.mainVideo.play();
      }
      // Give the media element a moment to settle after changing audio output state.
      await new Promise((resolve) => setTimeout(resolve, 180));
      if (state.mainVideo.paused) {
        throw new Error("paused_after_unmute");
      }
      emit("onUnmuteSuccess");
      return { ok: true };
    } catch (error) {
      state.mainVideo.muted = true;
      state.mainVideo.play().catch(() => {});
      emit("onUnmuteFailed", error);
      return { ok: false, reason: error?.message || "unmute_failed" };
    }
  };

  const playPrerollThenMain = async () => {
    if (!state.splashVideo || state.splashComplete) {
      await startMainPlayback();
      return;
    }
    showSplash();
    state.splashVideo.currentTime = 0;
    try {
      await state.splashVideo.play();
    } catch (error) {
      state.splashVideo.classList.add("hidden");
      state.splashComplete = true;
      hideSplash();
      await startMainPlayback();
    }
  };

  const setMainSource = async (src, type) => {
    if (!state.mainVideo || !src) {
      return;
    }
    if (state.mainHls) {
      state.mainHls.destroy();
      state.mainHls = null;
    }
    const resolvedType = type === "hls" || src.endsWith(".m3u8") ? "hls" : "mp4";
    if (resolvedType === "hls") {
      state.mainHls = await attachHls(state.mainVideo, src);
    } else {
      state.mainVideo.src = src;
    }
    state.mainSource = { src, type: resolvedType };
  };

  const setupMainVideo = async (src, type) => {
    if (!src) {
      emit("onMainError", { message: "Missing src" });
      return;
    }

    state.mainVideo.loop = true;
    await setMainSource(src, type);

    if (!state.mainListenersAttached) {
      state.mainVideo.addEventListener("play", () => {
        emit("onMainPlay");
        state.mainStarted = true;
        if (state.splashComplete) {
          hideSplash();
        }
        if (state.viewVideo && state.viewVideo.src) {
          state.viewVideo.play().catch(() => {});
        }
        startScheduleWatcher();
      });

      state.mainVideo.addEventListener("pause", () => emit("onMainPause"));
      state.mainVideo.addEventListener("error", (event) => {
        emit("onMainError", event);
        showSplash();
      });
      state.mainListenersAttached = true;
    }

    showTapOverlay();
  };

  const attachUserActivation = () => {
    const activate = async () => {
      if (state.userActivated && state.splashComplete) {
        state.mainVideo.play().catch(() => {});
        applyPendingView();
        return;
      }
      state.userActivated = true;
      hideTapOverlay();
      // Start playback muted so autoplay and audio routing issues don't stall video.
      state.mainVideo.muted = true;
      if (!state.mainVideo.volume) {
        state.mainVideo.volume = 1;
      }
      if (state.adDisplayContainer) {
        state.adDisplayContainer.initialize();
      }
      playPrerollThenMain();
      applyPendingView();
      if (state.pendingAd?.retry) {
        requestAd(state.pendingAd);
        state.pendingAd.retry = false;
      }
    };

    state.activatePlayback = activate;
    state.tapButton.addEventListener("click", activate);
    state.mainVideo.addEventListener("click", activate);
    if (state.splash) {
      state.splash.addEventListener("click", activate);
    }
  };

  const initPostMessage = (allowedOrigins) => {
    // Default to same-origin only. A page embedding this player cross-origin
    // and wanting postMessage control must opt in explicitly by passing
    // allowedOrigins to initRacePlayer — we never execute a player command
    // from an origin the embedder hasn't declared.
    const origins = Array.isArray(allowedOrigins) && allowedOrigins.length
      ? allowedOrigins
      : [window.location.origin];

    window.addEventListener("message", (event) => {
      if (!origins.includes(event.origin)) {
        return;
      }
      if (!event.data || event.data.type !== "RacePlayer") {
        return;
      }
      const { action, payload } = event.data;
      if (action === "triggerAd") {
        triggerAd(payload || {});
      } else if (action === "clearAd") {
        clearAd();
      } else if (action === "play") {
        state.mainVideo.play();
      } else if (action === "pause") {
        state.mainVideo.pause();
      } else if (action === "mute") {
        state.mainVideo.muted = true;
      } else if (action === "unmute") {
        state.mainVideo.muted = false;
      }
    });
  };

  const initRacePlayer = async (root, options = {}) => {
    if (!root) {
      return;
    }
    state.root = root;
    state.root.dataset.pipMinimized = "false";
    state.mainVideo = root.querySelector("[data-role='main-video']");
    state.adVideo = root.querySelector("[data-role='ad-video']");
    state.adOverlay = root.querySelector("[data-role='ad-overlay']");
    state.adContainer = root.querySelector("[data-role='ad-container']");
    state.adFallback = root.querySelector("[data-role='ad-fallback']");
    state.tapButton = root.querySelector("[data-role='tap-to-play']");
    state.splash = root.querySelector("[data-role='splash']");
    state.splashVideo = root.querySelector("[data-role='splash-video']");
    state.viewOverlay = root.querySelector("[data-role='view-overlay']");
    state.viewVideo = root.querySelector("[data-role='view-video']");
    state.pipToggle = root.querySelector("[data-role='pip-toggle']");
    state.adDragHandle = root.querySelector("[data-role='ad-drag']");
    state.viewDragHandle = root.querySelector("[data-role='view-drag']");

    state.adVideo.muted = true;
    state.adVideo.volume = 0;
    state.mainVideo.loop = true;
    if (state.viewVideo) {
      state.viewVideo.loop = true;
    }

    if (state.splashVideo) {
      const completePreroll = () => {
        if (state.splashComplete) {
          return;
        }
        state.splashVideo.classList.add("hidden");
        state.splashComplete = true;
        hideSplash();
        if (state.userActivated) {
          startMainPlayback();
        }
      };

      state.splashVideo.muted = true;
      state.splashVideo.addEventListener("ended", completePreroll);
      state.splashVideo.addEventListener("error", completePreroll);
    }

    enableDrag(state.adDragHandle, state.adOverlay);
    enableDrag(state.viewDragHandle, state.viewOverlay);
    updatePipToggleState();

    if (state.pipToggle) {
      state.pipToggle.addEventListener("click", () => {
        if (state.adActive) {
          return;
        }
        const isHidden = state.viewOverlay?.classList.contains("hidden");
        setViewVisible(Boolean(isHidden));
      });
    }

    const params = new URLSearchParams(window.location.search);
    const mainSrc = options.mainSrc || params.get("src") || "";
    const mainType =
      options.mainType ||
      params.get("type") ||
      (mainSrc.endsWith(".m3u8") ? "hls" : "mp4");
    const pipSrc = options.pipSrc || params.get("pip") || params.get("pipSrc") || "";
    const pipType = options.pipType || params.get("pipType") || (pipSrc.endsWith(".m3u8") ? "hls" : "mp4");
    const defaultVast = options.vastTagUrl || params.get("vast") || "";
    const pipSize = options.pipSize || params.get("pipSize") || "default";

    setPipSize(pipSize);

    if (defaultVast) {
      state.pendingAd = { mode: "pip", vastTagUrl: defaultVast, durationSec: 15 };
    }

    attachUserActivation();
    initPostMessage(options.allowedOrigins);
    await setupMainVideo(mainSrc, mainType);

    if (pipSrc) {
      state.pendingView = { src: pipSrc, type: pipType, position: "bottom-right" };
      if (state.userActivated) {
        applyPendingView();
      }
    }
  };

  window.initRacePlayer = initRacePlayer;
  window.RacePlayer = {
    play: () => state.mainVideo && state.mainVideo.play(),
    pause: () => state.mainVideo && state.mainVideo.pause(),
    mute: () => state.mainVideo && (state.mainVideo.muted = true),
    unmute: () => unmuteWithFallback(),
    unmuteSafe: () => unmuteWithFallback(),
    activate: () => state.activatePlayback && state.activatePlayback(),
    swapView: () => swapViews(),
    setPipSize: (size) => setPipSize(size),
    triggerAd,
    clearAd,
    setSchedule,
    setAltView,
    clearAltView,
    on,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-race-player]");
    initRacePlayer(root);
  });
})();
