# /copy - Copywriting Command

## Purpose
Transform strategy outputs into conversion-focused page copy. Produces headlines, body copy, CTAs, and microcopy that speak directly to ICPs at their awareness level while maintaining brand voice.

## When to Use
- Page briefs are complete and you need actual copy
- Moving from strategy phase to implementation
- Need headlines, body copy, or CTAs
- Writing copy for a specific page or section

## Usage

```
/copy [page or scope] for [Client Name]
```

**Examples:**
```
/copy Write the homepage copy for GreenLeaf Organics
/copy Create copy for all service pages for TechFlow
/copy Write hero section headlines for the pricing page
/copy Generate CTA copy for all pages
```

---

## Prerequisites

### Required Inputs
- [ ] **Page Brief** — Must know what the page needs to accomplish
- [ ] **ICP Profile** — Must know who we're writing to
- [ ] **Brand Voice** — Must know how to sound

### Helpful Inputs
- [ ] Content Requirements — Specific content needs
- [ ] Competitor copy — What to differentiate from
- [ ] Existing copy — What to improve on
- [ ] Client examples — Copy they like

---

## Workflow

### Step 1: Context Loading

Load all required inputs:

```
1. PAGE BRIEF
   □ What's this page's ONE job?
   □ What sections are defined?
   □ What's the conversion goal?
   □ What's the target awareness level?

2. ICP PROFILE  
   □ Which ICP is this page targeting?
   □ What are their top pain points?
   □ What are their key desires?
   □ What objections need handling?
   □ What language do they use?

3. BRAND VOICE
   □ What are the voice dimensions?
   □ What words are forbidden?
   □ What's the personality level?
   □ Any example phrases to emulate?
```

### Step 2: Message Architecture

Before writing, structure the argument:

```
PRIMARY MESSAGE
└── The ONE thing they must understand from this page

SUPPORTING MESSAGES  
├── Point 1 (addresses which pain/desire)
├── Point 2 (addresses which pain/desire)
└── Point 3 (addresses which pain/desire)

PROOF REQUIREMENTS
├── What claims need evidence?
└── What type of proof is available?

CALL TO ACTION
└── What ONE thing should they do?
```

### Step 3: Section-by-Section Writing

For each section in the page brief:

```
For each section:
1. Identify section purpose
2. Determine awareness level
3. Write headline (with alternatives)
4. Write subheadline (if needed)
5. Write body copy
6. Specify proof element
7. Write CTA copy (if section has one)
```

### Step 4: Voice Check

Verify copy matches brand voice:

```
□ Formality level matches profile
□ Warmth level matches profile
□ Enthusiasm level matches profile
□ No forbidden words used
□ Tone consistent throughout
```

### Step 5: Conversion Check

Verify copy will convert:

```
□ Headlines are benefit-focused (not feature-focused)
□ Body copy addresses ICP pain points
□ Objections are neutralized
□ CTAs are action-oriented
□ Proof elements support claims
□ Awareness level appropriate
```

### Step 6: Generate Output

Produce structured copy document:

```
/mnt/user-data/outputs/
└── {client}_{page}_copy.json
```

---

## Output Format

### Per-Page Copy Document

Each page produces a copy document with:

```json
{
  "copy_metadata": {
    "client_name": "",
    "page": "",
    "target_icp": "",
    "awareness_level": "",
    "version": "1.0"
  },
  
  "seo": {
    "meta_title": "",
    "meta_description": ""
  },
  
  "sections": [
    {
      "section_id": "",
      "headline": {
        "primary": "",
        "alternatives": []
      },
      "subheadline": "",
      "body_copy": "",
      "cta": {
        "button_text": "",
        "supporting_text": ""
      },
      "proof_element": ""
    }
  ],
  
  "microcopy": {
    "form_labels": {},
    "button_states": {},
    "error_messages": {}
  }
}
```

---

## Awareness-Level Strategies

### Quick Reference

| Level | Lead With | Headline Approach | CTA Style |
|-------|-----------|-------------------|-----------|
| Unaware | Problem | Surprising fact or question | Soft, curiosity |
| Problem-Aware | Solution category | Acknowledge pain, promise relief | Educational |
| Solution-Aware | Differentiation | Unique advantage | Comparison |
| Product-Aware | Proof | Address doubt with evidence | Low-risk trial |
| Most Aware | Offer | Direct, urgent | Strong action |

### Examples by Level

**Unaware:**
```
Headline: "The average person touches their face 23 times per hour. 
          Here's why that matters for your skin."
CTA: "Learn more"
```

**Problem-Aware:**
```
Headline: "Tired of skincare that promises everything and delivers nothing?"
CTA: "Discover a better approach"
```

**Solution-Aware:**
```
Headline: "Unlike other 'clean' brands, every ingredient is 
          third-party tested. See the certificates yourself."
CTA: "Compare our standards"
```

**Product-Aware:**
```
Headline: "Will it work for sensitive skin? 
          Here's what 500+ customers with eczema say."
CTA: "Start your free trial"
```

**Most Aware:**
```
Headline: "Ready for your best skin yet? 
          Get 20% off your first order."
CTA: "Shop now"
```

---

## Headline Formulas

### Benefit Headlines
```
[Get/Achieve] [Desired Result] [Without/In] [Obstacle/Timeframe]
```

### Problem-Solution
```
[Problem]? [Solution] [Delivers Result]
```

### Proof Headlines
```
[Number] [People/Companies] [Achieved Result] [With Product]
```

### Question Headlines
```
[Question That Gets "Yes" or Triggers Curiosity]?
```

### How-To Headlines
```
How to [Achieve Result] [Without Common Obstacle]
```

---

## CTA Patterns

### By Commitment Level

**Low (Free):** "Get the Guide" | "See How It Works" | "Take the Quiz"

