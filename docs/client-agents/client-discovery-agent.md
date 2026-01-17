# SALT STUDIO Strategy Brain - Agent #1: Client Discovery

## What's Included

```
claude-strategy-brain/
├── agents/
│   └── client-discovery.md      # The Client Discovery Agent
├── commands/
│   └── discover.md              # The /discover slash command
└── skills/
    └── brand-voice-extraction/
        ├── SKILL.md             # Voice extraction methodology
        └── references/
            └── voice-examples.md # Sample voice profiles
```

## Installation

### Option 1: Project-Level (Recommended for Client Work)
Copy to your project's `.claude/` directory:
```bash
cp -r agents/ /path/to/your-project/.claude/
cp -r commands/ /path/to/your-project/.claude/
cp -r skills/ /path/to/your-project/.claude/
```

### Option 2: User-Level (Available in All Projects)
Copy to your user Claude Code directory:
```bash
cp -r agents/ ~/.claude/
cp -r commands/ ~/.claude/
cp -r skills/ ~/.claude/
```

## Usage

### Invoke the /discover command:
```
/discover Process the intake form for [Client Name]
```

### Let Claude auto-invoke the agent:
Just mention discovery, onboarding, or client intake:
```
"I need to onboard a new client, Bloom Botanicals. Here's their intake form."
```

Claude will automatically invoke the client-discovery agent based on the description.

## Outputs

The system generates three JSON files:

1. **`{client}_client_dna.json`** - Complete business profile with source citations
2. **`{client}_voice_profile.json`** - Brand voice analysis with evidence
3. **`{client}_missing_info.json`** - Prioritized gaps requiring client input

## Anti-Hallucination Features

This agent is designed to NEVER invent information:

- ✅ Every fact is cited with source
- ✅ Every inference is labeled as such
- ✅ Missing info becomes PLACEHOLDER markers
- ✅ Contradictions are flagged, not resolved by assumption
- ✅ Confidence levels on all extracted data

## What's Next?

This is Agent #1 of the Strategy Brain. Still to build:

- [ ] `icp-analyst-agent` + `icp-development` skill
- [ ] `ux-strategist-agent` + `conversion-architecture` skill
- [ ] `design-translator-agent` + `design-brief-creation` skill
- [ ] `conversion-reviewer-agent`
- [ ] `creative-director-agent` (orchestrator)

Each builds on the outputs of the previous, creating a chain of accountability from discovery to delivery.