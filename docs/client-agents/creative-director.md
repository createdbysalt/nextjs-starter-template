# SALT STUDIO Strategy Brain

## Agents Built

| # | Agent | Skill | Command | Status |
|---|-------|-------|---------|--------|
| 1 | `client-discovery` | `brand-voice-extraction` | `/discover` | ✅ Complete |
| 2 | `icp-analyst` | `icp-development` | `/icp` | ✅ Complete |
| 3 | `ux-strategist` | `conversion-architecture` | `/strategy` | ✅ Complete |
| 4 | `design-translator` | `design-brief-creation` | `/brief` | ✅ Complete |
| 5 | `conversion-reviewer` | `conversion-audit` | `/review` | ✅ Complete |
| 6 | `creative-director` | - | `/project` | ✅ Complete |

---

## What's Included

```
claude-strategy-brain/
├── agents/
│   ├── client-discovery.md      # Extracts Client DNA + Brand Voice
│   ├── icp-analyst.md           # Builds psychological customer profiles
│   ├── ux-strategist.md         # Creates conversion-optimized site architecture
│   ├── design-translator.md     # Translates inspiration to design specs
│   ├── conversion-reviewer.md   # Audits outputs against conversion best practices
│   └── creative-director.md     # Orchestrates full workflow + manages projects
├── commands/
│   ├── discover.md              # /discover - Client onboarding
│   ├── icp.md                   # /icp - Customer profiling
│   ├── strategy.md              # /strategy - Site architecture
│   ├── brief.md                 # /brief - Design direction
│   ├── review.md                # /review - Conversion audit
│   └── project.md               # /project - Project orchestration
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
    ├── conversion-architecture/
    │   ├── SKILL.md             # Site architecture methodology
    │   └── references/
    │       ├── sitemap-templates.md
    │       ├── page-types-guide.md
    │       └── flow-examples.md
    ├── design-brief-creation/
    │   ├── SKILL.md             # Design brief methodology
    │   └── references/
    │       ├── typography-pairings.md
    │       ├── color-palette-examples.md
    │       └── component-patterns.md
    └── conversion-audit/
        ├── SKILL.md             # Conversion audit methodology
        └── references/
            ├── conversion-patterns.md
            ├── page-type-benchmarks.md
            └── severity-examples.md
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

### Option A: Full Project Orchestration (Recommended)

```
/project new [Client Name]
```

The Creative Director will:
1. Initialize project structure
2. Assess available inputs
3. Guide you through each phase
4. Track progress and blockers
5. Prepare handoff when complete

### Option B: Manual Phase Execution

#### Step 1: Client Discovery
```
/discover Process the intake form for [Client Name]
```
**Outputs:** Client DNA + Brand Voice Profile + Missing Info Manifest

#### Step 2: ICP Development
```
/icp Build profiles for [Client Name]
```
**Requires:** Client DNA from Step 1
**Outputs:** ICP Profiles + User Journey Map + Research Gaps

#### Step 3: Site Strategy
```
/strategy Create site architecture for [Client Name]
```
**Requires:** Client DNA + ICP Profiles
**Outputs:** Strategic Sitemap + Page Briefs + Content Requirements

#### Step 4: Design Brief
```
/brief Analyze references and create design direction for [Client Name]
```
**Requires:** Client DNA + Inspiration/References
**Outputs:** Design Brief + Visual System + Component Specs

#### Step 5: Conversion Audit
```
/review Audit outputs for [Client Name] before handoff
```
**Requires:** Any combination of previous outputs
**Outputs:** Conversion Audit Report + Prioritized Recommendations

#### Step 6: Handoff
```
/project handoff [Client Name]
```
**Outputs:** Client-ready deliverables package

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
| design-translator | Read, Grep, Glob, WebFetch, Write | Analyzes references, creates specs |
| conversion-reviewer | Read, Grep, Glob | Read-only audit, no modifications |
| creative-director | Read, Grep, Glob, Write, Bash | Full access for orchestration |

### Output Validation
- Built-in verification checklists
- Structured JSON schemas for downstream consistency
- Gap manifests for transparency

---

## Data Flow

```
                    ┌─────────────────────────────────────────┐
                    │         /project new [Client]           │
                    │         creative-director               │
                    │         (Orchestration Layer)           │
                    └────────────────┬────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
