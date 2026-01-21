#!/bin/bash

# UserPromptSubmit Hook
# Triggers: Before user prompt is processed
# Purpose: Intent detection and auto-skill loading

USER_PROMPT="$1"

# ═══════════════════════════════════════════════════════════════
# WIREFRAME INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

# Wireframe keywords
if echo "$USER_PROMPT" | grep -qi "wireframe\|element structure\|element tree\|page structure\|layout structure"; then
  echo "Loading skills: webflow-element-planning, client-first-patterns, cms-best-practices"
  echo "Loading agent: wireframe-architect"
  # Auto-load strategy outputs if available
  echo "Check for: page_briefs.json, component_specs.json, visual_system.json"
fi

# Page names from sitemap (triggers wireframe context)
if echo "$USER_PROMPT" | grep -qi "homepage layout\|about page structure\|services page\|contact page\|blog page"; then
  echo "Loading skills: webflow-element-planning, client-first-patterns"
  echo "Check for: page_briefs.json for page-specific requirements"
fi

# Build-out / structure keywords
if echo "$USER_PROMPT" | grep -qi "build out\|skeleton\|section structure\|element hierarchy"; then
  echo "Loading skills: webflow-element-planning"
fi

# ═══════════════════════════════════════════════════════════════
# COMPONENT / REACT INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "component\|react\|jsx\|prototype"; then
  echo "Loading skills: client-first-patterns, react-best-practices, webflow-element-planning"
  # Auto-load wireframe if available
  echo "Check for: wireframes/*_wireframe.json"
fi

# ═══════════════════════════════════════════════════════════════
# ANIMATION INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "animation\|gsap\|animate\|motion\|scroll effect"; then
  echo "Loading skill: gsap-webflow-translation"
fi

# ═══════════════════════════════════════════════════════════════
# WEBFLOW / CMS INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "webflow\|cms\|collection\|dynamic content"; then
  echo "Loading skills: cms-best-practices, webflow-element-planning"
  # Auto-load CMS architecture if available
  echo "Check for: cms_architecture.json"
fi

if echo "$USER_PROMPT" | grep -qi "cms schema\|cms structure\|collection fields"; then
  echo "Loading skills: cms-best-practices, cms-schema-generator"
fi

# ═══════════════════════════════════════════════════════════════
# STRATEGY INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "page brief\|sitemap\|site structure\|information architecture"; then
  echo "Loading skills: conversion-architecture"
  echo "Loading agent: ux-strategist"
fi

# ═══════════════════════════════════════════════════════════════
# DESIGN INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "design brief\|visual system\|typography\|color palette\|component spec"; then
  echo "Loading skills: design-brief-creation"
  echo "Loading agent: design-translator"
fi

# ═══════════════════════════════════════════════════════════════
# COPY / CONTENT INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "copy\|content\|headline\|cta text\|write"; then
  echo "Loading skills: conversion-copywriting"
  # Auto-load ICP for voice
  echo "Check for: icp_profiles.json, brand_voice_profile.json"
fi

# ═══════════════════════════════════════════════════════════════
# TESTING INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "test\|testing\|spec\|unittest"; then
  echo "Loading skill: testing-patterns"
fi

# ═══════════════════════════════════════════════════════════════
# DEBUG MODE
# ═══════════════════════════════════════════════════════════════

if echo "$USER_PROMPT" | grep -qi "debug\|trace\|verbose"; then
  export CLAUDE_DEBUG=1
  echo "Debug mode enabled"
fi

exit 0
