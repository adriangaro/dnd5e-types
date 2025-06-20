#!/bin/bash
DND5E_DIR="dnd5e"
if [ ! -d "$DND5E_DIR" ]; then 
  # Added a small message for clarity when run directly
  echo "Info: Working directory '$DND5E_DIR' not found. Nothing to clean."
  exit 0; 
fi
echo "Cleaning source files from '$DND5E_DIR'..."
find "$DND5E_DIR" -type f ! -name '*.d.mts' -delete
find "$DND5E_DIR" -type d -empty -delete
echo "Cleanup complete."