# /social - Social Media Content Generation

Generate platform-optimized social media content for Building in Public strategy. Maintains authentic voice, enforces pillar balance, and adapts content across platforms.

## Usage

```bash
# Generate content for a topic
/social draft "Just shipped the new dashboard"
/social draft "Pricing anxiety is real" --pillar identity

# Repurpose existing content
/social repurpose "paste your existing post here" --from twitter --to linkedin

# Check voice score
/social check "Your draft content here"
/social check --platform linkedin "Your LinkedIn post"

# View content calendar balance
/social calendar

# Research trends (uses Apify if configured)
/social trends
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `subcommand` | draft, repurpose, check, calendar, trends | required |
| `--platform` | Target platform (twitter, linkedin, instagram) | twitter |
| `--pillar` | Content pillar (identity, journey, industry, community) | auto-balance |
| `--account` | Account type (personal, product) | personal |
| `--hook` | Hook type (contrarian, data, story, question) | auto-select |
| `--from/--to` | For repurposing: source and target platforms | - |

## Content Pillars

| Pillar | Target % | Best Platforms | Examples |
|--------|----------|----------------|----------|
| **Identity & Craft** | 40% | LinkedIn, X | Pricing, positioning, imposter syndrome |
| **Build Journey** | 30% | X, Instagram | Feature launches, bugs, metrics |
| **Industry Insight** | 20% | LinkedIn, X | Trends, tools, predictions |
| **Community** | 10% | X | Replies, quotes, engagement |

## Account Strategy

| Account | Purpose | Effort |
|---------|---------|--------|
| **@gabimartinsdev** (personal) | Build trust, show the human, BIP journey | 80% |
| **@saltcoreio** (product) | Product announcements, feature launches | 20% |

## Workflow

### /social draft

```
┌─────────────────────────────────────────────────────────────┐
│                    /social draft "topic"                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. PILLAR SELECTION                                        │
│     • Check 14-day rolling balance                          │
│     • Auto-select most underserved pillar (or use --pillar) │
│                                                             │
│  2. PLATFORM OPTIMIZATION                                   │
│     • Apply platform-specific constraints                   │
│     • Select appropriate hook type                          │
│                                                             │
│  3. CONTENT GENERATION                                      │
│     • Inject voice principles                               │
│     • Apply anti-AI detection patterns                      │
│     • Generate 2-3 variations                               │
│                                                             │
│  4. VOICE CHECK                                             │
│     • Run through Voice Guardian                            │
│     • Flag any issues                                       │
│     • Score each variation                                  │
│                                                             │
│  5. OUTPUT                                                  │
│     • Present drafts with scores                            │
│     • Suggest edits for flagged content                     │
│     • Ready for copy to Typefully/Buffer                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### /social repurpose

```
┌─────────────────────────────────────────────────────────────┐
│           /social repurpose "content" --from X --to LI      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. EXTRACT CORE INSIGHT                                    │
│     • Apply 1-3-1 rule (1 insight, 3 points, 1 action)      │
│     • Identify transferable value                           │
│                                                             │
│  2. ADAPT HOOK                                              │
│     • X: Bold claim, contrarian                             │
│     • LinkedIn: Personal story, professional vulnerability  │
│     • Instagram: Visual-first, action-oriented              │
│                                                             │
│  3. TRANSFORM FORMAT                                        │
│     • Adjust length for platform                            │
│     • Change structure (thread → post, post → carousel)     │
│                                                             │
│  4. VOICE CHECK                                             │
│     • Ensure platform-appropriate tone                      │
│     • Check for AI tells                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Platform Physics

| Platform | Hook Style | Max Length | Key Metric | Warning |
|----------|------------|------------|------------|---------|
| **X/Twitter** | Bold claim, wit | 280 (hook: 200) | Replies | - |
| **LinkedIn** | Story, vulnerability | 3000 (hook: 300) | Comments | -47% AI penalty |
| **Instagram** | Visual-first | 2200 (hook: 125) | Saves | Hashtags don't boost |

## Hook Types

| Type | When to Use | Example |
|------|-------------|---------|
| **Contrarian** | Challenge conventional wisdom | "I stopped showing portfolios. Close rate doubled." |
| **Data** | Share specific metrics | "$3k projects → $10k+ in 6 months. Here's what changed:" |
| **Story** | Personal experience | "Last week a client ghosted me. Then I checked my contract..." |
| **Question** | Engage directly | "Why do we charge hourly when our value is in the outcome?" |

## Voice Rules (Enforced)

### Always
- Use contractions (you're, can't, won't)
- Lead with the point (no preamble)
- Include specifics (numbers, examples)
- Vary sentence rhythm

### Never
- Flagged words (leverage, utilize, streamline, seamless, cutting-edge)
- Banned phrases ("In today's...", "Let's dive in", "Here's the thing")
- Multiple em-dashes per paragraph
- More than 1 exclamation per post
- Starting with "I" (low engagement)

## Example Output

```
/social draft "just shipped invoice tracking"

