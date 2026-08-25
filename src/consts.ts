/** Site-wide metadata, navigation, and shared links. */

export const SITE_TITLE = 'OpenRequest';
export const SITE_DESCRIPTION =
  'OpenRequest is a branded portal where employees ask for what they need in a guided way — without the weight of a traditional service desk.';
export const SITE_COPYRIGHT = '© 2026 Drill Software Limited. All rights reserved.';

/** Placeholder until Cal booking URL is confirmed. */
export const EARLY_ACCESS_HREF = '/#early-access';
/** Placeholder until app sign-in URL is confirmed. */
export const SIGN_IN_HREF = '/#sign-in';

export type NavItem = {
  label: string;
  href: string;
  /** Emphasize as a primary action (e.g. Get early access). */
  emphasis?: 'primary' | 'secondary';
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Get early access', href: EARLY_ACCESS_HREF, emphasis: 'primary' },
  { label: 'Sign in', href: SIGN_IN_HREF, emphasis: 'secondary' },
];
