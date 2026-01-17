# Google Drive Integration Strategy

## The Challenge

Critical client information lives in Google Drive:
- Brand guidelines and assets
- Discovery questionnaires
- Reference materials and inspiration
- Stakeholder interview notes
- Client-provided content

**Problem**: AI agents can't directly access Google Drive, creating a gap between strategy development and available information.

## Solution Architecture

### Option 1: Local Sync Workflow (Recommended)

**Setup**: Use Google Drive desktop client + structured import process

```bash
# Project setup with Google Drive integration
mkdir -p projects/{client_slug}/inputs/google-drive/
# Google Drive folder: /Clients/{Client Name}/Salt Studio Intake/
# Local sync: ~/Google Drive/Clients/{Client Name}/Salt Studio Intake/
```

**Import Process**:
1. **Structured Collection**: Use standardized folder structure in Google Drive
2. **Selective Sync**: Sync only client folders actively being worked on
3. **Local Import**: Copy files to project inputs folder with consistent naming
4. **Reference Tracking**: Maintain manifest of what was imported and when

### Option 2: Manual Import with Templates

**Setup**: Structured checklist for gathering client materials

```markdown
## Client Material Checklist: {Client Name}

### Required Materials
□ **Discovery Questionnaire** → `inputs/intake-form.md`
□ **Brand Guidelines** → `inputs/brand-guidelines/`
□ **Logo Files** → `inputs/logos/` (SVG, PNG, EPS)
□ **Reference Sites** → `inputs/references.md` (URLs + screenshots)
□ **Existing Website** → `inputs/current-site-analysis.md`

### Optional Materials
□ **Previous Marketing** → `inputs/marketing-materials/`
□ **Customer Research** → `inputs/research/`
□ **Competitor Analysis** → `inputs/competitors/`
□ **Stakeholder Notes** → `inputs/interviews/`

### Import Commands
```bash
# Copy from Google Drive to project
cp "~/Google Drive/Clients/{Client}/Brand Guidelines.pdf" inputs/brand-guidelines/
cp "~/Google Drive/Clients/{Client}/Logo Files/*" inputs/logos/
# Convert questionnaire to markdown
/import-questionnaire "~/Google Drive/Clients/{Client}/Intake Form.pdf"
```
```

### Option 3: API Integration (Advanced)

**Setup**: Google Drive API + automated sync script

```bash
# Install Google Drive CLI
pip install pydrive2

# Authenticate (one-time setup)
python scripts/gdrive-auth.py

# Project-specific sync
python scripts/sync-client-materials.py --client="greenleaf-organics"
```

**Benefits**: Automated, real-time sync, version tracking
**Complexity**: Requires API setup, authentication, error handling

## Recommended Implementation

### Phase 1: Manual + Templates (Start Here)

**Why First**: No technical setup required, works immediately

**Process**:
1. **Client Onboarding**: Send Google Drive folder structure template
2. **Material Collection**: Use checklist to gather required files
3. **Local Import**: Copy files to project `inputs/` folder
4. **Reference Documentation**: Create `inputs/_manifest.md` tracking what was imported

**Google Drive Template Structure**:
```
/Clients/{Client Name}/Salt Studio Intake/
├── 📋 Intake Form.pdf
├── 🎨 Brand Guidelines/
│   ├── Brand Guidelines.pdf
│   ├── Logo Files/
│   │   ├── logo.svg
│   │   ├── logo.png
│   │   └── logo-variations/
│   └── Brand Assets/
├── 🔗 Reference Sites.md
├── 📊 Research & Data/
│   ├── Customer Interviews/
│   ├── Analytics Data/
│   └── Competitor Analysis/
└── ✅ Project Brief.md
```

### Phase 2: Local Sync (Scale Solution)

**When**: After 5+ clients, when manual process becomes repetitive

**Setup**:
```bash
# Google Drive sync setup
ln -s "~/Google Drive/Clients" ~/clients-sync
# Project import script
./scripts/import-client-materials.sh greenleaf-organics
```