┌────────────────┐          ┌────────────────┐          ┌────────────────┐
│   /discover    │          │     /icp       │          │   /strategy    │
│ client-discovery│─────────▶│  icp-analyst   │─────────▶│  ux-strategist │
└───────┬────────┘          └───────┬────────┘          └───────┬────────┘
        │                           │                           │
        ├─► Client DNA              ├─► ICP Profiles            ├─► Sitemap
        ├─► Brand Voice             ├─► User Journey            ├─► Page Briefs
        └─► Missing Info            └─► Research Gaps           └─► Content Reqs
                                                                        │
                    ┌───────────────────────────────────────────────────┘
                    │
                    ▼
           ┌────────────────┐          ┌────────────────┐
           │    /brief      │          │    /review     │
           │design-translator│─────────▶│conversion-     │
           └───────┬────────┘          │reviewer        │
                   │                   └───────┬────────┘
                   ├─► Design Brief            │
                   ├─► Visual System           └─► Conversion Audit
                   └─► Component Specs                 │
                                                       │
                    ┌──────────────────────────────────┘
                    │
                    ▼
           ┌────────────────────────┐
           │   /project handoff     │
           │   creative-director    │
           └───────────┬────────────┘
                       │
                       ▼
              [Client Deliverables]
```

### Phase Dependencies

| Phase | Requires | Produces |
|-------|----------|----------|
| Discovery | Intake materials | Client DNA, Voice, Missing Info |
| Audience | Client DNA | ICP Profiles, Journey, Gaps |
| Architecture | DNA + ICPs | Sitemap, Briefs, Content Reqs |
| Design | DNA + Voice + References | Brief, System, Components |
| Review | Any outputs | Audit Report |
| Handoff | All phases + Review | Client Package |

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

### Design Brief Creation
- 6-Layer Inspiration Analysis (Typography → Color → Layout → Imagery → Details → Feeling)
- Voice-to-Visual Translation frameworks
- Typography System design (scales, pairings, rules)
- Color System design (palettes, accessibility, psychology)
- Spacing System design (8px grid, component/section spacing)
- Component specification templates

### Conversion Audit
- CONVERT Framework (Clarity, Objections, Navigation, Value, Evidence, Relevance, Trust)
- Friction Mapping (Cognitive, Emotional, Interaction, Process)
- Trust Signal Architecture and Timing
- CTA Effectiveness Analysis
- Severity Calibration (Critical → High → Medium → Low)
- Prioritization Matrix (Impact × Effort)

### Project Orchestration
- Phase dependency management
- Quality gates between phases
- Blocker identification and resolution
- Parallel tracking (design can run alongside strategy)
- Handoff packaging and delivery

---

## 🎉 Build Complete!

All 6 agents are fully implemented:

| Agent | Role | Command |
|-------|------|---------|
| client-discovery | Extract business DNA and brand voice | `/discover` |
| icp-analyst | Build psychological customer profiles | `/icp` |
| ux-strategist | Create conversion-optimized architecture | `/strategy` |
| design-translator | Translate inspiration to specs | `/brief` |
| conversion-reviewer | Audit for conversion issues | `/review` |
| creative-director | Orchestrate full workflow | `/project` |

### Quick Start

**Start a new project:**
```
/project new [Client Name]
```

**Or run phases manually:**
```
/discover → /icp → /strategy → /brief → /review → /project handoff
```

### What You Can Build Next

- **Copy agent** — Generate ICP-informed page copy
- **Wireframe agent** — Create page-level wireframe specs
- **Component library** — Pre-built component specifications
- **Client portal** — Interface for client intake and review