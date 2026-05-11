import test from "node:test";
import assert from "node:assert/strict";
import { MAX_LOOP_COUNT, MIN_LOOP_COUNT, STORED_SETTING_KEYS, nextLoopDecision, normalizeLoopSettings, normalizeSegment, shouldReplay, toStoredSettings } from "../src/loop-policy.mjs";

test("normalizes enabled and finite loop count", () => {
  assert.deepEqual(normalizeLoopSettings({ enabled: true, loopCount: "3" }), { enabled: true, loopCount: 3, loopMode: "count", targetVideoId: "all", segment: { enabled: false, start: 0, end: null } });
});

test("clamps loop count into supported range", () => {
  assert.equal(normalizeLoopSettings({ enabled: true, loopCount: -5 }).loopCount, MIN_LOOP_COUNT);
  assert.equal(normalizeLoopSettings({ enabled: true, loopCount: 250 }).loopCount, MAX_LOOP_COUNT);
});

test("does not replay when disabled", () => {
  assert.equal(shouldReplay({ enabled: false, loopCount: 3 }, 0), false);
});

test("supports infinite and stop-after-current loop modes", () => {
  assert.equal(shouldReplay({ enabled: true, loopCount: 1, loopMode: "infinite" }, 500), true);
  assert.equal(shouldReplay({ enabled: true, loopCount: 1, loopMode: "stop-current" }, 0), false);
  assert.equal(nextLoopDecision({ enabled: true, loopCount: 1, loopMode: "infinite" }, 3).remainingLoops, null);
});

test("replays exactly until loop count is reached", () => {
  let loopsCompleted = 0;
  const decisions = [];
  for (let i = 0; i < 4; i += 1) {
    const decision = nextLoopDecision({ enabled: true, loopCount: 2 }, loopsCompleted);
    decisions.push(decision.replay);
    loopsCompleted = decision.loopsCompleted;
  }
  assert.deepEqual(decisions, [true, true, false, false]);
  assert.equal(loopsCompleted, 2);
});

test("stored settings exclude page and media data", () => {
  const stored = toStoredSettings({ enabled: true, loopCount: 4, loopMode: "infinite", targetVideoId: "video-2", segment: { enabled: true, start: 4, end: 8 }, url: "https://example.com/watch", currentSrc: "https://cdn.example.com/movie.mp4" });
  assert.deepEqual(Object.keys(stored), STORED_SETTING_KEYS);
});

test("normalizes an A-B segment only when end is after start", () => {
  assert.deepEqual(normalizeSegment({ enabled: true, start: "3.5", end: "9" }), { enabled: true, start: 3.5, end: 9 });
  assert.deepEqual(normalizeSegment({ enabled: true, start: 10, end: 2 }), { enabled: false, start: 10, end: null });
});
