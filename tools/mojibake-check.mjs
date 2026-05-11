import fs from "node:fs";
import path from "node:path";

const suspiciousFragments = [
  "\uFFFD",
  "\u7E3A",
  "\u7E67",
  "\u7E5D",
  "\u8B41",
  "\u870D",
  "\u9AE2",
  "\u9B2F",
  "\u90E2",
  "\u9A5B",
  "\u90B5",
  "\u96B4"
];
const extensions = new Set([".md", ".json", ".js", ".mjs", ".html", ".css", ".txt"]);
const findings = [];

walk(".");

fs.mkdirSync("dist", { recursive: true });
const result = { product: "movie-loop-tool", result: findings.length === 0 ? "passed" : "failed", findings };
fs.writeFileSync("dist/mojibake-check-result.json", JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ mojibakeCheck: result.result, findings: findings.length }));
if (findings.length) process.exit(1);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "dist"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!extensions.has(path.extname(entry.name))) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const fragment of suspiciousFragments) {
      if (text.includes(fragment)) findings.push({ file: full.replaceAll("\\", "/"), fragment });
    }
  }
}
