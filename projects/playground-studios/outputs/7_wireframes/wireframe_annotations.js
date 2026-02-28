/**
 * Wireframe Annotations Data
 *
 * Strategic reasoning for each section - shown in client-facing wireframe.
 * Pulled from: wireframes/homepage_wireframe.json
 *
 * This helps clients understand WHY sections are placed where they are.
 */

export const annotations = {
  hero: {
    sectionId: 'hero',
    sectionName: 'Hero Section',
    purpose: 'Communicate who you are, what you do, and your vibe instantly. First impressions happen in under 5 seconds.',
    whyHere:
      'The hero is always first because visitors need immediate orientation. If they can\'t tell what Playground Studios does within 5 seconds, they bounce.',
    conversionGoal:
      'Get 50%+ of visitors to click "View Work" (primary path) or 10-15% to go directly to "Let\'s Talk" (hot leads).',
    contentDirection:
      'Full-bleed portfolio image or video reel. The WORK is the hero. Headline should be aspirational but clear about creative production.',
    cmsNote: 'Static section - content hardcoded in Webflow, not CMS-driven.',
  },

  'client-logos': {
    sectionId: 'client-logos',
    sectionName: 'Client Logos',
    purpose: 'Instant credibility without explanation. Recognizable logos do the selling.',
    whyHere:
      'Placed immediately after hero to answer the unspoken question: "Who else trusts them?" Social proof early reduces skepticism.',
    conversionGoal: 'Build trust within first scroll. No click needed - logos passively validate.',
    contentDirection:
      'Row of recognizable logos: Celsius, Samsung, Kendra Scott, MVMT, etc. Simple, no explanation needed. Logos speak.',
    cmsNote: 'CMS-driven (ClientLogo collection) so you can easily add/remove logos.',
  },

  'featured-work': {
    sectionId: 'featured-work',
    sectionName: 'Featured Work',
    purpose: 'Show portfolio quality and invite exploration. Let the work do the talking.',
    whyHere:
      'After establishing credibility with logos, visitors want to see PROOF. Featured work is curated to show range and quality.',
    conversionGoal:
      'Get visitors to click into at least one project, deepening engagement before they consider contact.',
    contentDirection:
      '6 featured projects as visual grid. Best work only - quality over quantity. Each card links to full case study.',
    cmsNote: 'CMS-driven (Project collection, filtered by isFeatured = true). You control which projects appear here.',
  },

  'brief-intro': {
    sectionId: 'brief-intro',
    sectionName: 'Brief Intro',
    purpose: 'Add human touch and differentiation. Not just what you do, but who you are.',
    whyHere:
      'After showing work, visitors may wonder about the team. A brief, warm intro humanizes the brand without requiring a full About page visit.',
    conversionGoal: 'Build emotional connection. Some visitors will click "Learn More" to go deeper.',
    contentDirection:
      '2-3 sentences max. "We\'re a creative production studio..." Warm but confident. Not corporate.',
    cmsNote: 'Static section - update directly in Webflow when messaging evolves.',
  },

  'contact-cta': {
    sectionId: 'contact-cta',
    sectionName: 'Contact CTA',
    purpose: 'Easy conversion path for anyone ready to take action.',
    whyHere:
      'Page-ending CTA catches visitors who scrolled through everything and are now warm. Dark background creates visual break and urgency.',
    conversionGoal:
      'Capture the 10-15% of visitors who are ready to reach out after seeing the full homepage.',
    contentDirection:
      'Simple invitation: "Ready to create something?" Keep it short. The button does the work.',
    cmsNote: 'Static section - rarely needs updates.',
  },
};

/**
 * Get annotation by section ID
 */
export const getAnnotation = (sectionId) => {
  return annotations[sectionId] || null;
};
