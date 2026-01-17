# SALT STUDIO Strategy Brain

## Agents Built

| # | Agent | Skill | Command | Status |
|---|-------|-------|---------|--------|
| 1 | `client-discovery` | `brand-voice-extraction` | `/discover` | ✅ Complete |
| 2 | `icp-analyst` | `icp-development` | `/icp` | ✅ Complete |
| 3 | `ux-strategist` | `conversion-architecture` | `/strategy` | 🔲 Pending |
| 4 | `design-translator` | `design-brief-creation` | `/brief` | 🔲 Pending |
| 5 | `conversion-reviewer` | - | `/review` | 🔲 Pending |
| 6 | `creative-director` | - | `/project` | 🔲 Pending |

---

## What's Included

```
claude-strategy-brain/
├── agents/
│   ├── client-discovery.md      # Extracts Client DNA + Brand Voice
│   └── icp-analyst.md           # Builds psychological customer profiles
├── commands/
│   ├── discover.md              # /discover - Client onboarding
│   └── icp.md                   # /icp - Customer profiling
└── skills/
    ├── brand-voice-extraction/
    │   ├── SKILL.md             # Voice extraction methodology
    │   └── references/
    │       └── voice-examples.md
    └── icp-development/
        ├── SKILL.md             # ICP creation methodology
        └── references/
            └── awareness-messaging-examples.md
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

### Future Steps (Coming Soon)
```
/strategy → Strategic positioning brief
/sitemap → Conversion-optimized site architecture
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
| icp-analyst | Read, Grep, Glob, WebSearch, WebFetch | Research access, no write |

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
                  [Future: /strategy, /copy, etc.]
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

---

## What's Next?

**Agent #3: UX Strategist** - Translates ICP psychology into conversion-optimized site architecture
- Takes: ICP Profiles + Client DNA
- Produces: Strategic Sitemap + Page-level conversion goals

Ready to build?