**Medium (Time):** "Book a Call" | "Get a Quote" | "Schedule Demo"

**High (Money):** "Start Now" | "Join Today" | "Buy Now"

### By Psychology

**Benefit:** "Start Saving Time" | "Get More Leads"

**Identity:** "Become a Better [X]" | "Join the Top 1%"

**Action:** "Send My First [X]" | "Build My [X]"

**Risk-Reducing:** "Try Risk-Free" | "Start Free" | "Cancel Anytime"

---

## Placeholder Protocol

When information is missing, use clear placeholders:

```
[COMPANY NAME] — Client's company name
[PRODUCT NAME] — Specific product reference
[NUMBER] — Statistic needing verification
[TESTIMONIAL] — Quote needed from client
[RESULT] — Specific outcome needing data
[PRICE] — Pricing needing confirmation
[TIMEFRAME] — Duration needing verification
```

**Example:**
```
"Join [NUMBER]+ happy customers who've achieved 
[RESULT] with [PRODUCT NAME]."

[TESTIMONIAL PLACEHOLDER: Need quote from customer 
addressing trust objection, ideally mentioning ingredients]
```

---

## Quality Checklist

Before delivering copy:

### Completeness
- [ ] All sections from brief have copy
- [ ] Headlines have 2-3 alternatives
- [ ] All CTAs have button + supporting text
- [ ] SEO elements complete
- [ ] Microcopy included where needed

### Voice
- [ ] Matches brand voice profile
- [ ] No forbidden words
- [ ] Consistent tone throughout
- [ ] Appropriate formality level

### Conversion
- [ ] Benefits over features
- [ ] Objections addressed
- [ ] Proof supports claims
- [ ] CTAs are action-oriented
- [ ] Awareness level matched

### Technical
- [ ] No unresolved placeholders (or clearly flagged)
- [ ] Assumptions documented
- [ ] Grammar/spelling checked
- [ ] Formatting consistent

---

## Example Interaction

**User:** `/copy Write the services page copy for TechFlow`

**Agent Response:**

```
## Services Page Copy: TechFlow

### Context
- **Page Purpose:** Convert visitors to demo bookings
- **Target ICP:** Mid-market CTOs (Solution-Aware)
- **Key Objection:** "Is this worth switching from our current stack?"
- **Key Desire:** Reduce DevOps overhead, ship faster
- **Voice:** Professional (7/10), Direct (8/10), Confident (9/10)

---

### SEO

**Meta Title:**
Enterprise DevOps Platform | TechFlow Services

**Meta Description:**
Ship faster with less overhead. TechFlow's DevOps platform 
handles infrastructure so your team can focus on building. 
Trusted by 500+ engineering teams.

---

### Hero Section

**Headline (Primary):**
Your engineers should be building features, not fighting infrastructure.

**Alternatives:**
- "DevOps that gets out of your way."
- "Ship 3x faster with half the infrastructure headaches."

**Subheadline:**
TechFlow handles deployment, scaling, and monitoring automatically—
so your team can focus on what actually moves the business forward.

**CTA:** 
- Primary: "Book a Demo"
- Secondary: "See How It Works"

---

### Services Grid

**Service 1: Automated Deployments**

Headline: "Deploy in minutes, not meetings."

Body: Push code. TechFlow handles the rest. Automatic builds, 
testing, and zero-downtime deployments—no DevOps engineer required.

**Service 2: Auto-Scaling Infrastructure**

Headline: "Scale up for launch day. Scale down for your budget."

Body: Traffic spike? Handled. Quiet weekend? We scale down automatically. 
You only pay for what you use, and you never worry about capacity.

**Service 3: Proactive Monitoring**

Headline: "Know about issues before your customers do."

Body: Real-time alerts, automated diagnostics, and AI-powered 
predictions. Most issues get resolved before they become incidents.

---

### Social Proof

**Headline:**
Trusted by 500+ engineering teams who'd rather ship than babysit servers.

**Testimonial:**
"We cut our deployment time from 4 hours to 12 minutes. 
Our DevOps team went from firefighting to actually improving our stack."
— Marcus Chen, VP Engineering at ScaleUp Inc.

**Stats:**
- 500+ engineering teams
- 2.3M deployments per month
- 99.99% uptime SLA

---

### Objection Handler

**Headline:**
"But switching platforms is a nightmare..."

**Body:**
We hear you. That's why TechFlow includes white-glove migration support. 
Our team handles the heavy lifting, runs parallel environments, 
and ensures zero disruption to your current operations.

Average migration time: 2 weeks.
Downtime during migration: Zero.

---

### Final CTA

**Headline:**
Ready to give your team their time back?

**Body:**
See TechFlow in action with a personalized demo. 
We'll show you exactly how it works with your stack.

**CTA:** "Book Your Demo"
**Supporting:** "30 minutes. No commitment. Real answers."

---

### Files Generated
- `techflow_services_copy.json`

Need copy for additional pages?
```

---

## Integration

### Consumes
- Page Briefs (from `/strategy`)
- ICP Profiles (from `/icp`)
- Brand Voice Profile (from `/discover`)
- Content Requirements (from `/strategy`)

### Produces For
- Design team (copy to place in layouts)
- Development team (copy to implement)
- Client review (copy for approval)
- Webflow builder (content to add)

### Can Be Audited By
- `/review` can audit copy against conversion best practices

---

## Command Variations

```
/copy homepage for [Client]
→ Full homepage copy with all sections

/copy all pages for [Client]
→ Copy for every page in the sitemap

/copy headlines for [Client]
→ Just headlines + alternatives for all pages

/copy ctas for [Client]
→ Just CTA copy for all pages

/copy [section] for [page] for [Client]
→ Specific section only (e.g., "hero section for homepage")
```