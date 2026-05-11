export const LOOP_MODES = Object.freeze(["count", "infinite", "stop-current"]);
export const DEFAULT_LOOP_SETTINGS = Object.freeze({
  enabled: false,
  loopCount: 1,
  loopMode: "count",
  targetVideoId: "all",
  segment: Object.freeze({ enabled: false, start: 0, end: null })
});
export const MIN_LOOP_COUNT = 1;
export const MAX_LOOP_COUNT = 99;
export const STORED_SETTING_KEYS = Object.freeze(["enabled", "loopCount"]);

export function normalizeSegment(value) {
  const start = Number.parseFloat(value?.start);
  const end = Number.parseFloat(value?.end);
  const normalizedStart = Number.isFinite(start) ? Math.max(0, start) : DEFAULT_LOOP_SETTINGS.segment.start;
  const normalizedEnd = Number.isFinite(end) ? Math.max(0, end) : null;
  const enabled = value?.enabled === true && normalizedEnd !== null && normalizedEnd > normalizedStart;
  return { enabled, start: normalizedStart, end: enabled ? normalizedEnd : null };
}

export function normalizeLoopSettings(value) {
  const rawCount = Number.parseInt(value?.loopCount, 10);
  const loopCount = Number.isFinite(rawCount) ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount)) : DEFAULT_LOOP_SETTINGS.loopCount;
  const loopMode = LOOP_MODES.includes(value?.loopMode) ? value.loopMode : DEFAULT_LOOP_SETTINGS.loopMode;
  const targetVideoId = typeof value?.targetVideoId === "string" && value.targetVideoId.trim() ? value.targetVideoId.trim() : DEFAULT_LOOP_SETTINGS.targetVideoId;
  return { enabled: value?.enabled === true, loopCount, loopMode, targetVideoId, segment: normalizeSegment(value?.segment) };
}

export function shouldReplay(settings, loopsCompleted) {
  const normalized = normalizeLoopSettings(settings);
  const completed = Math.max(0, Number.parseInt(loopsCompleted, 10) || 0);
  if (!normalized.enabled || normalized.loopMode === "stop-current") return false;
  if (normalized.loopMode === "infinite") return true;
  return completed < normalized.loopCount;
}

export function nextLoopDecision(settings, loopsCompleted) {
  const normalized = normalizeLoopSettings(settings);
  const completed = Math.max(0, Number.parseInt(loopsCompleted, 10) || 0);
  if (!shouldReplay(normalized, completed)) return { replay: false, loopsCompleted: completed, remainingLoops: Math.max(0, normalized.loopCount - completed), settings: normalized };
  const nextCompleted = completed + 1;
  const remainingLoops = normalized.loopMode === "infinite" ? null : Math.max(0, normalized.loopCount - nextCompleted);
  return { replay: true, loopsCompleted: nextCompleted, remainingLoops, settings: normalized };
}

export function toStoredSettings(value) {
  const normalized = normalizeLoopSettings(value);
  return { enabled: normalized.enabled, loopCount: normalized.loopCount };
}
