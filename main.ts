// Notes From a Passive-Aggressive Fridge — make.fun entry.
//
// Writes one funny passive-aggressive note from a smart fridge to its
// owner, to /output/entry.txt. Deterministic: the same fixed text on
// every run. Node.js 22, standard library only, no network, no clock,
// no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

const NOTE =
  "I counted 14 door openings today. Zero meals taken. The leftovers expired Tuesday. I'm keeping them as evidence.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, NOTE, "utf8");

  // Self-checks: the gate requires UTF-8, 1-200 chars, not whitespace-only,
  // and the judge reads a single line.
  const chars = [...NOTE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (NOTE.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }
  if (NOTE.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
