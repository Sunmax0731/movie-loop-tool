import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const config = JSON.parse(fs.readFileSync("docs/platform-runtime-gate.json", "utf8"));
const result = runChromeExtensionCheck(config);
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/platform-runtime-gate-result.json", JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ product: config.product, platform: config.platformType, pass: result.pass }));
if (!result.pass && result.status !== "blocked-by-environment") process.exit(1);

function runChromeExtensionCheck(value) {
  if (value.platformType !== "chrome-extension") return fail("unsupported platform type");
  const manifestPath = value.manifestPath || "extension/manifest.json";
  if (!fs.existsSync(manifestPath)) return fail("Chrome manifest missing", { manifestPath });
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const extensionRoot = path.resolve(path.dirname(manifestPath));
  const staticChecks = validateManifest(manifest, extensionRoot);
  if (!staticChecks.pass) return fail(staticChecks.reason, staticChecks);
  const chrome = findChrome();
  if (!chrome) return blocked("Chrome executable missing", { staticChecks });
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "movie-loop-tool-chrome-"));
  const args = ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-background-networking", "--disable-sync", "--disable-component-update", "--disable-features=MediaRouter,OptimizationHints,AutofillServerCommunication,Translate", "--no-first-run", "--no-default-browser-check", "--user-data-dir=" + userDataDir, "--disable-extensions-except=" + extensionRoot, "--load-extension=" + extensionRoot, "--dump-dom", "data:text/html,<html><body><video controls></video></body></html>"];
  const run = spawnSync(chrome, args, { encoding: "utf8", timeout: 60000 });
  const tempProfileCleanup = cleanupTempProfile(userDataDir);
  if (run.error) return blocked("Chrome executable launch blocked by environment", { manifest: manifestPath, chromeExecutable: chrome, error: { code: run.error.code, message: run.error.message }, staticChecks, tempProfileCleanup });
  const stderr = run.stderr || "";
  const loadError = /Failed to load extension|Error loading extension|Manifest is not valid/i.test(stderr);
  return run.status === 0 && !loadError ? ok({ manifest: manifestPath, manifestVersion: 3, chromeExecutable: chrome, extensionLoad: "passed", staticChecks, tempProfileCleanup }) : fail("Chrome extension load failed", { manifest: manifestPath, status: run.status, signal: run.signal, stderr: stderr.slice(0, 2000), staticChecks, tempProfileCleanup });
}

function cleanupTempProfile(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
    return { status: "removed", path: dir };
  } catch (error) {
    return {
      status: "deferred",
      path: error.path || dir,
      code: error.code,
      message: error.message
    };
  }
}

function validateManifest(manifest, extensionRoot) {
  if (manifest.manifest_version !== 3) return { pass: false, reason: "Chrome manifest is not MV3" };
  const missingPermissions = ["activeTab", "storage", "sidePanel"].filter((permission) => !manifest.permissions?.includes(permission));
  if (missingPermissions.length) return { pass: false, reason: "required permissions missing", missingPermissions };
  const requiredFiles = [manifest.side_panel?.default_path, manifest.background?.service_worker, ...(manifest.content_scripts || []).flatMap((script) => script.js || [])].filter(Boolean);
  const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(extensionRoot, file)));
  if (missingFiles.length) return { pass: false, reason: "manifest referenced files missing", missingFiles };
  const contentMatches = (manifest.content_scripts || []).flatMap((script) => script.matches || []);
  const missingMatches = ["http://*/*", "https://*/*"].filter((match) => !contentMatches.includes(match));
  if (missingMatches.length) return { pass: false, reason: "content script web matches missing", missingMatches };
  const sidePanelControls = validateSidePanelControls(extensionRoot, manifest.side_panel?.default_path);
  if (sidePanelControls.status !== "passed") return { pass: false, reason: "side panel controls missing", sidePanelControls };
  return { pass: true, requiredFiles, contentMatches, sidePanelControls };
}

function validateSidePanelControls(extensionRoot, sidePanelPath) {
  const htmlPath = path.join(extensionRoot, sidePanelPath || "");
  if (!fs.existsSync(htmlPath)) return { status: "failed", missing: ["sidepanel html"] };
  const html = fs.readFileSync(htmlPath, "utf8");
  const requiredIds = ["enabledToggle", "loopCount", "loopMode", "targetVideo", "segmentEnabled", "segmentStart", "segmentEnd", "resetCounts", "refreshStatus", "lastError"];
  const missing = requiredIds.filter((id) => !new RegExp(`id=["']${id}["']`).test(html));
  return missing.length ? { status: "failed", missing } : { status: "passed", requiredIds };
}

function findChrome() { return ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find((candidate) => fs.existsSync(candidate)); }
function ok(extra = {}) { return { product: config.product, platformType: config.platformType, pass: true, method: "mv3-manifest-and-chrome-load-extension", manualTest: "not-run-by-codex", ...extra }; }
function fail(reason, extra = {}) { return { product: config.product, platformType: config.platformType, pass: false, reason, manualTest: "not-run-by-codex", ...extra }; }
function blocked(reason, extra = {}) { return { product: config.product, platformType: config.platformType, pass: false, status: "blocked-by-environment", reason, manualTest: "not-run-by-codex", ...extra }; }
