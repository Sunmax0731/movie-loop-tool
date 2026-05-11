import fs from "node:fs";

const allowed = ["S+", "S-", "A+", "A-", "B+", "B-", "C+", "C-", "D+", "D-"];
const axes = ["Quality", "Cost", "Delivery", "Satisfaction"];
const rank = new Map(allowed.slice().reverse().map((grade, index) => [grade, index]));
const metrics = readJson("docs/qcds-strict-metrics.json");
const platform = readJson("dist/platform-runtime-gate-result.json");
const scenarios = readJson("dist/representative-scenarios-result.json");
const docsZip = readJson("dist/docs-zip-result.json");
const mojibake = readJson("dist/mojibake-check-result.json");
if (JSON.stringify(metrics.gradeScale) !== JSON.stringify(allowed)) throw new Error("QCDS grade scale must match the strict allowed values");
for (const axis of axes) if (!allowed.includes(metrics.grades?.[axis])) throw new Error(axis + " grade is invalid");
const platformBlocked = platform.status === "blocked-by-environment";
if (platform.pass !== true && !platformBlocked) throw new Error("platform runtime gate failed");
if (scenarios.result !== "passed") throw new Error("representative scenarios failed");
if (docsZip.result !== "passed") throw new Error("docs zip failed");
if (mojibake.result !== "passed") throw new Error("mojibake check failed");
if (platform.pass !== true) for (const axis of ["Quality", "Satisfaction"]) if (isAbove(metrics.grades[axis], "B+")) throw new Error(axis + " must be B+ or below when platform gate fails or is blocked");
const belowAMinus = axes.filter((axis) => isBelow(metrics.grades[axis], "A-"));
const validation = { product: "movie-loop-tool", result: "passed", qcds: metrics.grades, belowAMinus, platformRuntimeGate: platform, representativeScenarios: scenarios.scenarios.length, docsZip: docsZip.zipPath, manualTest: metrics.manualTestStatus, githubPublication: metrics.githubPublicationStatus };
fs.mkdirSync("dist", { recursive: true });
writeJson("dist/validation-result.json", validation);
writeJson("dist/release-evidence.json", { ...validation, releaseReadiness: belowAMinus.length === 0 ? "ready-after-manual-test" : "blocked-items-documented", generatedAt: new Date().toISOString() });
console.log(JSON.stringify({ qcds: metrics.grades, belowAMinus }));
function readJson(file) { if (!fs.existsSync(file)) throw new Error(file + " is missing"); return JSON.parse(fs.readFileSync(file, "utf8")); }
function writeJson(file, value) { fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", "utf8"); }
function isAbove(value, cap) { return (rank.get(value) ?? -1) > (rank.get(cap) ?? -1); }
function isBelow(value, floor) { return (rank.get(value) ?? -1) < (rank.get(floor) ?? -1); }
