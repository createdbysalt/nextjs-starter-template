#!/bin/bash

# PreToolUse Hook
# Triggers: Before any tool executes
# Purpose: Safety rails and validation

TOOL_NAME="$1"
TOOL_INPUT="$2"

# Safety: Prevent commits to main branch
if [ "$TOOL_NAME" = "bash" ]; then
  CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
  
  if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
    if echo "$TOOL_INPUT" | grep -qi "commit\|push\|merge"; then
      echo "🚨 BLOCKED: Cannot commit/push to $CURRENT_BRANCH branch"
      echo "Please checkout a feature branch first"
      exit 1
    fi
  fi
fi

# Safety: Prevent deletion of critical files
if [ "$TOOL_NAME" = "bash" ]; then
  if echo "$TOOL_INPUT" | grep -qi "rm.*\(CLAUDE\.md\|package\.json\|\.env\)"; then
    echo "🚨 BLOCKED: Cannot delete critical files"
    echo "Files protected: CLAUDE.md, package.json, .env"
    exit 1
  fi
fi

# Safety: Warn on destructive database operations
if [ "$TOOL_NAME" = "bash" ]; then
  if echo "$TOOL_INPUT" | grep -qi "DROP\|TRUNCATE\|DELETE FROM"; then
    echo "⚠️  WARNING: Destructive database operation detected"
    echo "Operation: $TOOL_INPUT"
    echo "This requires explicit user approval"
    exit 1
  fi
fi

# Validation: Check network access for pnpm commands
if [[ "$TOOL_NAME" == "bash" && "$TOOL_INPUT" == *"pnpm install"* ]]; then
  if ! ping -c 1 registry.npmjs.org &> /dev/null; then
    echo "⚠️  WARNING: No network access to npm registry"
    echo "pnpm install may fail"
  fi
fi

# Log tool usage for debugging
if [ "$CLAUDE_DEBUG" = "1" ]; then
  echo "[DEBUG] Tool: $TOOL_NAME"
  echo "[DEBUG] Input: $TOOL_INPUT"
fi

exit 0