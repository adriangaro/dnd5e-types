#!/bin/bash
# Removes the colocated dnd5e source (everything under src/ that is NOT a hand-authored .d.mts).
# Run before publish so the artifact is declarations-only.

set -euo pipefail

DND5E_DIR="src"
if [ ! -d "$DND5E_DIR" ]; then
  echo "Info: '$DND5E_DIR' not found. Nothing to clean."
  exit 0
fi
echo "Cleaning colocated source files from '$DND5E_DIR' (keeping *.d.mts)..."
find "$DND5E_DIR" -type f ! -name '*.d.mts' -delete
find "$DND5E_DIR" -type d -empty -delete
echo "Cleanup complete."
