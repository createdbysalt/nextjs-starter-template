#!/bin/bash

# Validate Embed Hook
# Purpose: Lint JavaScript embeds before deployment

EMBED_FILE="$1"

if [ ! -f "$EMBED_FILE" ]; then
  echo "❌ Error: File not found: $EMBED_FILE"
  exit 1
fi

echo "🔍 Validating embed file: $EMBED_FILE"

# Check 1: Must have IIFE wrapper
if ! grep -q "^(function()" "$EMBED_FILE"; then
  echo "❌ Missing IIFE wrapper"
  echo "Embed code must start with: (function() {"
  exit 1
fi

# Check 2: No console.log in production code
if grep -q "console\.log" "$EMBED_FILE"; then
  echo "⚠️  Warning: console.log found in embed"
  echo "Remove before production deployment"
fi

# Check 3: Has 'use strict'
if ! grep -q "'use strict'" "$EMBED_FILE"; then
  echo "⚠️  Warning: Missing 'use strict'"
fi

# Check 4: Has DOM ready check
if ! grep -q "DOMContentLoaded\|document.readyState" "$EMBED_FILE"; then
  echo "⚠️  Warning: No DOM ready check found"
  echo "Animation may fail if DOM isn't loaded"
fi

# Check 5: Run ESLint
echo "Running ESLint..."
npx eslint "$EMBED_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Validation passed"
  exit 0
else
  echo "❌ ESLint errors found"
  exit 1
fi