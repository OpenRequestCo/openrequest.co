/**
 * Marketing story copy — kept snappy for the page, expandable later.
 */

export const story = {
  hero: {
    headline: 'Internal requests should feel like a conversation.',
    subhead:
      'A branded portal where people ask clearly, the thread stays organised, and handlers get the context they need.',
    primaryCta: 'Get early access',
    secondaryCta: 'See how it works',
  },
  idea: {
    headline: 'Start with a conversation. Add just enough structure.',
    body: 'People describe what they need. OpenRequest guides the request type, gathers context, and keeps the thread clean — so when a human steps in, everything useful is already there.',
  },
  employee: {
    eyebrow: 'Employee view',
    title: 'Closer to a conversation than a form',
    body: 'Ask in plain language. The system helps you ask well, then stays out of the way while the request continues as a clear thread.',
  },
  team: {
    eyebrow: 'Team view',
    title: 'Context already attached',
    body: 'When a request lands, the ask is clear and the details are already filled in — who raised it, which team, and who should own it next.',
  },
  audience: {
    eyebrow: 'Who this is for',
    title: 'Teams that have outgrown Slack and email',
    body: 'When informal channels get noisy but a full service desk feels like overkill, OpenRequest gives each team a calm place to take requests.',
    teams: [
      {
        name: 'IT',
        detail: 'Hardware, accounts, and access — without ticket theatre.',
        icon: 'it',
      },
      {
        name: 'Operations',
        detail: 'Process asks and vendor follow-ups in one clear thread.',
        icon: 'operations',
      },
      {
        name: 'People',
        detail: 'Onboarding, policies, and HR asks that need a proper trail.',
        icon: 'people',
      },
      {
        name: 'Facilities',
        detail: 'Moves, space, and equipment requests with the context attached.',
        icon: 'facilities',
      },
      {
        name: 'Finance ops',
        detail: 'Approvals, expenses, and vendor setup without inbox archaeology.',
        icon: 'finance',
      },
      {
        name: 'Internal tools',
        detail: 'App access and integrations routed to the people who can help.',
        icon: 'tools',
      },
    ],
  },
  close: {
    body: 'If internal requests feel heavier than they should, we would like to talk.',
    title: 'Get early access',
    detail: 'Book a short conversation. We’ll show you where we are and whether it fits.',
  },
} as const;
