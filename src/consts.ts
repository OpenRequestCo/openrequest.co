/** Site-wide metadata and navigation. */

export const SITE_TITLE = 'OpenRequest';
export const SITE_DESCRIPTION =
  'OpenRequest is a simpler, conversation-first internal service desk.';
export const SITE_COPYRIGHT = '© 2026 Drill Software Limited. All rights reserved.';

export type NavItem = {
  label: string;
  href: string;
  /** Emphasize as a primary action (e.g. Get early access). */
  emphasis?: 'primary' | 'secondary';
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Get early access', href: '/#early-access', emphasis: 'primary' },
  { label: 'Sign in', href: '/#sign-in', emphasis: 'secondary' },
];
