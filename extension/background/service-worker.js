const STORAGE_KEY = "movieLoopTool";
const DEFAULT_SETTINGS = Object.freeze({ enabled: false, loopCount: 1 });

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  if (!stored[STORAGE_KEY]) await chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT_SETTINGS });
  await updateBadge(stored[STORAGE_KEY] || DEFAULT_SETTINGS);
});

chrome.action.onClicked.addListener(async (tab) => {
  await toggleAutoLoop(tab);
});

chrome.commands?.onCommand.addListener(async (command, tab) => {
  if (command === "toggle-auto-loop") await toggleAutoLoop(tab || await activeTab());
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes[STORAGE_KEY]) void updateBadge(changes[STORAGE_KEY].newValue || DEFAULT_SETTINGS);
});

async function activeTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function normalizePersistentSettings(value) {
  const rawCount = Number.parseInt(value?.loopCount, 10);
  const loopCount = Number.isFinite(rawCount) ? Math.min(99, Math.max(1, rawCount)) : DEFAULT_SETTINGS.loopCount;
  return { enabled: value?.enabled === true, loopCount };
}

async function toggleAutoLoop(tab) {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const current = normalizePersistentSettings(stored[STORAGE_KEY] || DEFAULT_SETTINGS);
  const next = { ...current, enabled: !current.enabled };
  await chrome.storage.sync.set({ [STORAGE_KEY]: next });
  await updateBadge(next);
  if (tab?.id) {
    await ignoreApiError(chrome.tabs.sendMessage(tab.id, { type: "MOVIE_LOOP_APPLY_SETTINGS", settings: next }));
  }
}

async function updateBadge(settings) {
  const normalized = normalizePersistentSettings(settings);
  await ignoreApiError(chrome.action.setBadgeText({ text: normalized.enabled ? "ON" : "" }));
  await ignoreApiError(chrome.action.setBadgeBackgroundColor({ color: normalized.enabled ? "#1f7a68" : "#637083" }));
}

function ignoreApiError(value) {
  return value && typeof value.catch === "function" ? value.catch(() => {}) : Promise.resolve();
}