**Import Script Example**:
```bash
#!/bin/bash
CLIENT_SLUG=$1
CLIENT_FOLDER="$HOME/Google Drive/Clients/$CLIENT_SLUG"
PROJECT_INPUTS="projects/$CLIENT_SLUG/inputs"

echo "Importing materials for $CLIENT_SLUG..."

# Brand guidelines
if [ -d "$CLIENT_FOLDER/Brand Guidelines" ]; then
    cp -r "$CLIENT_FOLDER/Brand Guidelines"/* "$PROJECT_INPUTS/brand-guidelines/"
    echo "✅ Brand guidelines imported"
fi

# References
if [ -f "$CLIENT_FOLDER/Reference Sites.md" ]; then
    cp "$CLIENT_FOLDER/Reference Sites.md" "$PROJECT_INPUTS/references.md"
    echo "✅ References imported"
fi

# Generate manifest
echo "# Import Manifest - $(date)" > "$PROJECT_INPUTS/_manifest.md"
echo "## Files imported from Google Drive:" >> "$PROJECT_INPUTS/_manifest.md"
find "$PROJECT_INPUTS" -type f -newer "$PROJECT_INPUTS" | sed 's/^/- /' >> "$PROJECT_INPUTS/_manifest.md"
```

### Phase 3: API Integration (Future Enhancement)

**When**: Managing 20+ clients, need real-time sync, version control

**Features**:
- Automated sync when Google Drive files change
- Version tracking of client materials
- Conflict resolution for simultaneous edits
- Integration with project status updates

## Client Communication Strategy

### Google Drive Folder Setup Email

```markdown
Subject: Project Materials - Google Drive Setup for {Client Name}

Hi {Client Name},

To ensure we have everything needed for your project, I've created a shared Google Drive folder. Please add the following materials:

**📋 Required Items**
1. **Completed Intake Form** (attached)
2. **Brand Guidelines** (PDF or existing document)
3. **Logo Files** (SVG preferred, PNG acceptable)
4. **Reference Websites** (3-5 sites you admire)

**🎨 Optional but Helpful**
- Existing marketing materials
- Customer research or testimonials
- Competitor websites to avoid/improve on
- Any specific requirements or constraints

**🔗 Access Your Folder**
[Google Drive Link]

**⏰ Timeline**
Please upload materials by [Date] so we can begin discovery on [Start Date].

Questions? Reply to this email or text [Phone].

Best regards,
[Your Name]
```

## Integration with Existing Workflow

### Updated setup-new-client.sh

Add Google Drive integration to the setup script:

```bash
# After project creation, add Google Drive setup
echo ""
echo "🌐 Google Drive Integration"
echo "──────────────────────────────────────────────────────────────"
read -p "Create Google Drive folder structure? (y/n): " setup_gdrive

if [[ "$setup_gdrive" =~ ^[Yy]$ ]]; then
    # Create local inputs structure
    mkdir -p inputs/{brand-guidelines,logos,references,research,interviews}

    # Generate Google Drive folder template email
    sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" templates/gdrive-setup-email.md > "docs/${PROJECT_CODENAME}-gdrive-setup.md"

    echo "✅ Google Drive structure created"
    echo "📧 Email template: docs/${PROJECT_CODENAME}-gdrive-setup.md"
fi
```

### Updated Client Discovery Process

Modify the client-discovery agent to check for local materials first:

```markdown
### Phase 0: Local Materials Check

Before starting discovery, verify local inputs:

```
LOCAL INPUT INVENTORY
□ inputs/intake-form.md (or .pdf)
□ inputs/brand-guidelines/ (any files?)
□ inputs/logos/ (SVG, PNG files?)
□ inputs/references.md (reference URLs?)
□ inputs/research/ (customer data?)
□ inputs/_manifest.md (import log?)
```

**If materials missing:**
1. Check Google Drive sync status
2. Run import script if files available
3. Contact client if materials not provided
4. Proceed with available inputs + flag gaps
```

## Benefits of This Strategy

### Immediate Benefits (Phase 1)
✅ **Works Today**: No technical setup required
✅ **Scalable**: Template approach handles 1-50 clients
✅ **Client-Friendly**: Familiar Google Drive interface
✅ **Auditable**: Clear tracking of what was imported when

### Long-term Benefits (Phase 2-3)
✅ **Automated**: Reduces manual import work
✅ **Version Control**: Tracks changes to client materials
✅ **Real-time**: Updates when client adds new files
✅ **Integrated**: Works seamlessly with existing agent workflow

## Recommended Next Steps

1. **Create templates** for Google Drive folder structure and client communication
2. **Add import checklist** to client-discovery agent
3. **Test with next client** using manual process
4. **Build import script** after validating workflow with 2-3 clients
5. **Consider API integration** when managing 20+ active clients

This gives you **immediate Google Drive access** while building toward a more automated solution as you scale.