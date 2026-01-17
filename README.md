# SALT STUDIO Webflow Template

> Professional React-to-Webflow workflow template

## Purpose

This is the **template repository** for SALT STUDIO Webflow client projects. Each new client project is created from this template.

## Usage

### Create New Client Project
```bash
# Using GitHub CLI
gh repo create client-name-website \
  --template salt-studio/salt-studio-webflow-template \
  --private \
  --clone

cd client-name-website
./scripts/setup-new-client.sh
```

### What This Template Provides

- ✅ React + Vite prototype environment
- ✅ GSAP animation workflow
- ✅ Claude Code integration (.claude/ configs)
- ✅ Webflow API setup
- ✅ Automated setup script
- ✅ Pre-configured tooling (ESLint, Prettier, etc.)
- ✅ Documentation templates

## Structure
```
template/
├── .claude/              # Claude Code skills & commands
├── prototype/            # React boilerplate
├── scripts/              # Automation scripts
├── docs/                 # Documentation templates
└── design-system/        # Brand guideline templates
```

## For Template Maintainers

### Making Improvements

1. Make changes in this repo
2. Test with a new client project
3. Commit and push
4. Existing client projects can sync:
```bash
   # In client repo
   ./scripts/sync-template-updates.sh
```

### Key Files

- `setup-new-client.sh` - Automated project setup
- `*.template.*` - Files with placeholders (get customized per client)
- `.claude/skills/` - Shared AI knowledge
- `.claude/commands/` - Workflow automations

## Documentation

- [Template Setup Guide](docs/TEMPLATE.md)
- [Creating New Skills](docs/SKILLS.md)
- [Workflow Documentation](docs/WORKFLOW.md)

## Version

**Current Version**: 1.0.0  
**Last Updated**: 2026-01-16  
**Maintained by**: SALT STUDIO

## License

Private - SALT STUDIO Internal Use Only