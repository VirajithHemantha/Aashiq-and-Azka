// Couple names used across the invitation and the /admin message generator.
export const GROOM_NAME = 'Aashiq';
export const BRIDE_NAME = 'Azka';

export const PREFIXES = [
  { key: 'mr', label: 'Mr.' },
  { key: 'mrs', label: 'Mrs.' },
  { key: 'miss', label: 'Miss' },
  { key: 'mrmrs', label: 'Mr. & Mrs.' },
  { key: 'family', label: 'Family' },
  { key: 'dear', label: 'Dear' },
] as const;

export type PrefixKey = (typeof PREFIXES)[number]['key'];

const isPrefixKey = (v: string | null): v is PrefixKey =>
  !!v && PREFIXES.some((p) => p.key === v);

/** Combines prefix + name. "Dear" adds nothing: the greeting already says "Dear". */
export function buildDisplayName(prefix: PrefixKey, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  switch (prefix) {
    case 'mr': return `Mr. ${name}`;
    case 'mrs': return `Mrs. ${name}`;
    case 'miss': return `Miss ${name}`;
    case 'mrmrs': return `Mr. & Mrs. ${name}`;
    case 'family': return `${name} and Family`;
    case 'dear': return name;
  }
}

/**
 * Link format: {baseURL}/{guestName}?p={prefix}
 * The name stays in the path; the prefix travels as a short query key so the
 * site can rebuild the display name. "Dear" needs no key.
 */
export function buildInviteLink(baseUrl: string, prefix: PrefixKey, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  const base = baseUrl.replace(/\/+$/, '');
  const query = prefix === 'dear' ? '' : `?p=${prefix}`;
  return `${base}/${encodeURIComponent(name)}${query}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${GROOM_NAME} & ${BRIDE_NAME}`;
}

/** Reads the guest from the current URL, e.g. /Sanjaya?p=mr → "Mr. Sanjaya". */
export function getGuestFromLocation(): string {
  const segment = window.location.pathname.split('/').filter(Boolean)[0];
  if (!segment) return '';
  let name = '';
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }
  const p = new URLSearchParams(window.location.search).get('p');
  return buildDisplayName(isPrefixKey(p) ? p : 'dear', name);
}