═══════════════════════════════════════════════════════════════
SOCIAL DRAFT: Invoice Tracking Launch
═══════════════════════════════════════════════════════════════

PILLAR: Build Journey (30% target, currently 25%)
PLATFORM: Twitter (@gabimartinsdev)
HOOK TYPE: Data

───────────────────────────────────────────────────────────────
DRAFT 1 (Score: 85/100)
───────────────────────────────────────────────────────────────

Shipped invoice tracking today.

Now I can see:
- Who's paid
- Who's late
- Who's about to be

One less spreadsheet. One less "did they pay yet?" check.

Building Salt Core in public. Follow along.

───────────────────────────────────────────────────────────────
DRAFT 2 (Score: 82/100)
───────────────────────────────────────────────────────────────

3 hours from idea to shipped.

Invoice tracking is live in Salt Core.

The old way: Check Stripe. Check email. Check spreadsheet.
The new way: One dashboard. Green or red.

That's it. That's the whole feature.

───────────────────────────────────────────────────────────────
DRAFT 3 (Score: 78/100) ⚠️
───────────────────────────────────────────────────────────────

I just shipped invoice tracking for Salt Core.

⚠️ Flag: Starts with "I" - consider leading with the feature

───────────────────────────────────────────────────────────────

RECOMMENDATION: Draft 1 (highest score, strong hook)

Ready to copy to Typefully? [Y/n]
```

## Integration

### Voice Guardian CLI
The `/social` command uses the Voice Guardian for scoring:
```bash
npx tsx scripts/voice-guardian.ts --platform twitter "Your content"
```

### Scheduling (Manual)
After generating content:
1. Copy approved draft
2. Paste into Typefully (X) or Buffer (LinkedIn/IG)
3. Schedule according to pillar timing:
   - Identity: LinkedIn first → X (4h) → IG (24h)
   - Build Journey: X first → LinkedIn (6h) → IG (24h)
   - Industry: LinkedIn first → X (4h)
   - Community: X only

### Research Integration
If Apify is configured, `/social trends` pulls:
- Competitor content performance
- Hashtag velocity
- Reddit pain points

## The 60/40 Rule

AI drafts get you to 60%. You bring the last 40%.

**What AI provides:**
- Structure and format
- Platform optimization
- Voice guideline adherence
- Multiple variations

**What you add:**
- Specific details from your experience
- Opinions and edge
- Real metrics and examples
- The human touch

## Related Commands

| Command | Use With |
|---------|----------|
| `/research` | Deep dive on content topics |
| `/brand-check` | Verify brand consistency |
| `/scout` | Research competitor social strategies |

## Tips

1. **Write the hook first** - Everything else supports it
2. **One idea per post** - Complexity kills engagement
3. **Stagger releases** - Same content, different platforms, 4-24h apart
4. **LinkedIn needs heavy editing** - 60/40 becomes 40/60 for LinkedIn
5. **Save your best for Tuesday-Thursday** - Engagement peaks mid-week
