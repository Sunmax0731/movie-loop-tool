export const DEFAULT_LOOP_SETTINGS = Object.freeze({ enabled: false, loopCount: 1 });
export const MIN_LOOP_COUNT = 1;
export const MAX_LOOP_COUNT = 99;
export const STORED_SETTING_KEYS = Object.freeze(["enabled", "loopCount"]);

export function normalizeLoopSettings(value) {
  const rawCount = Number.parseInt(value?.loopCount, 10);
  const loopCount = Number.isFinite(rawCount) ? Math.min(MAX_LOOP_COUNT, Math.max(MIN_LOOP_COUNT, rawCount)) : DEFAULT_LOOP_SETTINGS.loopCount;
  return { enabled: value?.enabled === true, loopCount };
}

export function shouldReplay(settings, loopsCompleted) {
  const normalized = normalizeLoopSettings(settings);
  const completed = Math.max(0, Number.parseInt(loopsCompleted, 10) || 0);
  return normalized.enabled && completed < normalized.loopCount;
}

export function nextLoopDecision(settings, loopsCompleted) {
  const normalized = normalizeLoopSettings(settings);
  const completed = Math.max(0, Number.parseInt(loopsCompleted, 10) || 0);
  if (!shouldReplay(normalized, completed)) return { replay: false, loopsCompleted: completed, remainingLoops: Math.max(0, normalized.loopCount - completed), settings: normalized };
  const nextCompleted = completed + 1;
  return { replay: true, loopsCompleted: nextCompleted, remainingLoops: Math.max(0, normalized.loopCount - nextCompleted), settings: normalized };
}

export function toStoredSettings(value) {
  return normalizeLoopSettings(value);
}