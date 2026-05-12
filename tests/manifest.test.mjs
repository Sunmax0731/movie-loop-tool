import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("extension/manifest.json", "utf8"));

test("manifest is MV3 and has side panel contract", () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.side_panel.default_path, "sidepanel/sidepanel.html");
  assert.equal(manifest.background.type, "module");
});

test("manifest exposes a keyboard command for no-panel toggling", () => {
  assert.equal(manifest.commands["toggle-auto-loop"].suggested_key.default, "Alt+Shift+L");
  assert.equal(typeof manifest.commands["toggle-auto-loop"].description, "string");
});

test("manifest keeps permissions bounded for video loop behavior", () => {
  assert.deepEqual(manifest.permissions.sort(), ["activeTab", "scripting", "sidePanel", "storage"].sort());
  assert.deepEqual(manifest.host_permissions.sort(), ["http://*/*", "https://*/*"].sort());
  assert.equal(manifest.permissions.includes("tabs"), false);
});

test("content script targets normal web pages only", () => {
  assert.equal(manifest.content_scripts.length, 1);
  assert.deepEqual(manifest.content_scripts[0].matches.sort(), ["http://*/*", "https://*/*"].sort());
  assert.deepEqual(manifest.content_scripts[0].js, ["content/video-loop-controller.js"]);
});
