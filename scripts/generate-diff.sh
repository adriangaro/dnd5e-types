#!/bin/bash

# ---
# (Configurable Version) Uses "from" and "to" versions from package.json if not provided.
# ---

# --- Configuration ---
CACHE_DIR=".repos/dnd5e"
WORKSPACE_DIR="dnd5e"

# --- Determine Versions ---
# Check for 'from' version (argument 1)
if [ -n "$1" ]; then
  FROM_VERSION=$1
else
  FROM_VERSION=$(node -p "require('./package.json').dnd5e.diff.from")
fi

# Check for 'to' version (argument 2)
if [ -n "$2" ]; then
  TO_VERSION=$2
else
  TO_VERSION=$(node -p "require('./package.json').dnd5e.diff.to")
fi

# Validate
if [ -z "$FROM_VERSION" ] || [ -z "$TO_VERSION" ]; then
  echo "Error: Could not determine versions to diff. Check args or package.json."
  exit 1
fi
echo "Generating diff from '$FROM_VERSION' to '$TO_VERSION'..."

# --- Script Logic ---
OUTPUT_FILE="dnd5e_changes_${FROM_VERSION}_to_${TO_VERSION}.txt"
CHECKLIST_FILE="dnd5e_diff_checklist_${FROM_VERSION}_to_${TO_VERSION}.md"

# Check if checklist already exists for this version combination
if [ -f "$CHECKLIST_FILE" ]; then
  echo "-----------------------------------------------------"
  echo "Checklist already exists: $CHECKLIST_FILE"
  echo "For the same version combination ($FROM_VERSION → $TO_VERSION),"
  echo "the diff should be identical. Skipping generation to preserve"
  echo "any progress you've made on the checklist."
  echo ""
  echo "If you want to regenerate, delete the existing checklist file first:"
  echo "  rm \"$CHECKLIST_FILE\""
  echo "-----------------------------------------------------"
  exit 0
fi

if [ ! -d "$CACHE_DIR/.git" ]; then
  echo "Error: Repository cache not found. Please run the setup script first."
  exit 1
fi

cd "$CACHE_DIR"

# Ensure both versions are available in the cache
echo "Fetching required versions for diff..."
git fetch --tags --prune origin > /dev/null 2>&1
git fetch origin "$FROM_VERSION" > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Warning: Could not fetch '$FROM_VERSION'. It may already be available locally."
fi
git fetch origin "$TO_VERSION" > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Warning: Could not fetch '$TO_VERSION'. It may already be available locally."
fi

# Function to resolve version reference (branch vs tag)
resolve_version_ref() {
  local version=$1
  # Check if it's a tag
  if git tag -l | grep -q "^${version}$"; then
    echo "$version"
  # Check if it's a remote branch
  elif git branch -r | grep -q "origin/${version}$"; then
    echo "origin/$version"
  # Default to trying as remote branch first, then tag
  else
    echo "origin/$version"
  fi
}

FROM_REF=$(resolve_version_ref "$FROM_VERSION")
TO_REF=$(resolve_version_ref "$TO_VERSION") 

echo "Resolved references: '$FROM_VERSION' -> '$FROM_REF', '$TO_VERSION' -> '$TO_REF'"

# Read sparse checkout patterns dynamically
SPARSE_PATTERNS=$(git sparse-checkout list 2>/dev/null)
if [ -z "$SPARSE_PATTERNS" ]; then
  echo "Warning: No sparse checkout patterns found. Using all files."
  DIFF_ARGS=""
else
  echo "Using sparse checkout patterns: $(echo $SPARSE_PATTERNS | tr '\n' ' ')"
  # Convert patterns to git diff arguments
  DIFF_ARGS=""
  for pattern in $SPARSE_PATTERNS; do
    DIFF_ARGS="$DIFF_ARGS $pattern"
  done
  DIFF_ARGS="-- $DIFF_ARGS"
fi

# Generate the summary diff file
echo "Generating summary diff..."
git diff --name-status "$FROM_REF" "$TO_REF" $DIFF_ARGS > "../../$OUTPUT_FILE"
DIFF_EXIT_CODE=$?

# Check if diff was successful
if [ $DIFF_EXIT_CODE -ne 0 ]; then
  cd ../..
  echo "-----------------------------------------------------"
  echo "Error: Failed to generate diff between '$FROM_VERSION' and '$TO_VERSION'."
  echo "Please check that both versions exist in the remote repository."
  echo "-----------------------------------------------------"
  exit 1
fi

# Get list of changed files
echo "Getting list of changed files..."
CHANGED_FILES=$(git diff --name-only "$FROM_REF" "$TO_REF" $DIFF_ARGS)

cd ../..

# Initialize the checklist file
echo "# Diff Checklist: $FROM_VERSION → $TO_VERSION" > "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"
echo "Generated on: $(date)" >> "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"
echo "## Files to Review" >> "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"

# Generate individual diff files and checklist items
TOTAL_FILES=0
for file in $CHANGED_FILES; do
  if [ -n "$file" ]; then
    echo "Processing diff for: $file"
    
    # Create directory structure in workspace if it doesn't exist
    WORKSPACE_FILE="$WORKSPACE_DIR/$file"
    WORKSPACE_DIR_PATH=$(dirname "$WORKSPACE_FILE")
    mkdir -p "$WORKSPACE_DIR_PATH"
    
    # Generate individual diff file
    DIFF_FILE="$WORKSPACE_FILE.diff"
    cd "$CACHE_DIR"
    git diff "$FROM_REF" "$TO_REF" -- "$file" > "../../$DIFF_FILE"
    cd ../..
    
    # Add to checklist
    echo "- [ ] \`$file\` ([diff](./$DIFF_FILE))" >> "$CHECKLIST_FILE"
    
    TOTAL_FILES=$((TOTAL_FILES + 1))
  fi
done

# Add summary to checklist
echo "" >> "$CHECKLIST_FILE"
echo "## Summary" >> "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"
echo "- **Total files changed:** $TOTAL_FILES" >> "$CHECKLIST_FILE"
echo "- **From version:** $FROM_VERSION" >> "$CHECKLIST_FILE"
echo "- **To version:** $TO_VERSION" >> "$CHECKLIST_FILE"
echo "- **Summary diff:** [$OUTPUT_FILE](./$OUTPUT_FILE)" >> "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"
echo "## Progress" >> "$CHECKLIST_FILE"
echo "" >> "$CHECKLIST_FILE"
echo "- [ ] Review all individual diffs" >> "$CHECKLIST_FILE"
echo "- [ ] Update type definitions" >> "$CHECKLIST_FILE"
echo "- [ ] Test changes" >> "$CHECKLIST_FILE"
echo "- [ ] Update documentation if needed" >> "$CHECKLIST_FILE"

echo "-----------------------------------------------------"
echo "Success! Generated diff files:"
echo "  Summary diff: $OUTPUT_FILE"
echo "  Checklist: $CHECKLIST_FILE"
echo "  Individual diffs: $TOTAL_FILES files in $WORKSPACE_DIR/"
echo "-----------------------------------------------------"