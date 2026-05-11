const STORAGE_KEY = "movieLoopTool";
const DEFAULT_SETTINGS = Object.freeze({ enabled: false, loopCount: 1 });

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  if (!stored[STORAGE_KEY]) await chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT_SETTINGS });
  if (chrome.sidePanel?.setPanelBehavior) await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!chrome.sidePanel?.open || !tab?.windowId) return;
  await chrome.sidePanel.open({ windowId: tab.windowId }).catch(() => {});
});