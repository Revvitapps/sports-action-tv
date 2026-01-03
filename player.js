(() => {
  const DEFAULT_CONTACT = "mailto:ads@sportsactiontv.com";
  const IMA_SRC = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
  const HLS_SRC = "https://cdn.jsdelivr.net/npm/hls.js@1.5.15";

  const state = {
    mainVideo: null,
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
    adsLoader: null,
    adsManager: null,
    adDisplayContainer: null,
    adActive: false,
    adTimer: null,
    scheduleTimer: null,
    schedule: [],
    userActivated: false,
    pendingAd: null,
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
  };

  const clearAd = () => {
    state.adActive = false;
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
    setOverlayMode(state.pendingAd?.mode || "pip");
    showOverlay();
    if (state.adFallback) {
      state.adFallback.href = clickThroughUrl || DEFAULT_CONTACT;
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

  const setAltView = async ({ src, type = "hls", position = "bottom-right" }) => {
    if (!state.viewOverlay || !state.viewVideo) {
      return;
    }
    clearAltView();
    setViewPosition(position);
    state.viewOverlay.classList.remove("hidden");
    state.viewOverlay.setAttribute("aria-hidden", "false");
    state.viewVideo.muted = true;
    state.viewVideo.volume = 0;
    try {
      if (type === "hls" || src.endsWith(".m3u8")) {
        state.viewHls = await attachHls(state.viewVideo, src);
      } else {
        state.viewVideo.src = src;
      }
      await state.viewVideo.play();
    } catch (error) {
      emit("onMainError", error);
    }
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

  const setupMainVideo = async (src, type) => {
    if (!src) {
      emit("onMainError", { message: "Missing src" });
      return;
    }

    if (type === "hls" || src.endsWith(".m3u8")) {
      if (state.mainVideo.canPlayType("application/vnd.apple.mpegurl")) {
        state.mainVideo.src = src;
      } else {
        await loadScript(HLS_SRC);
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(state.mainVideo);
        hls.on(Hls.Events.ERROR, (_, data) => {
          emit("onMainError", data);
        });
      }
    } else {
      state.mainVideo.src = src;
    }

    state.mainVideo.addEventListener("play", () => {
      emit("onMainPlay");
      state.mainStarted = true;
      if (state.splashComplete) {
        hideSplash();
      }
      startScheduleWatcher();
    });

    state.mainVideo.addEventListener("pause", () => emit("onMainPause"));
    state.mainVideo.addEventListener("error", (event) => {
      emit("onMainError", event);
      showSplash();
    });

    await attemptAutoplay();
  };

  const attachUserActivation = () => {
    const activate = () => {
      state.userActivated = true;
      hideTapOverlay();
      state.mainVideo.muted = false;
      state.mainVideo.volume = 1;
      if (state.adDisplayContainer) {
        state.adDisplayContainer.initialize();
      }
      attemptAutoplay();
      if (state.viewVideo && state.viewVideo.src) {
        state.viewVideo.play().catch(() => {});
      }
      if (state.pendingAd?.retry) {
        requestAd(state.pendingAd);
        state.pendingAd.retry = false;
      }
    };

    state.tapButton.addEventListener("click", activate);
    state.mainVideo.addEventListener("click", activate);
  };

  const initPostMessage = () => {
    window.addEventListener("message", (event) => {
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

    state.adVideo.muted = true;
    state.adVideo.volume = 0;

    if (state.splashVideo) {
      state.splashVideo.muted = true;
      state.splashVideo.play().catch(() => {});
      setTimeout(() => {
        if (!state.splashComplete) {
          state.splashVideo.classList.add("hidden");
          state.splashComplete = true;
          if (state.mainStarted) {
            hideSplash();
          }
        }
      }, 4000);
      state.splashVideo.addEventListener("ended", () => {
        state.splashVideo.classList.add("hidden");
        state.splashComplete = true;
        if (state.mainStarted) {
          hideSplash();
        }
      });
      state.splashVideo.addEventListener("error", () => {
        state.splashVideo.classList.add("hidden");
        state.splashComplete = true;
        if (state.mainStarted) {
          hideSplash();
        }
      });
      state.splash.addEventListener("click", () => {
        state.splashVideo.classList.add("hidden");
        state.splashComplete = true;
        if (state.mainStarted) {
          hideSplash();
        }
      });
    }

    const params = new URLSearchParams(window.location.search);
    const mainSrc = options.mainSrc || params.get("src") || "";
    const mainType =
      options.mainType ||
      params.get("type") ||
      (mainSrc.endsWith(".m3u8") ? "hls" : "mp4");
    const defaultVast = options.vastTagUrl || params.get("vast") || "";

    if (defaultVast) {
      state.pendingAd = { mode: "pip", vastTagUrl: defaultVast, durationSec: 15 };
    }

    attachUserActivation();
    initPostMessage();
    await setupMainVideo(mainSrc, mainType);
  };

  window.initRacePlayer = initRacePlayer;
  window.RacePlayer = {
    play: () => state.mainVideo && state.mainVideo.play(),
    pause: () => state.mainVideo && state.mainVideo.pause(),
    mute: () => state.mainVideo && (state.mainVideo.muted = true),
    unmute: () => state.mainVideo && (state.mainVideo.muted = false),
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
