#!/usr/bin/env node
// PreToolUse guard. Reads the hook JSON on stdin; exit 2 = block (stderr shown to the agent).
import { readFileSync } from "node:fs";

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const tool = input.tool_name;
const ti = input.tool_input ?? {};
const block = (msg) => {
  console.error(`BLOCKED by .claude/hooks/guard.mjs: ${msg}`);
  process.exit(2);
};

// A secret-bearing env file: .env, .env.local, .env.production ... but NOT *.example / *.sample / *.template
const SAFE_ENV = /\.env(\.[A-Za-z0-9_-]+)*\.(example|sample|template)$/;
const isSecretEnvPath = (p) => /(^|\/)\.env(\.[A-Za-z0-9_-]+)*$/.test(p) && !SAFE_ENV.test(p);

if (["Read", "Edit", "Write", "NotebookEdit"].includes(tool)) {
  const p = String(ti.file_path ?? ti.notebook_path ?? "");
  if (isSecretEnvPath(p)) block(`${tool} on secret env file (${p}). Only *.example files are allowed.`);
}
if (tool === "Grep" && /\.env(?![\w.-]*\.(example|sample|template))/.test(String(ti.glob ?? "") + String(ti.path ?? ""))) {
  block("searching env files is not allowed.");
}

if (tool === "Bash") {
  const cmd = String(ti.command ?? "");

  // 1. env files via shell (cat .env, source .env.local, grep x .env.production, printenv of secrets...)
  for (const m of cmd.matchAll(/(?:^|[\s\/"'=])(\.env[\w.-]*)/g)) {
    if (!SAFE_ENV.test(m[1])) block(`shell access to env file (${m[1]}). Only *.example files are allowed.`);
  }

  // 2. destructive commands
  if (/\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|--recursive\s+--force|--force\s+--recursive)\b/.test(cmd))
    block("rm -rf is not allowed.");
  if (/\bgit\s+push\b[^|;&]*(--force\b|--force-with-lease\b|\s-f\b|\s\+[\w\/-]+)/.test(cmd))
    block("force push is not allowed.");
  if (/\bgit\s+push\b[^|;&]*\b(main|master)\b/.test(cmd)) block("pushing directly to main/master is not allowed.");
  if (/\bgit\s+reset\s+--hard\b|\bgit\s+clean\s+-[a-z]*f/.test(cmd)) block("destructive git command; ask the user.");

  // 3. dangerous database commands
  if (/prisma\s+(migrate\s+reset|db\s+push\b[^|;&]*--accept-data-loss|db\s+execute)/.test(cmd))
    block("destructive prisma command; ask the user.");
  if (/\bDROP\s+(TABLE|DATABASE|SCHEMA)\b|\bTRUNCATE\b/i.test(cmd)) block("destructive SQL in a command.");

  // 4. any non-local database URL (production protection)
  const urls = cmd.match(/postgres(?:ql)?:\/\/[^\s"'`]+/gi) ?? [];
  for (const u of urls) {
    const host = u.replace(/^postgres(?:ql)?:\/\/(?:[^@\/]*@)?/i, "").split(/[\/:?]/)[0].toLowerCase();
    const okHosts = ["localhost", "127.0.0.1", "::1", "db", "postgres", "host.docker.internal"];
    if (!okHosts.includes(host)) block(`non-local database URL (host "${host}"). Agents only touch local/staging via env, never inline URLs.`);
  }
  // user-configurable extra markers (e.g. production hostnames), one per line, not committed secrets
  try {
    const extra = readFileSync(new URL("./prod-markers.txt", import.meta.url), "utf8")
      .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
    for (const m of extra) if (cmd.includes(m)) block(`command references production marker "${m}".`);
  } catch {}
}

process.exit(0);
