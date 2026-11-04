#!/usr/bin/env bash
# PostToolUse (Edit|Write): typecheck + lint the changed file. Exit 2 feeds failures back to the agent.
set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

payload="$(cat)"
file="$(printf '%s' "$payload" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log(j.tool_input?.file_path??"")}catch{console.log("")}})')"

case "$file" in
  *.ts|*.tsx|*.mjs|*.js) ;;
  *) exit 0 ;;
esac
[ -x node_modules/.bin/tsc ] || exit 0   # deps not installed (e.g. fresh worktree): skip silently

fail=0
out="$(node_modules/.bin/tsc --noEmit --pretty false 2>&1)" || { fail=1; echo "typecheck failed:" >&2; echo "$out" | head -30 >&2; }
if [ -x node_modules/.bin/eslint ]; then
  out="$(node_modules/.bin/eslint "$file" 2>&1)" || { fail=1; echo "lint failed for $file:" >&2; echo "$out" | head -30 >&2; }
fi
[ "$fail" -eq 0 ] || exit 2
exit 0
