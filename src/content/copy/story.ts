/**
 * First-pass story copy from the marketing site structure document.
 * Ready for OR-19 (story page) without redesigning tokens.
 */

export const story = {
  hero: {
    headline: 'Internal requests should feel like starting a conversation.',
    subhead:
      'OpenRequest is a branded portal where employees ask for what they need in a guided way, the conversation continues cleanly, and the people handling requests get exactly the context they need — without the weight of a traditional service desk.',
    primaryCta: 'Get early access',
    secondaryCta: 'See how it works',
  },
  problem: {
    lead: 'Most internal request tools fall into one of two extremes:',
    extremes: [
      {
        label: 'Too unstructured',
        detail: 'Slack threads, email chains, lost context',
      },
      {
        label: 'Too heavy',
        detail: 'Full ticketing systems that feel like work just to ask for something',
      },
    ],
    body: 'Neither feels good. People avoid asking. Handlers get incomplete requests. Everyone loses time.',
    turn: 'OpenRequest starts from a different place.',
  },
  idea: {
    headline: 'Start with a conversation. Add just enough structure.',
    steps: [
      'Employees open a familiar, command-palette-inspired interface.',
      'They describe what they need.',
      'OpenRequest guides them to the right type of request and gathers the necessary context.',
      'The interaction continues as a clean conversation.',
      'When a human is needed, the right person gets a focused view with everything already attached.',
    ],
    closing: [
      'No ticket forms that feel like bureaucracy.',
      'No endless Slack threads.',
      'Just a clear, intentional loop.',
    ],
  },
  loop: {
    asking: {
      title: 'For the person asking',
      body: 'It feels closer to starting a conversation than filling out a form. The system helps them ask well, then stays out of the way.',
    },
    handling: {
      title: 'For the person handling',
      body: 'You receive requests that already have context. A simple dashboard. Clear ownership. No noise.',
    },
    philosophy:
      'This is the whole product philosophy: structure that serves the conversation, not the other way around.',
  },
  not: {
    items: [
      'Not another helpdesk',
      'Not a full ITSM suite',
      'Not a place that forces people to learn a new workflow just to get something done',
    ],
    body: 'It is deliberately small. Branded. SSO-protected. Built around the actual request loop rather than the tools that grew up around it.',
  },
  audience: {
    body: 'Teams that have outgrown Slack-and-email but do not want the weight of a traditional service desk.',
    startingPoints: [
      'IT',
      'Operations',
      'People',
      'Facilities',
      'Finance ops',
      'Internal tools support',
    ],
  },
  close: {
    body: 'If the current way of handling internal requests feels heavier than it should, we would like to talk.',
    title: 'Get early access',
    detail: 'Book a short conversation. We’ll show you where we are and whether it fits.',
  },
} as const;
