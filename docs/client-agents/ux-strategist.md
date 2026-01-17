# SALT STUDIO Strategy Brain

## Agents Built

| # | Agent | Skill | Command | Status |
|---|-------|-------|---------|--------|
| 1 | `client-discovery` | `brand-voice-extraction` | `/discover` | ✅ Complete |
| 2 | `icp-analyst` | `icp-development` | `/icp` | ✅ Complete |
| 3 | `ux-strategist` | `conversion-architecture` | `/strategy` | ✅ Complete |
| 4 | `design-translator` | `design-brief-creation` | `/brief` | 🔲 Pending |
| 5 | `conversion-reviewer` | - | `/review` | 🔲 Pending |
| 6 | `creative-director` | - | `/project` | 🔲 Pending |

---

## What's Included

```
claude-strategy-brain/
├── agents/
│   ├── client-discovery.md      # Extracts Client DNA + Brand Voice
│   ├── icp-analyst.md           # Builds psychological customer profiles
│   └── ux-strategist.md         # Creates conversion-optimized site architecture
├── commands/
│   ├── discover.md              # /discover - Client onboarding
│   ├── icp.md                   # /icp - Customer profiling
│   └── strategy.md              # /strategy - Site architecture
└── skills/
    ├── brand-voice-extraction/
    │   ├── SKILL.md             # Voice extraction methodology
    │   └── references/
    │       ├── voice-examples.md
    │       └── voice-edge-cases.md
    ├── icp-development/
    │   ├── SKILL.md             # ICP creation methodology
    │   └── references/
    │       ├── awareness-messaging-examples.md
    │       ├── objection-counters.md
    │       └── transformation-examples.md
    └── conversion-architecture/
        ├── SKILL.md             # Site architecture methodology
        └── references/
            ├── sitemap-templates.md
            ├── page-types-guide.md
            └── flow-examples.md
```

---

## Installation

### Using pnpm (Recommended)
```bash
# Copy to your project's .claude directory
cp -r agents/ /path/to/your-project/.claude/
cp -r commands/ /path/to/your-project/.claude/
cp -r skills/ /path/to/your-project/.claude/
```

### User-Level (Available in All Projects)
```bash
cp -r agents/ ~/.claude/
cp -r commands/ ~/.claude/
cp -r skills/ ~/.claude/
```

---

## Usage Flow

### Step 1: Client Discovery
```
/discover Process the intake form for [Client Name]
```
**Outputs:** Client DNA + Brand Voice Profile + Missing Info Manifest

### Step 2: ICP Development
```
/icp Build profiles for [Client Name]
```
**Requires:** Client DNA from Step 1
**Outputs:** ICP Profiles + User Journey Map + Research Gaps

### Step 3: Site Strategy
```
/strategy Create site architecture for [Client Name]
```
**Requires:** Client DNA + ICP Profiles
**Outputs:** Strategic Sitemap + Page Briefs + Content Requirements

### Future Steps (Coming Soon)
```
/wireframe → Page-level wireframe specs
/brief → Design translation brief
/copy → ICP-informed copy
/review → Conversion audit
```

---

## Anti-Hallucination Architecture

Both agents are built with rigorous anti-hallucination safeguards:

### Evidence Requirements
- ✅ Every fact has a source citation
- ✅ Every inference is labeled (STATED / INFERRED / HYPOTHESIS)
- ✅ Confidence levels on all extracted data
- ✅ Missing info becomes documented gaps, not guesses

### Tool Restrictions
| Agent | Tools | Rationale |
|-------|-------|-----------|
| client-discovery | Read, Grep, Glob, WebFetch | Read-only prevents fabrication |
| icp-analyst | Read, Grep, Glob, WebSearch, WebFetch | Research access for market analysis |
| ux-strategist | Read, Grep, Glob, Write | Creates architecture outputs |

### Output Validation
- Built-in verification checklists
- Structured JSON schemas for downstream consistency
- Gap manifests for transparency

---

## Data Flow

```
Intake Form / Questionnaire
         │
         ▼
┌────────────────────┐
│  /discover         │
│  client-discovery  │
│  agent             │
└────────┬───────────┘
         │
         ├──► Client DNA (JSON)
         ├──► Brand Voice Profile (JSON)
         └──► Missing Info Manifest (JSON)
                    │
                    ▼
         ┌────────────────────┐
         │  /icp              │
         │  icp-analyst       │
         │  agent             │
         └────────┬───────────┘
                  │
                  ├──► ICP Profiles (JSON)
                  ├──► User Journey Map (JSON)
                  └──► Research Gaps (JSON)
                             │
                             ▼
                  ┌────────────────────┐
                  │  /strategy         │
                  │  ux-strategist     │
                  │  agent             │
                  └────────┬───────────┘
                           │
                           ├──► Strategic Sitemap (JSON)
                           ├──► Page Briefs (JSON)
                           └──► Content Requirements (JSON)
                                      │
                                      ▼
                           [Next: /wireframe, /brief, /copy]
```

---

## Key Frameworks Included

### Brand Voice Extraction
- 6 Voice Dimensions (Formality, Enthusiasm, Humor, Directness, Technical Complexity, Warmth)
- Evidence-backed scoring (1-10 with quotes)
- Do's and Don'ts with examples

### ICP Development
- Schwartz's 5 Levels of Awareness
- Pain Point Archaeology (Surface → Root → Emotional → Identity)
- Desire Mapping (Functional → Emotional → Identity)
- Objection Taxonomy with counter-arguments
- Transformation Narrative (Before/After)

### Conversion Architecture
- Page Purpose Hierarchy (Conversion → Persuasion → Education → Utility)
- Awareness-Based Entry Strategy
- One-Job Rule for pages
- User Flow Design methodology
- Navigation Architecture principles

---

## What's Next?

**Agent #4: Design Translator** - Converts strategy and inspiration into actionable design briefs
- Takes: Strategic Sitemap + Moodboards/Inspiration + Brand Voice
- Produces: Design Brief + Visual Direction + Component Specs

Ready to build?