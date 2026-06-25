#!/bin/bash
# Generates a per-release diff checklist of changed dnd5e source files between two versions,
# so each dnd5e release can be re-synced into the .d.mts shadow mechanically.
# Versions default to package.json dnd5e.diff.{from,to}.

set -uo pipefail

CACHE_DIR=".repos/dnd5e"

FROM_VERSION="${1:-$(node -p "require('./package.json').dnd5e.diff.from")}"
TO_VERSION="${2:-$(node -p "require('./package.json').dnd5e.diff.to")}"

if [ -z "$FROM_VERSION" ] || [ -z "$TO_VERSION" ]; then
  echo "Error: Could not determine versions to diff. Check args or package.json."
  exit 1
fi
echo "Generating diff from '$FROM_VERSION' to '$TO_VERSION'..."

OUTPUT_FILE="dnd5e_changes_${FROM_VERSION}_to_${TO_VERSION}.txt"
CHECKLIST_FILE="dnd5e_diff_checklist_${FROM_VERSION}_to_${TO_VERSION}.md"

if [ -f "$CHECKLIST_FILE" ]; then
  echo "Checklist already exists: $CHECKLIST_FILE (delete it to regenerate). Skipping."
  exit 0
fi

if [ ! -d "$CACHE_DIR/.git" ]; then
  echo "Error: Repository cache not found. Run scripts/setup-dnd5e-source.sh first."
  exit 1
fi

resolve_version_ref() {
  local version=$1
  if git -C "$CACHE_DIR" tag -l | grep -q "^${version}$"; then echo "$version"
  elif git -C "$CACHE_DIR" branch -r | grep -q "origin/${version}$"; then echo "origin/$version"
  else echo "origin/$version"; fi
}

git -C "$CACHE_DIR" fetch --tags --prune origin > /dev/null 2>&1 || true
git -C "$CACHE_DIR" fetch origin "$FROM_VERSION" > /dev/null 2>&1 || true
git -C "$CACHE_DIR" fetch origin "$TO_VERSION" > /dev/null 2>&1 || true

FROM_REF=$(resolve_version_ref "$FROM_VERSION")
TO_REF=$(resolve_version_ref "$TO_VERSION")
echo "Resolved: '$FROM_VERSION' -> '$FROM_REF', '$TO_VERSION' -> '$TO_REF'"

git -C "$CACHE_DIR" diff --name-status "$FROM_REF" "$TO_REF" -- dnd5e.mjs module/ > "$OUTPUT_FILE"
if [ $? -ne 0 ]; then
  echo "Error: Failed to generate diff. Check both versions exist remotely."
  exit 1
fi

CHANGED_FILES=$(git -C "$CACHE_DIR" diff --name-only "$FROM_REF" "$TO_REF" -- dnd5e.mjs module/)

{
  echo "# Diff Checklist: $FROM_VERSION → $TO_VERSION"
  echo ""
  echo "## Files to Review"
  echo ""
} > "$CHECKLIST_FILE"

TOTAL_FILES=0
for file in $CHANGED_FILES; do
  [ -n "$file" ] || continue
  echo "- [ ] \`$file\`" >> "$CHECKLIST_FILE"
  TOTAL_FILES=$((TOTAL_FILES + 1))
done

{
  echo ""
  echo "## Summary"
  echo ""
  echo "- **Total files changed:** $TOTAL_FILES"
  echo "- **From:** $FROM_VERSION  **To:** $TO_VERSION"
  echo "- **Summary diff:** [$OUTPUT_FILE](./$OUTPUT_FILE)"
} >> "$CHECKLIST_FILE"

echo "Success! $TOTAL_FILES changed files. Checklist: $CHECKLIST_FILE"
