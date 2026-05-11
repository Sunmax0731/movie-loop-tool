const STORAGE_KEY = "movieLoopTool";
const DEFAULT_SETTINGS = Object.freeze({ enabled: false, loopCount: 1 });
const MIN_LOOP_COUNT = 1;
const MAX_LOOP_COUNT = 99;

const enabledToggle = document.querySelector("#enabledToggle");
const enabledText = document.querySelector("#enabledText");
const loopCountInput = document.querySelector("#loopCount");
const connectionState = document.querySelector("#connectionState");
const videoCount = document.querySelector("#videoCount");
const loopedCount = document.querySelector("#loopedCount");

function normalizeSettings(value) {
  const rawCount = Number.parseInt(value?.loopCount, 10);
  const loopCount = Number.isFinite(rawCount)
    ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount))
    : DEFAULT_SETTINGS.loopCount;
  return { enabled: value?.enabled === true, loopCount };
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
  return normalizeSettings({ enabled: enabledToggle.checked, loopCount: loopCountInput.value });
}

function renderSettings(settings) {
  enabledToggle.checked = settings.enabled;
  enabledText.textContent = settings.enabled ? "ON" : "OFF";
  loopCountInput.value = String(settings.loopCount);
}

function renderStatus(status, text = "Applied", error = false) {
  connectionState.textContent = text;
  connectionState.classList.toggle("is-active", !error);
  connectionState.classList.toggle("is-error", error);
  if (status) {
    videoCount.textContent = String(status.videos ?? 0);
    loopedCount.textContent = String(status.loopsCompleted ?? 0);
  }
}

async function applyToActiveTab(settings) {
  const tab = await queryActiveTab();
  if (!tab?.id) throw new Error("active tab unavailable");
  return sendMessage(tab.id, { type: "MOVIE_LOOP_APPLY_SETTINGS", settings });
}

async function saveAndApply() {
  const settings = settingsFromUi();
  renderSettings(settings);
  await storageSet({ [STORAGE_KEY]: settings });
  try {
    renderStatus(await applyToActiveTab(settings), "Applied");
  } catch {
    renderStatus(null, "Unsupported page", true);
  }
}

async function refresh() {
  try {
    const tab = await queryActiveTab();
    if (!tab?.id) throw new Error("active tab unavailable");
    renderStatus(await sendMessage(tab.id, { type: "MOVIE_LOOP_GET_STATUS" }), "Updated");
  } catch {
    renderStatus(null, "Unsupported page", true);
  }
}

async function reset() {
  try {
    const tab = await queryActiveTab();
    if (!tab?.id) throw new Error("active tab unavailable");
    renderStatus(await sendMessage(tab.id, { type: "MOVIE_LOOP_RESET_COUNTS" }), "Reset");
  } catch {
    renderStatus(null, "Unsupported page", true);
  }
}

function changeCount(delta) {
  const current = normalizeSettings({ loopCount: loopCountInput.value }).loopCount;
  loopCountInput.value = String(Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, current + delta)));
  void saveAndApply();
}

enabledToggle.addEventListener("change", saveAndApply);
loopCountInput.addEventListener("change", saveAndApply);
document.querySelector("#decreaseCount").addEventListener("click", () => changeCount(-1));
document.querySelector("#increaseCount").addEventListener("click", () => changeCount(1));
document.querySelector("#resetCounts").addEventListener("click", reset);
document.querySelector("#refreshStatus").addEventListener("click", refresh);

(async () => {
  const stored = await storageGet(STORAGE_KEY);
  renderSettings(normalizeSettings(stored[STORAGE_KEY] || DEFAULT_SETTINGS));
  await saveAndApply();
})();
