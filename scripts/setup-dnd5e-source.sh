#!/bin/bash

# --- Configuration ---
DND5E_REPO_URL="https://github.com/foundryvtt/dnd5e.git"
WORKSPACE_DIR="dnd5e"
CACHE_DIR=".repos/dnd5e"

# --- Phase 1: Determine Version ---
if [ -n "$1" ]; then
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
  cd "$CACHE_DIR"
  git init -q
  git remote add origin "$DND5E_REPO_URL"
  cd ../..
fi

# This is the most important change. We now use the robust, modern command suite.
cd "$CACHE_DIR"
echo "Configuring sparse checkout for essential files..."
# Initialize sparse-checkout (we specifically do NOT use --cone mode).
git sparse-checkout init > /dev/null 2>&1
# Reliably set the paths we want to track.
git sparse-checkout set "dnd5e.mjs" "module/" > /dev/null 2>&1
cd ../..

# --- Phase 3: Fetch ONLY the Required Version and Checkout into Cache ---
echo "--- Fetching data for '$VERSION_REF' into cache ---"
cd "$CACHE_DIR"
git fetch --tags --prune origin > /dev/null 2>&1
git fetch --depth=1 origin "$VERSION_REF" > /dev/null 2>&1
if [ $? -ne 0 ]; then echo "Error: Failed to fetch '$VERSION_REF'. Please check the version name."; exit 1; fi

echo "Checking out '$VERSION_REF' in cache..."
git checkout -f FETCH_HEAD > /dev/null 2>&1
if [ $? -ne 0 ]; then echo "Error: Failed to checkout '$VERSION_REF' in cache."; exit 1; fi

# --- Phase 4: Clean Workspace and Copy Files ---
cd ../.. # Go back to project root before cleaning
echo "--- Cleaning working directory and copying source files ---"
sh scripts/cleanup-dnd5e-source.sh
mkdir -p "$WORKSPACE_DIR"

# Verify that the necessary files exist in the cache before copying
if [ ! -f "$CACHE_DIR/dnd5e.mjs" ] || [ ! -d "$CACHE_DIR/module" ]; then
    echo "Error: Critical files are missing from the cache after checkout."
    echo "This may be an issue with the sparse-checkout process on your git version."
    exit 1
fi

echo "Copying dnd5e.mjs..."
cp "$CACHE_DIR/dnd5e.mjs" "$WORKSPACE_DIR/"

echo "Copying module/ directory..."
cp -r "$CACHE_DIR/module/" "$WORKSPACE_DIR/"

echo "-----------------------------------------------------"
echo "Success! Your workspace is ready for development."
echo "Using source files from version '$VERSION_REF'."
echo "-----------------------------------------------------"