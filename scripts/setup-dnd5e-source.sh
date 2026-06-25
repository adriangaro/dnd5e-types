#!/bin/bash
# Sparse-checks-out the dnd5e .mjs source into the src/ shadow tree at author time.
# These .mjs files are needed so `typeof CharacterData` references in the .d.mts shadow
# resolve to the real classes. They are gitignored and excluded from publish.

set -euo pipefail

DND5E_REPO_URL="https://github.com/foundryvtt/dnd5e.git"
WORKSPACE_DIR="src"
CACHE_DIR=".repos/dnd5e"

# --- Phase 1: Determine Version ---
if [ -n "${1:-}" ]; then
  VERSION_REF=$1
  echo "Using provided version: $VERSION_REF"
else
  echo "Info: No version provided. Reading default from package.json..."
  VERSION_REF=$(node -p "require('./package.json').dnd5e.currentVersion")
  if [ -z "$VERSION_REF" ]; then
    echo "Error: Could not read 'dnd5e.currentVersion' from package.json."
    exit 1
  fi
  echo "Using default version: $VERSION_REF"
fi

# --- Phase 2: Initialize and Configure the Cache ---
echo "--- Ensuring repository cache is correctly configured ---"
if [ ! -d "$CACHE_DIR/.git" ]; then
  echo "Cache not found. Initializing a new sparse repository..."
  mkdir -p "$CACHE_DIR"
  ( cd "$CACHE_DIR" && git init -q && git remote add origin "$DND5E_REPO_URL" )
fi

( cd "$CACHE_DIR"
  echo "Configuring sparse checkout for essential files..."
  git sparse-checkout init > /dev/null 2>&1
  git sparse-checkout set "dnd5e.mjs" "module/" > /dev/null 2>&1
)

# --- Phase 3: Fetch ONLY the required version ---
echo "--- Fetching data for '$VERSION_REF' into cache ---"
( cd "$CACHE_DIR"
  git fetch --tags --prune origin > /dev/null 2>&1 || true
  git fetch --depth=1 origin "$VERSION_REF" > /dev/null 2>&1
  git checkout -f FETCH_HEAD > /dev/null 2>&1
)

# --- Phase 4: Clean workspace source and copy fresh ---
echo "--- Cleaning colocated source and copying fresh ---"
bash scripts/cleanup-dnd5e-source.sh
mkdir -p "$WORKSPACE_DIR"

if [ ! -f "$CACHE_DIR/dnd5e.mjs" ] || [ ! -d "$CACHE_DIR/module" ]; then
  echo "Error: Critical files missing from cache after checkout."
  exit 1
fi

echo "Copying dnd5e.mjs + module/ into $WORKSPACE_DIR/ ..."
cp "$CACHE_DIR/dnd5e.mjs" "$WORKSPACE_DIR/"
cp -r "$CACHE_DIR/module/" "$WORKSPACE_DIR/"

echo "-----------------------------------------------------"
echo "Success! Colocated dnd5e source for version '$VERSION_REF'."
echo "-----------------------------------------------------"
