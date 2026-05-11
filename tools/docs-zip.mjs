import fs from "node:fs";
import path from "node:path";

fs.mkdirSync("dist", { recursive: true });

const zipPath = "dist/movie-loop-tool-docs.zip";
const items = ["README.md", "AGENTS.md", "SKILL.md", "TODO.md", "package.json", "extension/manifest.json", "docs", "samples"];
const requiredEntries = [
  "README.md",
  "AGENTS.md",
  "SKILL.md",
  "TODO.md",
  "extension/manifest.json",
  "docs/requirements.md",
  "docs/specification.md",
  "docs/architecture.md",
  "docs/design.md",
  "docs/manual-test.md",
  "docs/qcds-evaluation.md",
  "docs/qcds-strict-metrics.json",
  "docs/release-checklist.md"
];

const files = collectFiles(items);
const entryNames = files.map((file) => file.entryName);
for (const entry of requiredEntries) {
  if (!entryNames.includes(entry)) throw new Error(`${entry} missing from docs zip input`);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
  let crc = index;
  for (let bit = 0; bit < 8; bit += 1) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

fs.writeFileSync(zipPath, createZip(files));

const result = { product: "movie-loop-tool", result: "passed", zipPath, bytes: fs.statSync(zipPath).size, includedRoots: items, requiredEntries, entries: entryNames };
fs.writeFileSync("dist/docs-zip-result.json", JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ docsZip: "passed", zipPath }));

function collectFiles(paths) {
  const files = [];
  for (const item of paths) {
    const absolute = path.resolve(item);
    if (!fs.existsSync(absolute)) throw new Error(`${item} is missing`);
    const stat = fs.statSync(absolute);
    if (stat.isDirectory()) {
      walkDirectory(absolute, files);
    } else {
      files.push(toZipEntry(absolute));
    }
  }
  return files.sort((a, b) => a.entryName.localeCompare(b.entryName));
}

function walkDirectory(directory, files) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkDirectory(absolute, files);
    else if (entry.isFile()) files.push(toZipEntry(absolute));
  }
}

function toZipEntry(absolute) {
  return {
    entryName: path.relative(process.cwd(), absolute).replaceAll("\\", "/"),
    data: fs.readFileSync(absolute)
  };
}

function createZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.entryName, "utf8");
    const data = entry.data;
    const crc = crc32(data);
    const { dosTime, dosDate } = dosDateTime(new Date());
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDirectory, end]);
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  return {
    dosTime: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    dosDate: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
