import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import path from "node:path";

const GUARD = path.resolve(__dirname, "../.claude/hooks/guard.mjs");

function run(tool_name: string, tool_input: Record<string, unknown>) {
  const r = spawnSync("node", [GUARD], { input: JSON.stringify({ tool_name, tool_input }), encoding: "utf8" });
  return r.status;
}
const bash = (command: string) => run("Bash", { command });

describe("agent guard hook", () => {
  it.each([
    "cat .env",
    "source ./.env.production",
    "grep KEY .env.local",
    "rm -rf node_modules",
    "rm -fr dist",
    "git push --force origin feat/x",
    "git push -f origin feat/x",
    "git push origin main",
    "git reset --hard HEAD~1",
    "npx prisma migrate reset",
    "npx prisma db push --accept-data-loss",
    "DATABASE_URL=postgres://u:p@ep-x.neon.tech/db npx prisma migrate dev",
    "psql -c 'DROP TABLE Quote'",
  ])("blocks: %s", (cmd) => {
    expect(bash(cmd)).toBe(2);
  });

  it.each([
    "cat .env.example",
    "cat .env.production.example",
    'node -e "console.log(process.env.NODE_ENV)"',
    "git push -u origin feat/loyalty-ledger",
    "DATABASE_URL=postgresql://u:p@localhost:5432/nk npm test",
    "npm run check",
  ])("allows: %s", (cmd) => {
    expect(bash(cmd)).toBe(0);
  });

  it("blocks reading secret env files but not examples", () => {
    expect(run("Read", { file_path: "/repo/.env.local" })).toBe(2);
    expect(run("Edit", { file_path: "/repo/.env" })).toBe(2);
    expect(run("Read", { file_path: "/repo/.env.production.example" })).toBe(0);
    expect(run("Read", { file_path: "/repo/src/app/page.tsx" })).toBe(0);
  });

  it("fails open on malformed input (never wedges the agent)", () => {
    const r = spawnSync("node", [GUARD], { input: "not json", encoding: "utf8" });
    expect(r.status).toBe(0);
  });
});
