#!/usr/bin/env bash
# Standard project gate: type-check with BOTH compilers (tsgo + tsc) and run the vitest type-level
# suite. tsgo (@typescript/native-preview) is listed first as the fast primary checker, but BOTH are
# authoritative — the gate fails if either reports errors.
#
# NOTE: the deeply-recursive item-system graph (fvtt-types' `InterfaceToObject<Item>` × the dnd5e
# item subtypes, plus the activity/advancement collections) used to trip tsc's recursion limiter into
# FALSE-POSITIVE circularity errors once a consumer expanded a seam. That was fixed by pinning the
# `parent` of the base system/activity/advancement data models to abstract `Document.Any` (the
# item-contains-item cycle-break — see system-data-model.d.mts / base-activity.d.mts /
# base-advancement.d.mts), so tsc now has real headroom and stays authoritative.
#
# Usage:
#   bash scripts/gate.sh           # full gate: tsgo + tsc + vitest
#   bash scripts/gate.sh --quick   # fast: tsgo + tsc only, skip the vitest run
#
# Exit code is non-zero if any stage fails.

set -uo pipefail
cd "$(dirname "$0")/.."

QUICK=0
[ "${1:-}" = "--quick" ] && QUICK=1

TSC=node_modules/.bin/tsc
TSGO=node_modules/.bin/tsgo
VITEST=node_modules/.bin/vitest

fail=0

# $3 = "authoritative" (fails gate on errors) or "advisory" (reports only).
run_check() {
  local label="$1" bin="$2" mode="$3"
  local out; out="$($bin -p tsconfig.json --noEmit 2>&1)"
  local n; n="$(printf '%s\n' "$out" | grep -c 'error TS')"
  if [ "$n" -eq 0 ]; then
    printf '  ✓ %-16s 0 errors\n' "$label"
  elif [ "$mode" = "advisory" ]; then
    printf '  ~ %-16s %s errors (advisory — likely tsc recursion-budget false-positives; tsgo is authoritative)\n' "$label" "$n"
  else
    printf '  ✗ %-16s %s errors\n' "$label" "$n"
    printf '%s\n' "$out" | grep 'error TS' | sed -E 's#'"$PWD"'/##' | head -30 | sed 's/^/      /'
    fail=1
  fi
}

echo "── gate ─────────────────────────────────────────"
run_check "tsgo" "$TSGO" authoritative
run_check "tsc"  "$TSC"  authoritative

if [ "$QUICK" -eq 0 ]; then
  out="$($VITEST --run --typecheck 2>&1)"
  if printf '%s\n' "$out" | grep -qE 'Type Errors {2}no errors' && printf '%s\n' "$out" | grep -qE 'Test Files .* passed'; then
    files="$(printf '%s\n' "$out" | grep -oE 'Test Files .* passed \([0-9]+\)' | head -1)"
    printf '  ✓ %-12s %s\n' "vitest" "${files:-passed}"
  else
    printf '  ✗ %-12s type tests failed\n' "vitest"
    printf '%s\n' "$out" | grep -iE 'error|fail|✗' | head -30 | sed 's/^/      /'
    fail=1
  fi
else
  printf '  · %-12s skipped (--quick)\n' "vitest"
fi

echo "─────────────────────────────────────────────────"
if [ "$fail" -eq 0 ]; then echo "  gate: PASS"; else echo "  gate: FAIL"; fi
exit "$fail"
