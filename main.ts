// Notes From a Passive-Aggressive Fridge — make.fun entry.
//
// Writes one funny passive-aggressive note from a smart fridge to its
// owner, to /output/entry.txt. Deterministic: the same fixed text on
// every run. Node.js 22, standard library only, no network, no clock,
// no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const NOTE =
  "I counted 14 door openings today. Zero meals taken. The leftovers expired Tuesday. I'm keeping them as evidence.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, NOTE, "utf8");

  // Self-checks: the gate requires UTF-8, 1-200 chars, not whitespace-only,
  // and the judge reads a single line. Counts are computed from the text
  // itself, never assumed.
  const chars = [...NOTE].length;
  const lines = NOTE.split("\n").length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (NOTE.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }
  if (lines !== 1) {
    throw new Error(`entry must be a single line, found ${lines}`);
  }

  // Read the file back: a truncated or altered write fails loudly here
  // instead of being discovered by the judge.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== NOTE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from NOTE");
  }
  if ([...written].length !== chars || written.split("\n").length !== lines) {
    throw new Error("read-back count mismatch");
  }
  console.log(
    `Wrote ${chars} characters, ${lines} line to ${OUTPUT_PATH} (read-back verified)`,
  );
}

main();
