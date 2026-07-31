#!/usr/bin/env node
// CI security gate: `npm audit --audit-level=high`, minus a scoped,
// SELF-EXPIRING allowlist for advisories that have no non-breaking fix.
//
// Every allowlist entry must carry a reason, a tracking issue, and an
// expiry date. After expiry the advisory counts again and the gate goes
// red — an allowlist entry is a loan, not a shrug. Anything high/critical
// and not allowlisted fails the gate exactly as before.
//
// Run: node scripts/audit-gate.mjs

import { execSync } from "node:child_process";

const ALLOWLIST = [
  {
    id: "GHSA-mh99-v99m-4gvg", // brace-expansion OOM DoS, vulnerable <=5.0.7
    reason:
      "Only patched in brace-expansion 5.0.8+, which switched to named " +
      "exports and breaks every legacy CJS consumer in this tree at " +
      "runtime (eslint@8 chain, serve-handler, vitest coverage's nested " +
      "minimatch — verified: coverage crashes with 'brace_expansion_1." +
      "default is not a function'). npm's own fix is a breaking eslint-10/" +
      "vitest-4 toolchain migration. All per-line patched releases " +
      "(1.1.18 / 2.1.4 / 5.0.9) are pinned via overrides, which fixes the " +
      "sibling advisory GHSA-3jxr-9vmj-r5cp outright and minimizes this " +
      "one's surface. Dev/tooling + static-serve glob paths only.",
    trackingIssue: "#17",
    expires: "2026-09-30",
  },
];

function fail(msg) {
  console.error(`audit-gate: ${msg}`);
  process.exit(1);
}

let raw;
try {
  // npm audit exits non-zero when vulnerabilities exist; capture stdout anyway.
  raw = execSync("npm audit --json", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
  });
} catch (err) {
  if (!err.stdout) fail(`npm audit produced no output: ${err.message}`);
  raw = err.stdout.toString();
}

let report;
try {
  report = JSON.parse(raw);
} catch {
  fail("could not parse `npm audit --json` output — failing closed.");
}

const today = new Date().toISOString().slice(0, 10);
const active = new Map();
const expired = [];
for (const entry of ALLOWLIST) {
  if (entry.expires >= today) {
    active.set(entry.id, entry);
  } else {
    expired.push(entry);
  }
}

const offenders = new Map();
for (const vuln of Object.values(report.vulnerabilities ?? {})) {
  for (const via of vuln.via ?? []) {
    if (typeof via !== "object" || via === null) continue; // chain refs
    if (!["high", "critical"].includes(via.severity)) continue;
    const id = (via.url ?? "").split("/").pop() || `unknown:${via.title}`;
    if (active.has(id)) continue;
    offenders.set(id, { title: via.title, severity: via.severity, name: via.name });
  }
}

for (const entry of expired) {
  console.error(
    `audit-gate: allowlist entry ${entry.id} EXPIRED ${entry.expires} ` +
      `(tracking ${entry.trackingIssue}) — it now counts again.`,
  );
}

for (const [id, entry] of active) {
  console.log(
    `audit-gate: ignoring ${id} until ${entry.expires} (tracking ${entry.trackingIssue})`,
  );
}

if (offenders.size > 0 || expired.length > 0) {
  for (const [id, o] of offenders) {
    console.error(`audit-gate: BLOCKING ${o.severity} ${id} — ${o.name}: ${o.title}`);
  }
  fail(`${offenders.size + expired.length} high/critical advisories block the gate.`);
}

console.log("audit-gate: clean (no non-allowlisted high/critical advisories).");
