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

const enabledToggle = document.querySelector("#enabledToggle");
const enabledText = document.querySelector("#enabledText");
const loopCountInput = document.querySelector("#loopCount");
const loopModeSelect = document.querySelector("#loopMode");
const targetVideoSelect = document.querySelector("#targetVideo");
const segmentEnabled = document.querySelector("#segmentEnabled");
const segmentStart = document.querySelector("#segmentStart");
const segmentEnd = document.querySelector("#segmentEnd");
const connectionState = document.querySelector("#connectionState");
const videoCount = document.querySelector("#videoCount");
const loopedCount = document.querySelector("#loopedCount");
const lastError = document.querySelector("#lastError");

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
  const loopCount = Number.isFinite(rawCount)
    ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount))
    : DEFAULT_SETTINGS.loopCount;
  const loopMode = LOOP_MODES.has(value?.loopMode) ? value.loopMode : DEFAULT_SETTINGS.loopMode;
  const targetVideoId = typeof value?.targetVideoId === "string" && value.targetVideoId.trim() ? value.targetVideoId.trim() : DEFAULT_SETTINGS.targetVideoId;
  return { enabled: value?.enabled === true, loopCount, loopMode, targetVideoId, segment: normalizeSegment(value?.segment) };
}

function toStoredSettings(value) {
  const normalized = normalizeSettings(value);
  return { enabled: normalized.enabled, loopCount: normalized.loopCount };
}

function storageGet(key) {
  return new Promise((resolve) => chrome.storage.sync.get(key, resolve));
}

function storageSet(value) {
  return new Promise((resolve) => chrome.storage.sync.set(value, resolve));
}

function queryActiveTab() {
  return new Promise((resolve) => chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs[0])));
}

function sendMessage(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
      else resolve(response);
    });
  });
}

function settingsFromUi() {
  return normalizeSettings({
    enabled: enabledToggle.checked,
    loopCount: loopCountInput.value,
    loopMode: loopModeSelect.value,
    targetVideoId: targetVideoSelect.value,
    segment: { enabled: segmentEnabled.checked, start: segmentStart.value, end: segmentEnd.value }
  });
}

function renderSettings(settings) {
  const normalized = normalizeSettings(settings);
  enabledToggle.checked = normalized.enabled;
  enabledText.textContent = normalized.enabled ? "ON" : "OFF";
  loopCountInput.value = String(normalized.loopCount);
  loopModeSelect.value = normalized.loopMode;
  segmentEnabled.checked = normalized.segment.enabled;
  segmentStart.value = String(normalized.segment.start);
  segmentEnd.value = normalized.segment.end === null ? "" : String(normalized.segment.end);
  if ([...targetVideoSelect.options].some((option) => option.value === normalized.targetVideoId)) targetVideoSelect.value = normalized.targetVideoId;
}

function renderStatus(status, text = "Applied", error = false) {
  connectionState.textContent = text;
  connectionState.classList.toggle("is-active", !error);
  connectionState.classList.toggle("is-error", error);
  if (status) {
    renderVideoOptions(status);
    renderSettings(status.settings || status);
    videoCount.textContent = String(status.videos ?? 0);
    loopedCount.textContent = String(status.loopsCompleted ?? 0);
    lastError.textContent = status.lastError ? `Last replay error: ${status.lastError}` : "";
  }
}

function renderVideoOptions(status) {
  const selected = normalizeSettings(status.settings || status).targetVideoId;
  const options = [{ id: "all", label: "All detected videos" }, ...(status.videoList || [])];
  targetVideoSelect.replaceChildren();
  for (const option of options) {
    const item = document.createElement("option");
    item.value = option.id;
    item.textContent = option.label;
    targetVideoSelect.append(item);
  }
  targetVideoSelect.value = options.some((option) => option.id === selected) ? selected : "all";
}

async function applyToActiveTab(settings) {
  const tab = await queryActiveTab();
  if (!tab?.id) throw new Error("active tab unavailable");
  return sendMessage(tab.id, { type: "MOVIE_LOOP_APPLY_SETTINGS", settings });
}

async function saveAndApply() {
  const settings = settingsFromUi();
  renderSettings(settings);
  await storageSet({ [STORAGE_KEY]: toStoredSettings(settings) });
  try {
    renderStatus(await applyToActiveTab(settings), "Applied");
  } catch (error) {
    renderStatus(null, "Unsupported page", true);
    lastError.textContent = error.message;
  }
}

async function refresh() {
  try {
    const tab = await queryActiveTab();
    if (!tab?.id) throw new Error("active tab unavailable");
    renderStatus(await sendMessage(tab.id, { type: "MOVIE_LOOP_GET_STATUS" }), "Updated");
  } catch (error) {
    renderStatus(null, "Unsupported page", true);
    lastError.textContent = error.message;
  }
}

async function reset() {
  try {
    const tab = await queryActiveTab();
    if (!tab?.id) throw new Error("active tab unavailable");
    renderStatus(await sendMessage(tab.id, { type: "MOVIE_LOOP_RESET_COUNTS" }), "Reset");
  } catch (error) {
    renderStatus(null, "Unsupported page", true);
    lastError.textContent = error.message;
  }
}

function changeCount(delta) {
  const current = normalizeSettings({ loopCount: loopCountInput.value }).loopCount;
  loopCountInput.value = String(Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, current + delta)));
  void saveAndApply();
}

enabledToggle.addEventListener("change", saveAndApply);
loopCountInput.addEventListener("change", saveAndApply);
loopModeSelect.addEventListener("change", saveAndApply);
targetVideoSelect.addEventListener("change", saveAndApply);
segmentEnabled.addEventListener("change", saveAndApply);
segmentStart.addEventListener("change", saveAndApply);
segmentEnd.addEventListener("change", saveAndApply);
document.querySelector("#decreaseCount").addEventListener("click", () => changeCount(-1));
document.querySelector("#increaseCount").addEventListener("click", () => changeCount(1));
document.querySelector("#resetCounts").addEventListener("click", reset);
document.querySelector("#refreshStatus").addEventListener("click", refresh);
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync" || !changes[STORAGE_KEY]) return;
  const runtimeSettings = settingsFromUi();
  const persistentSettings = normalizeSettings(changes[STORAGE_KEY].newValue || DEFAULT_SETTINGS);
  renderSettings({
    ...runtimeSettings,
    enabled: persistentSettings.enabled,
    loopCount: persistentSettings.loopCount
  });
  void refresh();
});

(async () => {
  const stored = await storageGet(STORAGE_KEY);
  renderSettings(normalizeSettings(stored[STORAGE_KEY] || DEFAULT_SETTINGS));
  await refresh();
})();
