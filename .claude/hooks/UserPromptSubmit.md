#!/bin/bash

# UserPromptSubmit Hook
# Triggers: Before user prompt is processed
# Purpose: Intent detection and auto-skill loading

USER_PROMPT="$1"

# Intent detection keywords
if echo "$USER_PROMPT" | grep -qi "test\|testing\|spec\|unittest"; then
  echo "Loading skill: testing-patterns"
  # Skill loading handled by Claude Code
fi

if echo "$USER_PROMPT" | grep -qi "component\|react\|jsx"; then
  echo "Loading skills: vercel/react-component-patterns, webflow-adapters/vercel-to-webflow-bridge"
fi

if echo "$USER_PROMPT" | grep -qi "animation\|gsap\|animate"; then
  echo "Loading skill: gsap-webflow-translation"
fi

if echo "$USER_PROMPT" | grep -qi "webflow\|cms\|collection"; then
  echo "Loading skills: webflow-official/*, automation/*"
fi

# Debug mode
if echo "$USER_PROMPT" | grep -qi "debug\|trace\|verbose"; then
  export CLAUDE_DEBUG=1
  echo "Debug mode enabled"
fi

exit 0