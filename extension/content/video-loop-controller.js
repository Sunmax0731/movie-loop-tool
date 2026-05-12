(() => {
  const STORAGE_KEY = "movieLoopTool";
  const DEFAULT_SETTINGS = Object.freeze({
    enabled: false,
    loopCount: 1,
    loopMode: "count",
    targetVideoId: "all",
    segment: Object.freeze({ enabled: false, start: 0, end: null })
  });
  const LOOP_MODES = new Set(["count", "infinite", "stop-current"]);
  const MIN_LOOP_COUNT = 1;
  const MAX_LOOP_COUNT = 99;
  let settings = { ...DEFAULT_SETTINGS };
  const trackedVideos = new Map();
  const videoIds = new WeakMap();
  const videoStates = new WeakMap();
  const observedRoots = new WeakSet();
  let nextVideoId = 1;

  function normalizeSegment(value) {
    const start = Number.parseFloat(value?.start);
    const end = Number.parseFloat(value?.end);
    const normalizedStart = Number.isFinite(start) ? Math.max(0, start) : DEFAULT_SETTINGS.segment.start;
    const normalizedEnd = Number.isFinite(end) ? Math.max(0, end) : null;
    const enabled = value?.enabled === true && normalizedEnd !== null && normalizedEnd > normalizedStart;
    return { enabled, start: normalizedStart, end: enabled ? normalizedEnd : null };
  }

  function normalizeSettings(value) {
    const rawCount = Number.parseInt(value?.loopCount, 10);
    const loopCount = Number.isFinite(rawCount) ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount)) : DEFAULT_SETTINGS.loopCount;
    const loopMode = LOOP_MODES.has(value?.loopMode) ? value.loopMode : DEFAULT_SETTINGS.loopMode;
    const targetVideoId = typeof value?.targetVideoId === "string" && value.targetVideoId.trim() ? value.targetVideoId.trim() : DEFAULT_SETTINGS.targetVideoId;
    return { enabled: value?.enabled === true, loopCount, loopMode, targetVideoId, segment: normalizeSegment(value?.segment) };
  }

  function canReplay(state) {
    if (!settings.enabled || settings.loopMode === "stop-current") return false;
    if (settings.loopMode === "infinite") return true;
    return state.loopsCompleted < settings.loopCount;
  }

  function isVideoElement(node) {
    return node?.nodeType === Node.ELEMENT_NODE && String(node.tagName).toLowerCase() === "video";
  }

  function videoId(video) {
    let id = videoIds.get(video);
    if (!id) {
      id = `video-${nextVideoId}`;
      nextVideoId += 1;
      videoIds.set(video, id);
    }
    return id;
  }

  function videoKey(video) {
    return [video.currentSrc || video.src || "", Number.isFinite(video.duration) ? video.duration : "unknown"].join("|");
  }

  function getState(video) {
    let state = videoStates.get(video);
    if (!state) {
      state = { loopsCompleted: 0, key: videoKey(video), lastError: "", replayPending: false };
      videoStates.set(video, state);
    }
    return state;
  }

  function resetState(video) {
    const state = getState(video);
    state.loopsCompleted = 0;
    state.key = videoKey(video);
    state.lastError = "";
    state.replayPending = false;
  }

  function refreshSourceState(video) {
    const state = getState(video);
    const nextKey = videoKey(video);
    if (state.key !== nextKey) {
      state.key = nextKey;
      state.loopsCompleted = 0;
      state.lastError = "";
      state.replayPending = false;
    }
  }

  function isTargetVideo(video) {
    const id = videoId(video);
    return settings.targetVideoId === "all" || settings.targetVideoId === id;
  }

  async function replay(video, state, seekTo) {
    if (state.replayPending) return;
    state.replayPending = true;
    try {
      video.currentTime = seekTo;
      const result = video.play();
      if (result && typeof result.then === "function") await result;
      state.loopsCompleted += 1;
      state.lastError = "";
    } catch (error) {
      state.lastError = error?.message || "replay failed";
    } finally {
      state.replayPending = false;
    }
  }

  function onEnded(event) {
    const video = event.currentTarget;
    refreshSourceState(video);
    const state = getState(video);
    if (isTargetVideo(video) && canReplay(state)) void replay(video, state, 0);
  }

  function onTimeUpdate(event) {
    const video = event.currentTarget;
    if (!settings.segment.enabled || !isTargetVideo(video)) return;
    refreshSourceState(video);
    const state = getState(video);
    if (video.currentTime >= settings.segment.end && canReplay(state)) {
      void replay(video, state, settings.segment.start);
    }
  }

  function trackVideo(video) {
    if (!isVideoElement(video) || trackedVideos.has(videoId(video))) return;
    trackedVideos.set(videoId(video), video);
    resetState(video);
    video.addEventListener("ended", onEnded, true);
    video.addEventListener("timeupdate", onTimeUpdate, true);
    video.addEventListener("loadedmetadata", () => resetState(video), true);
    video.addEventListener("emptied", () => resetState(video), true);
    video.addEventListener("play", () => refreshSourceState(video), true);
  }

  function cleanupDisconnectedVideos() {
    for (const [id, video] of [...trackedVideos]) if (!video.isConnected) trackedVideos.delete(id);
  }

  function observeRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);
    new MutationObserver(() => scanVideos()).observe(root, { childList: true, subtree: true });
  }

  function scanRoot(root) {
    if (!root) return;
    observeRoot(root);
    if (isVideoElement(root)) trackVideo(root);
    if (root.querySelectorAll) root.querySelectorAll("video").forEach(trackVideo);
    if (root.querySelectorAll) {
      root.querySelectorAll("iframe").forEach((iframe) => {
        iframe.addEventListener("load", scanVideos, { once: true });
        try {
          if (iframe.contentDocument) scanRoot(iframe.contentDocument.documentElement || iframe.contentDocument.body);
        } catch {
          // Cross-origin iframes cannot be inspected from the content script.
        }
      });
      root.querySelectorAll("*").forEach((node) => {
        if (node.shadowRoot) scanRoot(node.shadowRoot);
      });
    }
  }

  function scanVideos() {
    cleanupDisconnectedVideos();
    scanRoot(document.documentElement || document.body);
  }

  function resetAllCounts() {
    for (const video of trackedVideos.values()) resetState(video);
  }

  function formatSeconds(value) {
    return Number.isFinite(value) ? `${Math.max(0, value).toFixed(1)}s` : "unknown";
  }

  function videoLabel(video, id) {
    return `Video ${id.replace("video-", "")} (${formatSeconds(video.currentTime)} / ${formatSeconds(video.duration)})`;
  }

  function status() {
    cleanupDisconnectedVideos();
    let loopsCompleted = 0;
    let lastError = "";
    const videoList = [];
    for (const [id, video] of trackedVideos) {
      const state = getState(video);
      loopsCompleted += state.loopsCompleted;
      if (state.lastError) lastError = state.lastError;
      videoList.push({
        id,
        label: videoLabel(video, id),
        selected: settings.targetVideoId === "all" || settings.targetVideoId === id,
        duration: Number.isFinite(video.duration) ? video.duration : null,
        currentTime: Number.isFinite(video.currentTime) ? video.currentTime : 0,
        loopsCompleted: state.loopsCompleted,
        lastError: state.lastError
      });
    }
    return { enabled: settings.enabled, loopCount: settings.loopCount, loopMode: settings.loopMode, targetVideoId: settings.targetVideoId, segment: settings.segment, videos: trackedVideos.size, videoList, loopsCompleted, lastError, settings: { ...settings, segment: { ...settings.segment } } };
  }

  function applySettings(nextSettings, options = {}) {
    const merged = normalizeSettings({ ...settings, ...nextSettings, segment: nextSettings?.segment ?? settings.segment });
    const shouldReset = options.resetCounts !== false && JSON.stringify(merged) !== JSON.stringify(settings);
    settings = merged;
    scanVideos();
    if (shouldReset) resetAllCounts();
    return status();
  }

  function observeVideos() {
    scanVideos();
  }

  chrome.storage.sync.get(STORAGE_KEY, (stored) => applySettings(stored[STORAGE_KEY] || DEFAULT_SETTINGS, { resetCounts: false }));
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes[STORAGE_KEY]) applySettings(changes[STORAGE_KEY].newValue || DEFAULT_SETTINGS);
  });
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "MOVIE_LOOP_APPLY_SETTINGS") return sendResponse(applySettings(message.settings));
    if (message?.type === "MOVIE_LOOP_GET_STATUS") { scanVideos(); return sendResponse(status()); }
    if (message?.type === "MOVIE_LOOP_RESET_COUNTS") { resetAllCounts(); return sendResponse(status()); }
    if (message?.type === "MOVIE_LOOP_STOP_AFTER_CURRENT") return sendResponse(applySettings({ loopMode: "stop-current" }, { resetCounts: false }));
    return undefined;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observeVideos, { once: true });
  else observeVideos();
})();
