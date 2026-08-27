import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve("src/data/projects.ts"), "utf8");
const matches = [...source.matchAll(/"(\/images\/projects\/[^"']+)"/g)].map((match) => match[1]);
const assets = [...new Set(matches)];
const missing = assets.filter((asset) => {
  const path = resolve("public", asset.slice(1));
  return !existsSync(path) || statSync(path).size === 0;
});

if (assets.length === 0) {
  console.error("No portfolio assets were discovered in src/data/projects.ts.");
  process.exit(1);
}

if (missing.length > 0) {
  console.error(`Missing ${missing.length} portfolio assets:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${assets.length} portfolio assets.`);
