import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Guard: no em dash (U+2014) anywhere under src/. Visitor-facing copy in every
// locale is written with full stops, commas, colons or brackets instead. An
// en dash (U+2013) is still allowed, but only inside numeric ranges such as
// "08:30–20:00".
const SRC = join(__dirname, "..", "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

test("src/ contains no em dashes", () => {
  const offenders: string[] = [];
  for (const file of walk(SRC)) {
    if (!/\.(tsx?|jsx?|mjs|json|css|md|txt)$/.test(file)) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes("—")) {
        offenders.push(`${relative(SRC, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }
  expect(offenders, `em dashes found:\n${offenders.join("\n")}`).toEqual([]);
});
