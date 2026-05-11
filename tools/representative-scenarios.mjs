import fs from "node:fs";
import assert from "node:assert/strict";
import { nextLoopDecision, normalizeLoopSettings, toStoredSettings } from "../src/loop-policy.mjs";

const suite = JSON.parse(fs.readFileSync("samples/representative-suite.json", "utf8"));
const results = [];
for (const scenario of suite.scenarios) {
  if (typeof scenario.expectedReplays === "number") {
    let loopsCompleted = 0;
    let replays = 0;
    for (let i = 0; i < scenario.endedEvents; i += 1) {
      const decision = nextLoopDecision(scenario.settings, loopsCompleted);
      if (decision.replay) replays += 1;
      loopsCompleted = decision.loopsCompleted;
    }
    assert.equal(replays, scenario.expectedReplays, scenario.id);
    results.push({ id: scenario.id, pass: true, replays });
  }
  if (scenario.expectedNormalized) {
    const normalized = normalizeLoopSettings(scenario.settings);
    assert.deepEqual(normalized, scenario.expectedNormalized, scenario.id);
    results.push({ id: scenario.id, pass: true, normalized });
  }
  if (scenario.expectedStoredKeys) {
    const stored = toStoredSettings(scenario.settings);
    assert.deepEqual(Object.keys(stored), scenario.expectedStoredKeys, scenario.id);
    results.push({ id: scenario.id, pass: true, storedKeys: Object.keys(stored) });
  }
}
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/representative-scenarios-result.json", JSON.stringify({ product: suite.product, result: "passed", scenarios: results }, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ representativeScenarios: "passed", count: results.length }));