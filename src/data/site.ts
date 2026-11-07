/**
 * Brand, social links and editable placeholders. Change values here, not in components.
 */
export const SITE = {
  name: 'Jajati AI',
  fullName: 'Jajati AI | AI Explained Hindi',
  tagline: 'Better Prompts. Smarter AI. Simple Hindi.',
  positioning: 'Practical AI, better prompts, and AI concepts explained in simple Hindi.',
  description:
    'Free copy-paste AI prompts, cheat sheets and simple Hindi lessons from the AI Explained series. No sign-up, no DM needed.',
  locale: 'en_IN',
  lang: 'en-IN',
  /** Default social preview image, relative to /public. */
  ogImage: '/og/default.png',
} as const;

export const SOCIAL = {
  instagram: {
    label: 'Instagram',
    handle: '@jakemo007',
    url: 'https://www.instagram.com/jakemo007/',
  },
  youtube: {
    label: 'YouTube',
    handle: '@jajatiai',
    url: 'https://www.youtube.com/@jajatiai',
  },
} as const;

/**
 * Contact details. The email is intentionally empty until you choose a public address.
 * When it is empty, the contact page points people to Instagram and YouTube instead.
 */
export const CONTACT = {
  email: '', // PLACEHOLDER: e.g. 'hello@your-domain.com'. Leave empty to hide.
} as const;

/** Main navigation. Keep it short: Instagram visitors are on phones. */
export const NAV = [
  { href: '/prompts/', label: 'Prompts' },
  { href: '/free-resources/', label: 'Free sheets' },
  { href: '/episodes/', label: 'Episodes' },
  { href: '/about/', label: 'About' },
] as const;
