(() => {
  const STORAGE_KEY = "movieLoopTool";
  const DEFAULT_SETTINGS = Object.freeze({ enabled: false, loopCount: 1 });
  const MIN_LOOP_COUNT = 1;
  const MAX_LOOP_COUNT = 99;
  let settings = { ...DEFAULT_SETTINGS };
  const trackedVideos = new Set();
  const videoStates = new WeakMap();

  function normalizeSettings(value) {
    const rawCount = Number.parseInt(value?.loopCount, 10);
    const loopCount = Number.isFinite(rawCount) ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount)) : DEFAULT_SETTINGS.loopCount;
    return { enabled: value?.enabled === true, loopCount };
  }

  function videoKey(video) {
    return [video.currentSrc || video.src || "", Number.isFinite(video.duration) ? video.duration : "unknown"].join("|");
  }

  function getState(video) {
    let state = videoStates.get(video);
    if (!state) {
      state = { loopsCompleted: 0, key: videoKey(video), lastError: "" };
      videoStates.set(video, state);
    }
    return state;
  }

  function resetState(video) {
    const state = getState(video);
    state.loopsCompleted = 0;
    state.key = videoKey(video);
    state.lastError = "";
  }

  function refreshSourceState(video) {
    const state = getState(video);
    const nextKey = videoKey(video);
    if (state.key !== nextKey) {
      state.key = nextKey;
      state.loopsCompleted = 0;
      state.lastError = "";
    }
  }

  async function replay(video, state) {
    state.loopsCompleted += 1;
    try {
      video.currentTime = 0;
      const result = video.play();
      if (result?.catch) await result.catch((error) => { state.lastError = error?.message || "play rejected"; });
    } catch (error) {
      state.lastError = error?.message || "replay failed";
    }
  }

  function onEnded(event) {
    const video = event.currentTarget;
    refreshSourceState(video);
    const state = getState(video);
    if (settings.enabled && state.loopsCompleted < settings.loopCount) void replay(video, state);
  }

  function trackVideo(video) {
    if (!(video instanceof HTMLVideoElement) || trackedVideos.has(video)) return;
    trackedVideos.add(video);
    resetState(video);
    video.addEventListener("ended", onEnded, true);
    video.addEventListener("loadedmetadata", () => resetState(video), true);
    video.addEventListener("emptied", () => resetState(video), true);
    video.addEventListener("play", () => refreshSourceState(video), true);
  }

  function cleanupDisconnectedVideos() {
    for (const video of [...trackedVideos]) if (!video.isConnected) trackedVideos.delete(video);
  }

  function scanVideos() {
    cleanupDisconnectedVideos();
    document.querySelectorAll("video").forEach(trackVideo);
  }

  function resetAllCounts() {
    for (const video of trackedVideos) resetState(video);
  }

  function status() {
    cleanupDisconnectedVideos();
    let loopsCompleted = 0;
    let lastError = "";
    for (const video of trackedVideos) {
      const state = getState(video);
      loopsCompleted += state.loopsCompleted;
      if (state.lastError) lastError = state.lastError;
    }
    return { enabled: settings.enabled, loopCount: settings.loopCount, videos: trackedVideos.size, loopsCompleted, lastError };
  }

  function applySettings(nextSettings) {
    settings = normalizeSettings(nextSettings);
    scanVideos();
    resetAllCounts();
    return status();
  }

  function observeVideos() {
    scanVideos();
    const root = document.documentElement || document.body;
    if (!root) return;
    new MutationObserver(scanVideos).observe(root, { childList: true, subtree: true });
  }

  chrome.storage.sync.get(STORAGE_KEY, (stored) => applySettings(stored[STORAGE_KEY] || DEFAULT_SETTINGS));
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes[STORAGE_KEY]) applySettings(changes[STORAGE_KEY].newValue || DEFAULT_SETTINGS);
  });
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "MOVIE_LOOP_APPLY_SETTINGS") return sendResponse(applySettings(message.settings));
    if (message?.type === "MOVIE_LOOP_GET_STATUS") { scanVideos(); return sendResponse(status()); }
    if (message?.type === "MOVIE_LOOP_RESET_COUNTS") { resetAllCounts(); return sendResponse(status()); }
    return undefined;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observeVideos, { once: true });
  else observeVideos();
})();