#!/bin/bash

# PostToolUse Hook
# Triggers: After tool completes successfully
# Purpose: Auto-formatting and hygiene

TOOL_NAME="$1"
TOOL_INPUT="$2"
TOOL_OUTPUT="$3"

# Auto-format after file edits
if [[ "$TOOL_NAME" == "edit" || "$TOOL_NAME" == "create_file" ]]; then
  # Extract file path from tool input
  FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.path' 2>/dev/null)
  
  if [ -n "$FILE_PATH" ] && [ -f "$FILE_PATH" ]; then
    # Determine file type and format accordingly
    case "$FILE_PATH" in
      *.js|*.jsx|*.ts|*.tsx)
        echo "🎨 Formatting JavaScript/TypeScript file..."
        npx prettier --write "$FILE_PATH" 2>/dev/null
        ;;
      *.json)
        echo "🎨 Formatting JSON file..."
        npx prettier --write "$FILE_PATH" 2>/dev/null
        ;;
      *.md)
        echo "🎨 Formatting Markdown file..."
        npx prettier --write "$FILE_PATH" 2>/dev/null
        ;;
    esac
  fi
fi

# Run linter after code changes
if [[ "$TOOL_NAME" == "edit" || "$TOOL_NAME" == "create_file" ]]; then
  FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.path' 2>/dev/null)
  
  case "$FILE_PATH" in
    *.js|*.jsx|*.ts|*.tsx)
      echo "🔍 Running ESLint..."
      npx eslint --fix "$FILE_PATH" 2>/dev/null || true
      ;;
  esac
fi

# Verify imports after file creation
if [ "$TOOL_NAME" == "create_file" ]; then
  FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.path' 2>/dev/null)
  
  case "$FILE_PATH" in
    *.tsx|*.jsx)
      # Check for React import
      if ! grep -q "^import.*React" "$FILE_PATH"; then
        echo "⚠️  Note: React component created without React import"
      fi
      ;;
  esac
fi

# Log successful operations
if [ "$CLAUDE_DEBUG" = "1" ]; then
  echo "[DEBUG] Tool completed: $TOOL_NAME"
  echo "[DEBUG] Output: ${TOOL_OUTPUT:0:100}..." # First 100 chars
fi

exit 0